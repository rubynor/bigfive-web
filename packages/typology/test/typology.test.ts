import { describe, it, expect } from 'vitest';
import {
  computeTypology,
  JP_WEIGHTS,
  TYPOLOGY_BORDERLINE_RADIUS,
  TYPOLOGY_MIDPOINT,
  type AxisKey
} from '../src/typology';
import { makeAssessment } from './helpers';

function axis(assessment: Parameters<typeof computeTypology>[0], key: AxisKey) {
  return computeTypology(assessment).axes.find((a) => a.key === key)!;
}

describe('computeTypology — axis letter boundaries', () => {
  // basis ≥ 50 selects the "high" letter; < 50 selects the "low" letter.
  const cases: Array<{
    key: AxisKey;
    domainDriver: 'E' | 'O' | 'A' | 'N';
    high: string;
    low: string;
  }> = [
    { key: 'EI', domainDriver: 'E', high: 'E', low: 'I' },
    { key: 'NS', domainDriver: 'O', high: 'N', low: 'S' },
    { key: 'TF', domainDriver: 'A', high: 'F', low: 'T' },
    { key: 'AT', domainDriver: 'N', high: 'T', low: 'A' }
  ];

  for (const c of cases) {
    it(`${c.key}: ${c.domainDriver} ≥ 50 → ${c.high}, < 50 → ${c.low}, exactly 50 → ${c.high}`, () => {
      expect(
        axis(makeAssessment({ domains: { [c.domainDriver]: 70 } }), c.key)
          .letter
      ).toBe(c.high);
      expect(
        axis(makeAssessment({ domains: { [c.domainDriver]: 30 } }), c.key)
          .letter
      ).toBe(c.low);
      // exact midpoint is inclusive on the high side (≥ 50)
      expect(
        axis(makeAssessment({ domains: { [c.domainDriver]: 50 } }), c.key)
          .letter
      ).toBe(c.high);
      // just below the midpoint flips to the low letter
      expect(
        axis(makeAssessment({ domains: { [c.domainDriver]: 49.9 } }), c.key)
          .letter
      ).toBe(c.low);
    });
  }
});

describe('computeTypology — type string', () => {
  it('all-50 percentiles → ENFJ-T (every axis on the high side)', () => {
    const t = computeTypology(makeAssessment({ default: 50 }));
    expect(t.type).toBe('ENFJ-T');
  });

  it('assembles a known INTP-T from mixed percentiles', () => {
    const t = computeTypology(
      makeAssessment({
        // I←E<50, N←O≥50, T←A<50, T(A/T)←N≥50; jScore below drives P
        domains: { E: 20, O: 80, A: 20, N: 80 },
        facets: { C: { 2: 30, 6: 30 } } // low Orderliness/Cautiousness → low jScore
      })
    );
    // jScore = .4·30 + .4·30 + .2·(100−80) = 12 + 12 + 4 = 28 → P
    expect(t.meta.jScore).toBeCloseTo(28, 10);
    expect(t.type).toBe('INTP-T');
  });

  it('is exactly `${EI}${NS}${TF}${JP}-${AT}` (hyphen before the A/T letter)', () => {
    const t = computeTypology(makeAssessment());
    const [ei, ns, tf, jp, at] = t.axes;
    expect(t.type).toBe(
      `${ei.letter}${ns.letter}${tf.letter}${jp.letter}-${at.letter}`
    );
    expect(t.axes.map((a) => a.key)).toEqual(['EI', 'NS', 'TF', 'JP', 'AT']);
  });
});

describe('computeTypology — 16P role and strategy', () => {
  // Letter drivers: E←E, N/S←O, T/F←A (≥50→F), A/T←N (≥50→T),
  // J/P←jScore(.4·C2+.4·C6+.2·(100−O)).
  it('INTP-T → Analyst (N_T) / Constant Improvement (I + Turbulent)', () => {
    const t = computeTypology(
      makeAssessment({
        domains: { E: 20, O: 80, A: 20, N: 80 },
        facets: { C: { 2: 30, 6: 30 } }
      })
    );
    expect(t.type).toBe('INTP-T');
    expect(t.role).toBe('analyst');
    expect(t.strategy).toBe('constantImprovement');
  });

  it('ENFJ-T (all-50) → Diplomat (N_F) / Social Engagement (E + Turbulent)', () => {
    const t = computeTypology(makeAssessment({ default: 50 }));
    expect(t.type).toBe('ENFJ-T');
    expect(t.role).toBe('diplomat');
    expect(t.strategy).toBe('socialEngagement');
  });

  it('ISTJ-A → Sentinel (S_J) / Confident Individualism (I + Assertive)', () => {
    const t = computeTypology(
      makeAssessment({
        domains: { E: 20, O: 20, A: 20, N: 20 },
        facets: { C: { 2: 90, 6: 90 } }
      })
    );
    // jScore = .4·90 + .4·90 + .2·(100−20) = 88 → J
    expect(t.type).toBe('ISTJ-A');
    expect(t.role).toBe('sentinel');
    expect(t.strategy).toBe('confidentIndividualism');
  });

  it('ESFP-A → Explorer (S_P) / People Mastery (E + Assertive)', () => {
    const t = computeTypology(
      makeAssessment({
        domains: { E: 80, O: 30, A: 80, N: 20 },
        facets: { C: { 2: 10, 6: 10 } }
      })
    );
    // jScore = .4·10 + .4·10 + .2·(100−30) = 22 → P
    expect(t.type).toBe('ESFP-A');
    expect(t.role).toBe('explorer');
    expect(t.strategy).toBe('peopleMastery');
  });
});

