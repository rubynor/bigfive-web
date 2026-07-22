import { describe, it, expect } from 'vitest';
import { computeComposites, type CompositeKey } from '../src/composites';
import { percentileToBand } from '../../score/src/bands';
import { makeAssessment } from './helpers';

// A fixture with clean, distinct domain + facet percentiles so every composite
// lands on a number computed by hand from the documented formulas.
const FIXTURE = makeAssessment({
  domains: { C: 70, N: 40, A: 60, E: 50 },
  facets: {
    C: { 1: 50, 2: 60, 4: 80, 5: 70 }, // Self-Efficacy, Orderliness, Achieve, Discipline
    E: { 2: 40, 3: 90, 4: 30 }, // Gregariousness, Assertiveness, Activity Level
    N: { 4: 40 } // Self-Consciousness
  }
});

// Expected scores, derived independently from the documented formulas:
//   Strivings      = 1.00·C                                = 70
//   Concerns       = .50·N + .26·(100−A) + .24·(100−E)
//                  = .50·40 + .26·40 + .24·50              = 42.4
//   Self-Control   = (.54·C + .50·(100−N) + .29·A) / 1.33
//                  = (37.8 + 30 + 17.4) / 1.33             = 85.2/1.33
//   Procrastination = 1.00·(100−C)                         = 30
//   Ambition       = .40·C4 + .30·E3 + .30·C1 = .40·80 + .30·90 + .30·50 = 74
//   Motivation     = .40·C5 + .30·C4 + .30·C1 = .40·70 + .30·80 + .30·50 = 67
//   Desire to Lead = .45·E3 + .25·C4 + .15·E4 + .15·E2
//                  = .45·90 + .25·80 + .15·30 + .15·40 = 71
const EXPECTED: Record<CompositeKey, number> = {
  perfectionisticStrivings: 70,
  perfectionisticConcerns: 42.4,
  selfControl: 85.2 / 1.33,
  procrastination: 30,
  ambition: 74,
  motivation: 67,
  desireToLead: 71
};

const byKey = (a = FIXTURE) =>
  Object.fromEntries(computeComposites(a).map((t) => [t.key, t]));

describe('computeComposites — scores', () => {
  it('computes each composite from the documented weighted sum of percentiles', () => {
    const traits = computeComposites(FIXTURE);
    for (const t of traits) {
      expect(t.score).toBeCloseTo(EXPECTED[t.key], 10);
    }
  });

  it('emits all seven traits in canonical order (empirically anchored first)', () => {
    const traits = computeComposites(FIXTURE);
    expect(traits.map((t) => t.key)).toEqual([
      'perfectionisticStrivings',
      'perfectionisticConcerns',
      'selfControl',
      'procrastination',
      'ambition',
      'motivation',
      'desireToLead'
    ]);
  });
});

describe('computeComposites — perfectionism split (Smith et al. 2019)', () => {
  it('strivings track Conscientiousness alone', () => {
    const lowC = byKey(makeAssessment({ domains: { C: 10 }, default: 90 }));
    const highC = byKey(makeAssessment({ domains: { C: 90 }, default: 10 }));
    expect(lowC.perfectionisticStrivings.score).toBeCloseTo(10, 10);
    expect(highC.perfectionisticStrivings.score).toBeCloseTo(90, 10);
  });

  it('concerns rise with Neuroticism and fall with Agreeableness/Extraversion', () => {
    const base = byKey(makeAssessment({ default: 50 }));
    const anxious = byKey(makeAssessment({ default: 50, domains: { N: 90 } }));
    const agreeable = byKey(makeAssessment({ default: 50, domains: { A: 90 } }));
    expect(anxious.perfectionisticConcerns.score).toBeGreaterThan(
      base.perfectionisticConcerns.score
    );
    expect(agreeable.perfectionisticConcerns.score).toBeLessThan(
      base.perfectionisticConcerns.score
    );
  });
});

