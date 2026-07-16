import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseNormPy, nsToNorms } from '../scripts/parse-normpy';
import { johnsonWebReport } from '../src/norms/sources/johnson-webreport';
import { combineParams, combineStrata, findBaseStratum } from '../src/norms';
import type { AgeBracket } from '../src/types';

// --- load the authoritative sources -----------------------------------------

const py = readFileSync(
  new URL('../norms-source/five-factor-e-norm.py', import.meta.url),
  'utf8'
);
const gold = JSON.parse(
  readFileSync(
    new URL('../norms-source/johnson-webreport.norms.json', import.meta.url),
    'utf8'
  )
) as Array<{
  id: number;
  sex: 'male' | 'female' | 'combined';
  ageBracket: AgeBracket;
  ns: number[];
}>;

const rawStrata = parseNormPy(py);
const goldBase = gold.filter((r) => r.sex !== 'combined');
const goldCombined = gold.filter((r) => r.sex === 'combined');

// The three-way fidelity chain: parseNormPy(norm.py) == gold JSON == generated
// TS, for the 8 base strata. norm.py is the source; the gold JSON is the
// INDEPENDENT oracle (produced separately by running five-factor-e).

describe('base strata: norm.py == generated TS', () => {
  it('has 8 base strata on both sides', () => {
    expect(rawStrata).toHaveLength(8);
    expect(johnsonWebReport.strata).toHaveLength(8);
  });

  for (const raw of parseNormPy(py)) {
    it(`${raw.sex}/${raw.ageBracket} matches`, () => {
      const gen = findBaseStratum(johnsonWebReport, raw.sex, raw.ageBracket);
      expect(gen).toBeDefined();
      expect(gen!.norms).toEqual(nsToNorms(raw.ns));
    });
  }
});

describe('base strata: gold JSON == generated TS (independent oracle)', () => {
  for (const row of goldBase) {
    it(`${row.sex}/${row.ageBracket} matches gold`, () => {
      const gen = findBaseStratum(johnsonWebReport, row.sex as 'male' | 'female', row.ageBracket);
      expect(gen).toBeDefined();
      expect(gen!.norms).toEqual(nsToNorms(row.ns));
    });
  }

  it('gold base ns[] equals norm.py ns[] (proves the oracle is faithful)', () => {
    for (const raw of rawStrata) {
      const g = goldBase.find(
        (r) => r.sex === raw.sex && r.ageBracket === raw.ageBracket
      );
      expect(g, `${raw.sex}/${raw.ageBracket}`).toBeDefined();
      expect(g!.ns).toEqual(raw.ns);
    }
  });
});

// The combined strata are DERIVED at runtime (not shipped). Means match gold
// (averaged), but the SD deliberately uses the pooled formula, NOT gold's
// averaged SD — a documented deviation from five-factor-e.

describe('combined strata: averaged means match gold, SD is pooled (deviation)', () => {
  const brackets: AgeBracket[] = ['lt21', 'a21_40', 'a41_60', 'gt60'];

  for (const bracket of brackets) {
    it(`${bracket}: derived means ~= gold averaged means`, () => {
      const male = findBaseStratum(johnsonWebReport, 'male', bracket)!;
      const female = findBaseStratum(johnsonWebReport, 'female', bracket)!;
      const derived = combineStrata(male, female);
      const g = goldCombined.find((r) => r.ageBracket === bracket)!;
      const goldNorms = nsToNorms(g.ns);

      // five-factor-e stores the combined mean as round-half-even(avg, 2), so our
      // exact average differs by at most half a cent (incl. the .xx5 boundary,
      // e.g. exact 14.045 vs gold 14.04). |exact - round2(exact)| <= 0.005.
      const ROUND_TOL = 0.005 + 1e-9;
      const nearGold = (exact: number, goldVal: number) =>
        expect(Math.abs(exact - goldVal)).toBeLessThanOrEqual(ROUND_TOL);

      for (const domain of ['N', 'E', 'O', 'A', 'C'] as const) {
        nearGold(derived.norms[domain].domain.mean, goldNorms[domain].domain.mean);
        for (let f = 1 as 1 | 2 | 3 | 4 | 5 | 6; f <= 6; f = (f + 1) as typeof f) {
          nearGold(derived.norms[domain].facets[f].mean, goldNorms[domain].facets[f].mean);
        }
      }
    });

    it(`${bracket}: pooled SD >= gold averaged SD (strictly, where sexes differ)`, () => {
      const male = findBaseStratum(johnsonWebReport, 'male', bracket)!;
      const female = findBaseStratum(johnsonWebReport, 'female', bracket)!;
      const derived = combineStrata(male, female);

      for (const domain of ['N', 'E', 'O', 'A', 'C'] as const) {
        const dm = male.norms[domain].domain;
        const df = female.norms[domain].domain;
        const avgSd = (dm.sd + df.sd) / 2;
        expect(derived.norms[domain].domain.sd).toBeGreaterThanOrEqual(avgSd - 1e-9);
        if (dm.mean !== df.mean) {
          expect(derived.norms[domain].domain.sd).toBeGreaterThan(avgSd);
        }
      }
    });
  }
});

describe('combineParams pooled-SD formula', () => {
  it('within-group RMS when means equal', () => {
    // sqrt(0.5*(9+25) + 0) = sqrt(17)
    expect(combineParams({ mean: 10, sd: 3 }, { mean: 10, sd: 5 }).sd).toBeCloseTo(
      Math.sqrt(17),
      10
    );
  });
  it('equals the shared SD when means AND sds are equal', () => {
    // sqrt(0.5*(16+16) + 0) = 4
    expect(combineParams({ mean: 10, sd: 4 }, { mean: 10, sd: 4 }).sd).toBeCloseTo(4, 10);
  });
  it('adds between-group variance when means differ', () => {
    // sqrt(0.5*(16+16) + 0.25*(8-12)^2) = sqrt(16+4) = sqrt(20)
    expect(combineParams({ mean: 8, sd: 4 }, { mean: 12, sd: 4 }).sd).toBeCloseTo(
      Math.sqrt(20),
      10
    );
    expect(combineParams({ mean: 10, sd: 4 }, { mean: 10, sd: 4 }).mean).toBe(10);
  });
});