describe('computeTypology — J/P composite math', () => {
  it('jScore = 0.40·C2 + 0.40·C6 + 0.20·(100 − O), weights surfaced in meta', () => {
    const t = computeTypology(
      makeAssessment({
        domains: { O: 40 },
        facets: { C: { 2: 70, 6: 60 } }
      })
    );
    // .4·70 + .4·60 + .2·(100−40) = 28 + 24 + 12 = 64
    const jp = t.axes.find((a) => a.key === 'JP')!;
    expect(t.meta.jScore).toBeCloseTo(64, 10);
    expect(jp.basisPercentile).toBeCloseTo(64, 10);
    expect(jp.letter).toBe('J'); // ≥ 50
    expect(jp.strengthTowardLetter).toBeCloseTo(64, 10);
    expect(t.meta.jpWeights).toEqual(JP_WEIGHTS);
    expect(
      JP_WEIGHTS.orderliness +
        JP_WEIGHTS.cautiousness +
        JP_WEIGHTS.opennessReversed
    ).toBeCloseTo(1, 12);
  });
});

describe('computeTypology — continuous fields', () => {
  it('strengthTowardLetter and distanceFromMidpoint are symmetric around 50', () => {
    const hi = axis(makeAssessment({ domains: { E: 70 } }), 'EI');
    expect(hi.letter).toBe('E');
    expect(hi.strengthTowardLetter).toBeCloseTo(70, 10);
    expect(hi.distanceFromMidpoint).toBeCloseTo(20, 10);

    const lo = axis(makeAssessment({ domains: { E: 30 } }), 'EI');
    expect(lo.letter).toBe('I');
    expect(lo.strengthTowardLetter).toBeCloseTo(70, 10); // % toward the CHOSEN letter
    expect(lo.distanceFromMidpoint).toBeCloseTo(20, 10);
  });
});

describe('computeTypology — borderline fires exactly on [45, 55]', () => {
  // Isolate the E/I axis: push every other driver far from 50 so only E can be
  // borderline, then confirm the predicate matches basis ∈ [45, 55] exactly.
  function eiBorderline(e: number): boolean {
    const t = computeTypology(
      makeAssessment({ default: 80, domains: { E: e } })
    );
    const ei = t.axes.find((a) => a.key === 'EI')!;
    // with everything else at 80, the aggregate borderline == the E/I axis
    expect(t.borderline).toBe(ei.borderline);
    return ei.borderline;
  }

  it('the radius is ±5 around a midpoint of 50', () => {
    expect(TYPOLOGY_MIDPOINT).toBe(50);
    expect(TYPOLOGY_BORDERLINE_RADIUS).toBe(5);
  });

  it('true on the closed interval, false just outside it', () => {
    expect(eiBorderline(44.99)).toBe(false);
    expect(eiBorderline(45)).toBe(true); // lower edge inclusive
    expect(eiBorderline(47)).toBe(true);
    expect(eiBorderline(50)).toBe(true);
    expect(eiBorderline(53)).toBe(true);
    expect(eiBorderline(55)).toBe(true); // upper edge inclusive
    expect(eiBorderline(55.01)).toBe(false);
  });

  it('aggregate borderline is the OR across axes', () => {
    // all drivers far from 50 → no axis borderline
    const sharp = computeTypology(makeAssessment({ default: 90 }));
    expect(sharp.axes.some((a) => a.borderline)).toBe(false);
    expect(sharp.borderline).toBe(false);
    // all at 50 → every axis borderline
    const flat = computeTypology(makeAssessment({ default: 50 }));
    expect(flat.axes.every((a) => a.borderline)).toBe(true);
    expect(flat.borderline).toBe(true);
  });
});
