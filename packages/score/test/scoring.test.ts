import { describe, it, expect } from 'vitest';
import { scoreAssessment } from '../src/scoring';
import { getNormSet, selectStratum } from '../src/norms';
import { rawToT, tToPercentile } from '../src/stats';
import { percentileToBand } from '../src/bands';
import { DOMAIN_CODES, FACET_NUMBERS } from '../src/types';
import type { DomainCode, ScoreInputAnswer } from '../src/types';
import fixture from './data/120-test-results.json';

/** Build a full 120-item answer set where every item has the same score. */
function uniformAnswers(score: number): ScoreInputAnswer[] {
  const out: ScoreInputAnswer[] = [];
  for (const domain of DOMAIN_CODES) {
    for (const facet of FACET_NUMBERS) {
      for (let i = 0; i < 4; i++) out.push({ domain, facet, score });
    }
  }
  return out;
}

describe('raw sums (independent oracle: upstream fixture)', () => {
  const r = scoreAssessment({ answers: fixture.testResult.answers });
  it('domain raw sums match the known fixture totals', () => {
    expect(r.domains.O.raw).toBe(70);
    expect(r.domains.E.raw).toBe(79);
    expect(r.domains.A.raw).toBe(65);
    expect(r.domains.C.raw).toBe(75);
    expect(r.domains.N.raw).toBe(62);
  });
  it('the 6 facet raws sum to the domain raw', () => {
    for (const d of DOMAIN_CODES) {
      const sum = FACET_NUMBERS.reduce((a, f) => a + r.domains[d].facets[String(f)].raw, 0);
      expect(sum).toBe(r.domains[d].raw);
    }
  });
});

describe('pipeline composition (T, percentile, band are consistent)', () => {
  it('each score = percentileToBand(tToPercentile(rawToT(raw, mean, sd)))', () => {
    const demographics = { sex: 'female', ageBracket: 'a41_60' } as const;
    const r = scoreAssessment({ answers: fixture.testResult.answers, demographics });
    const { stratum } = selectStratum(demographics);
    for (const d of DOMAIN_CODES as DomainCode[]) {
      const ds = r.domains[d];
      const dn = stratum.norms[d];
      const t = rawToT(ds.raw, dn.domain.mean, dn.domain.sd);
      expect(ds.t).toBeCloseTo(t, 10);
      expect(ds.percentile).toBeCloseTo(tToPercentile(t), 10);
      expect(ds.band).toBe(percentileToBand(ds.percentile));
      for (const f of FACET_NUMBERS) {
        const fs = ds.facets[String(f)];
        const ft = rawToT(fs.raw, dn.facets[f].mean, dn.facets[f].sd);
        expect(fs.t).toBeCloseTo(ft, 10);
        expect(fs.percentile).toBeCloseTo(tToPercentile(ft), 10);
        expect(fs.band).toBe(percentileToBand(fs.percentile));
      }
    }
  });
});

describe('extreme vectors', () => {
  it('all-1 answers -> every domain very low', () => {
    const r = scoreAssessment({ answers: uniformAnswers(1) });
    for (const d of DOMAIN_CODES) {
      expect(r.domains[d].raw).toBe(24);
      expect(r.domains[d].band).toBe('very low');
    }
  });
  it('all-5 answers -> every domain very high', () => {
    const r = scoreAssessment({ answers: uniformAnswers(5) });
    for (const d of DOMAIN_CODES) {
      expect(r.domains[d].raw).toBe(120);
      expect(r.domains[d].band).toBe('very high');
    }
  });
  it('all-3 (midpoint) answers -> domain raw 72, plausible mid bands', () => {
    const r = scoreAssessment({ answers: uniformAnswers(3) });
    for (const d of DOMAIN_CODES) {
      expect(r.domains[d].raw).toBe(72);
      expect(r.domains[d].percentile).toBeGreaterThan(0);
      expect(r.domains[d].percentile).toBeLessThan(100);
    }
  });
});

describe('stratum selection via demographics', () => {
  const answers = uniformAnswers(3);

  it('missing demographics -> combined + 21-40 reference, fallbackApplied', () => {
    const r = scoreAssessment({ answers });
    expect(r.meta.stratumSex).toBe('combined');
    expect(r.meta.stratumAgeBracket).toBe('a21_40');
    expect(r.meta.fallbackApplied).toBe(true);
    expect(r.meta.combinedDerived).toBe(true);
  });

  it('sex only -> that sex + 21-40 reference, fallbackApplied, not combined', () => {
    const r = scoreAssessment({ answers, demographics: { sex: 'male' } });
    expect(r.meta.stratumSex).toBe('male');
    expect(r.meta.stratumAgeBracket).toBe('a21_40');
    expect(r.meta.fallbackApplied).toBe(true);
    expect(r.meta.combinedDerived).toBe(false);
  });

  it('age only -> combined + that age, no fallback, combinedDerived', () => {
    const r = scoreAssessment({ answers, demographics: { ageBracket: 'gt60' } });
    expect(r.meta.stratumSex).toBe('combined');
    expect(r.meta.stratumAgeBracket).toBe('gt60');
    expect(r.meta.fallbackApplied).toBe(false);
    expect(r.meta.combinedDerived).toBe(true);
  });

  it('full demographics -> exact stratum, no fallback, not combined', () => {
    const r = scoreAssessment({
      answers,
      demographics: { sex: 'female', ageBracket: 'a41_60' }
    });
    expect(r.meta.stratumSex).toBe('female');
    expect(r.meta.stratumAgeBracket).toBe('a41_60');
    expect(r.meta.fallbackApplied).toBe(false);
    expect(r.meta.combinedDerived).toBe(false);
    expect(r.meta.normLabel).toBe(getNormSet().meta.label);
  });
});

describe('determinism', () => {
  it('scoring the same input twice is identical', () => {
    const input = { answers: fixture.testResult.answers, demographics: { sex: 'male', ageBracket: 'a21_40' } as const };
    expect(scoreAssessment(input)).toEqual(scoreAssessment(input));
  });
});
