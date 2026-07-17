import { describe, it, expect } from 'vitest';
import { computeComposites, type CompositeKey } from '../src/composites';
import { percentileToBand } from '../../score/src/bands';
import { makeAssessment } from './helpers';

// A fixture with clean, distinct facet percentiles so every composite lands on a
// round expected number computed by hand from the documented formulas.
const FIXTURE = makeAssessment({
  facets: {
    C: { 1: 50, 2: 60, 4: 80, 5: 70 }, // Self-Efficacy, Orderliness, Achieve, Discipline
    E: { 2: 40, 3: 90, 4: 30 }, // Gregariousness, Assertiveness, Activity Level
    N: { 4: 40 } // Self-Consciousness
  }
});

// Expected scores, derived independently from the documented formulas:
//   Perfectionism  = .35·C4 + .35·C2 + .30·N4 = .35·80 + .35·60 + .30·40 = 61
//   Ambition       = .40·C4 + .30·E3 + .30·C1 = .40·80 + .30·90 + .30·50 = 74
//   Motivation     = .40·C5 + .30·C4 + .30·C1 = .40·70 + .30·80 + .30·50 = 67
//   Desire to Lead = .45·E3 + .25·C4 + .15·E4 + .15·E2
//                  = .45·90 + .25·80 + .15·30 + .15·40 = 71
const EXPECTED: Record<CompositeKey, number> = {
  perfectionism: 61,
  ambition: 74,
  motivation: 67,
  desireToLead: 71
};

describe('computeComposites — scores', () => {
  it('computes each composite from the documented weighted sum of percentiles', () => {
    const traits = computeComposites(FIXTURE);
    for (const t of traits) {
      expect(t.score).toBeCloseTo(EXPECTED[t.key], 10);
    }
  });

  it('emits all four traits in canonical order', () => {
    const traits = computeComposites(FIXTURE);
    expect(traits.map((t) => t.key)).toEqual([
      'perfectionism',
      'ambition',
      'motivation',
      'desireToLead'
    ]);
  });
});

describe('computeComposites — weights and bounds', () => {
  it('every weight set sums to exactly 1 (score stays a convex mix of percentiles)', () => {
    for (const t of computeComposites(FIXTURE)) {
      const sum = t.components.reduce((s, c) => s + c.weight, 0);
      expect(sum).toBeCloseTo(1, 12);
    }
  });

  it('uniform percentiles → every composite equals that percentile', () => {
    for (const p of [5, 50, 95]) {
      for (const t of computeComposites(makeAssessment({ default: p }))) {
        expect(t.score).toBeCloseTo(p, 10);
      }
    }
  });

  it('score is bounded by the min/max of its component percentiles', () => {
    for (const t of computeComposites(FIXTURE)) {
      const pcts = t.components.map((c) => c.percentile);
      expect(t.score).toBeGreaterThanOrEqual(Math.min(...pcts) - 1e-9);
      expect(t.score).toBeLessThanOrEqual(Math.max(...pcts) + 1e-9);
    }
  });

  it('score stays in [0, 100] across a deterministic sweep of random percentiles', () => {
    // Deterministic LCG so the sweep is reproducible.
    let seed = 42;
    const next = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let i = 0; i < 200; i++) {
      const rand = () => 0.001 + next() * 99.998; // percentiles in (0, 100)
      const a = makeAssessment({
        facets: {
          N: { 4: rand() },
          E: { 2: rand(), 3: rand(), 4: rand() },
          C: { 1: rand(), 2: rand(), 4: rand(), 5: rand() }
        }
      });
      for (const t of computeComposites(a)) {
        expect(t.score).toBeGreaterThanOrEqual(0);
        expect(t.score).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe('computeComposites — structure and disclosure', () => {
  it('flags every trait heuristic and carries the exact formula string', () => {
    const byKey = Object.fromEntries(
      computeComposites(FIXTURE).map((t) => [t.key, t])
    );
    expect(byKey.perfectionism.heuristic).toBe(true);
    expect(byKey.perfectionism.formula).toBe('0.35·C4 + 0.35·C2 + 0.30·N4');
    expect(byKey.ambition.formula).toBe('0.40·C4 + 0.30·E3 + 0.30·C1');
    expect(byKey.motivation.formula).toBe('0.40·C5 + 0.30·C4 + 0.30·C1');
    expect(byKey.desireToLead.formula).toBe(
      '0.45·E3 + 0.25·C4 + 0.15·E4 + 0.15·E2'
    );
  });

  it('exposes named, coded, weighted components with their live percentiles', () => {
    const perfectionism = computeComposites(FIXTURE).find(
      (t) => t.key === 'perfectionism'
    )!;
    expect(perfectionism.name).toBe('Perfectionism');
    expect(perfectionism.components).toEqual([
      {
        code: 'C4',
        domain: 'C',
        facet: 4,
        name: 'achievement_striving',
        weight: 0.35,
        percentile: 80
      },
      {
        code: 'C2',
        domain: 'C',
        facet: 2,
        name: 'orderliness',
        weight: 0.35,
        percentile: 60
      },
      {
        code: 'N4',
        domain: 'N',
        facet: 4,
        name: 'self_consciousness',
        weight: 0.3,
        percentile: 40
      }
    ]);
  });

  it('band is the percentile band of the composite score', () => {
    for (const t of computeComposites(FIXTURE)) {
      expect(t.band).toBe(percentileToBand(t.score));
    }
  });
});