describe('computeComposites — weights and bounds', () => {
  it('every weight set sums to exactly 1 (score stays a convex mix)', () => {
    for (const t of computeComposites(FIXTURE)) {
      const sum = t.components.reduce((s, c) => s + c.weight, 0);
      expect(sum).toBeCloseTo(1, 12);
    }
  });

  it('uniform 50th percentiles → every composite is exactly 50', () => {
    for (const t of computeComposites(makeAssessment({ default: 50 }))) {
      expect(t.score).toBeCloseTo(50, 10);
    }
  });

  it('reversal math: uniform p → procrastination = 100−p, concerns pinned at 50', () => {
    for (const p of [5, 50, 95]) {
      const traits = byKey(makeAssessment({ default: p }));
      expect(traits.procrastination.score).toBeCloseTo(100 - p, 10);
      // concerns weights split .50 direct / .50 reversed → constant under
      // uniform percentiles: .50·p + .50·(100−p) = 50.
      expect(traits.perfectionisticConcerns.score).toBeCloseTo(50, 10);
      // purely direct composites still equal p
      for (const key of [
        'perfectionisticStrivings',
        'ambition',
        'motivation',
        'desireToLead'
      ] as const) {
        expect(traits[key].score).toBeCloseTo(p, 10);
      }
    }
  });

  it('score is bounded by the min/max of its effective component values', () => {
    for (const t of computeComposites(FIXTURE)) {
      const effective = t.components.map((c) =>
        c.reversed ? 100 - c.percentile : c.percentile
      );
      expect(t.score).toBeGreaterThanOrEqual(Math.min(...effective) - 1e-9);
      expect(t.score).toBeLessThanOrEqual(Math.max(...effective) + 1e-9);
    }
  });

  it('score stays in [0, 100] across a deterministic sweep of random percentiles', () => {
    // Deterministic LCG so the sweep is reproducible.
    let seed = 42;
    const next = () =>
      (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let i = 0; i < 200; i++) {
      const rand = () => 0.001 + next() * 99.998; // percentiles in (0, 100)
      const a = makeAssessment({
        domains: { N: rand(), E: rand(), A: rand(), C: rand() },
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
    const traits = byKey();
    for (const t of computeComposites(FIXTURE)) {
      expect(t.heuristic).toBe(true);
    }
    expect(traits.perfectionisticStrivings.formula).toBe('1.00·C');
    expect(traits.perfectionisticConcerns.formula).toBe(
      '0.50·N + 0.26·(100−A) + 0.24·(100−E)'
    );
    expect(traits.selfControl.formula).toBe(
      '0.406·C + 0.376·(100−N) + 0.218·A'
    );
    expect(traits.procrastination.formula).toBe('1.00·(100−C)');
    expect(traits.ambition.formula).toBe('0.40·C4 + 0.30·E3 + 0.30·C1');
    expect(traits.motivation.formula).toBe('0.40·C5 + 0.30·C4 + 0.30·C1');
    expect(traits.desireToLead.formula).toBe(
      '0.45·E3 + 0.25·C4 + 0.15·E4 + 0.15·E2'
    );
  });

  it('carries a provenance note: citations for anchored traits, editorial for the rest', () => {
    const traits = byKey();
    expect(traits.perfectionisticStrivings.provenance).toContain('Smith et al. (2019)');
    expect(traits.perfectionisticConcerns.provenance).toContain('Smith et al. (2019)');
    expect(traits.selfControl.provenance).toContain('Tangney');
    expect(traits.procrastination.provenance).toContain('Steel (2007)');
    for (const key of ['ambition', 'motivation', 'desireToLead'] as const) {
      expect(traits[key].provenance).toContain('Editorial heuristic');
    }
  });

  it('exposes named, coded, weighted components with their live percentiles', () => {
    const concerns = byKey().perfectionisticConcerns;
    expect(concerns.name).toBe('Perfectionistic Concerns');
    expect(concerns.components).toEqual([
      {
        code: 'N',
        domain: 'N',
        facet: undefined,
        name: 'neuroticism',
        reversed: false,
        weight: 0.5,
        percentile: 40
      },
      {
        code: 'A',
        domain: 'A',
        facet: undefined,
        name: 'agreeableness',
        reversed: true,
        weight: 0.26,
        percentile: 60
      },
      {
        code: 'E',
        domain: 'E',
        facet: undefined,
        name: 'extraversion',
        reversed: true,
        weight: 0.24,
        percentile: 50
      }
    ]);

    const ambition = byKey().ambition;
    expect(ambition.components[0]).toEqual({
      code: 'C4',
      domain: 'C',
      facet: 4,
      name: 'achievement_striving',
      reversed: false,
      weight: 0.4,
      percentile: 80
    });
  });

  it('band is the percentile band of the composite score', () => {
    for (const t of computeComposites(FIXTURE)) {
      expect(t.band).toBe(percentileToBand(t.score));
    }
  });
});
