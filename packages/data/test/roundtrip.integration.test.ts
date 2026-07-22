import { describe, it, expect } from 'vitest';
import { randomBytes } from 'crypto';
import {
  getSeries,
  getTestResult,
  saveFeedback,
  saveTest
} from '../src/actions';
import { isObjectId } from '../src/object-id';
import { B5Error } from '../src/types';
import type { Answer, Demographics, SaveTestInput } from '../src/types';
import { scoreAssessment } from '../../score/src/scoring';

// Integration suite against the docker-compose Postgres:
//   mise run db:start && mise run db:migrate && bun run test:integration
// The centerpiece is round-trip determinism: answers → persist → load → score
// twice → identical (raw answers are the sole truth; scoring is pure).

// Build a valid 120-item answer vector (5 domains × 6 facets × 4 items). Order
// is irrelevant to scoreAssessment (it aggregates by domain/facet), so we just
// need four items per (domain, facet). `pick` lets each saved session differ.
const DOMAINS = ['N', 'E', 'O', 'A', 'C'] as const;
function makeAnswers(
  pick: (domain: string, facet: number, block: number) => number
): Answer[] {
  const out: Answer[] = [];
  let n = 0;
  for (let block = 0; block < 4; block++) {
    for (const domain of DOMAINS) {
      for (let facet = 1; facet <= 6; facet++) {
        out.push({
          id: `q${n++}`,
          domain,
          facet,
          score: pick(domain, facet, block)
        });
      }
    }
  }
  return out;
}

function payload(
  answers: Answer[],
  extra: Partial<SaveTestInput> = {}
): SaveTestInput {
  return { lang: 'en', answers, ...extra };
}

const token = (prefix: string) => `${prefix}-${randomBytes(12).toString('hex')}`;

const DEMO: Demographics = { sex: 'male', ageBracket: 'a21_40' };

describe('saveTest → getTestResult round-trip', () => {
  it('mints an ObjectId-shaped id and returns the identical report twice', async () => {
    const answers = makeAnswers((_d, facet, block) => ((facet + block) % 5) + 1);
    const { id } = await saveTest(payload(answers, { demographics: DEMO }));
    expect(isObjectId(id)).toBe(true);

    const first = await getTestResult(id);
    const second = await getTestResult(id);
    expect(first.id).toBe(id);
    // determinism: two reads score to exactly the same report
    expect(second).toEqual(first);
    // and both equal a direct pure-scoring call on the same inputs
    expect(first.assessment).toEqual(
      scoreAssessment({ answers, demographics: DEMO })
    );
  });

  it('stored demographics select the exact stratum on read (no fallback)', async () => {
    const answers = makeAnswers((_d, facet) => ((facet + 1) % 5) + 1);
    const { id } = await saveTest(payload(answers, { demographics: DEMO }));

    const report = await getTestResult(id);
    expect(report.assessment.meta.stratumSex).toBe('male');
    expect(report.assessment.meta.stratumAgeBracket).toBe('a21_40');
    expect(report.assessment.meta.fallbackApplied).toBe(false);

    // the Phase 2 typology/composites ride along
    expect(report.typology.type).toMatch(/^[EI][NS][FT][JP]-[AT]$/);
    expect(report.composites).toHaveLength(7);
    // and the rendered result text is present for all five domains
    expect(report.results).toHaveLength(5);
  });

  it('a saved test without demographics falls back to the combined reference', async () => {
    const answers = makeAnswers((_d, facet, block) => ((facet + block) % 5) + 1);
    const { id } = await saveTest(payload(answers));

    const report = await getTestResult(id);
    expect(report.assessment.meta.stratumSex).toBe('combined');
    expect(report.assessment.meta.combinedDerived).toBe(true);
    expect(report.assessment.meta.fallbackApplied).toBe(true);
  });

  it('throws NotFoundError for an unknown non-ObjectId id (no upstream call)', async () => {
    await expect(getTestResult('definitely-not-an-object-id')).rejects.toThrow(
      B5Error
    );
  });
});

describe('getSeries', () => {
  it('returns [] for an empty or unknown token', async () => {
    expect(await getSeries('')).toEqual([]);
    expect(await getSeries(token('missing'))).toEqual([]);
  });

  it('collects every session sharing a token, oldest first, scored per row', async () => {
    const seriesToken = token('series');
    const answers1 = makeAnswers((_d, facet) => ((facet + 0) % 5) + 1);
    const answers2 = makeAnswers((_d, facet) => ((facet + 2) % 5) + 1);

    const first = await saveTest(
      payload(answers1, { demographics: DEMO, seriesToken })
    );
    const second = await saveTest(
      payload(answers2, { demographics: DEMO, seriesToken })
    );

    const series = await getSeries(seriesToken);
    expect(series).toHaveLength(2);
    // both sessions present, and only these two
    expect(series.map((p) => p.id).sort()).toEqual(
      [first.id, second.id].sort()
    );
    // non-decreasing by created_at
    expect(series[0].timestamp).toBeLessThanOrEqual(series[1].timestamp);

    // each point re-scores its own row exactly (with that row's demographics)
    const byId: Record<string, Answer[]> = {
      [first.id]: answers1,
      [second.id]: answers2
    };
    for (const point of series) {
      expect(point.assessment).toEqual(
        scoreAssessment({ answers: byId[point.id], demographics: DEMO })
      );
      expect(point.assessment.meta.fallbackApplied).toBe(false);
    }
  });

  it('does not leak sessions from other tokens', async () => {
    const tokenA = token('a');
    const tokenB = token('b');
    const answers = makeAnswers(() => 3);
    await saveTest(payload(answers, { seriesToken: tokenA }));
    await saveTest(payload(answers, { seriesToken: tokenB }));

    const a = await getSeries(tokenA);
    const b = await getSeries(tokenB);
    expect(a).toHaveLength(1);
    expect(b).toHaveLength(1);
    expect(a[0].id).not.toBe(b[0].id);
  });
});

describe('saveFeedback', () => {
  it('persists feedback under an ObjectId-shaped id', async () => {
    const { id } = await saveFeedback({
      name: 'Integration Test',
      email: 'test@example.com',
      message: 'round-trip feedback row'
    });
    expect(isObjectId(id)).toBe(true);
  });
});
