import { describe, it, expect } from 'vitest';
import { getNormSet, combineStrata, findBaseStratum, combineParams } from '../src/norms';
import { rawToT, tToPercentile } from '../src/stats';
import { percentileToBand } from '../src/bands';
import { DOMAIN_CODES, FACET_NUMBERS } from '../src/types';
import type { AgeBracket } from '../src/types';
import type { NormStratum } from '../src/norms';

const set = getNormSet();
const brackets: AgeBracket[] = ['lt21', 'a21_40', 'a41_60', 'gt60'];

// Every stratum we can score against: 8 base + 4 combined (derived).
const allStrata: NormStratum[] = [
  ...set.strata,
  ...brackets.map((b) =>
    combineStrata(findBaseStratum(set, 'male', b)!, findBaseStratum(set, 'female', b)!)
  )
];

function pct(raw: number, mean: number, sd: number): number {
  return tToPercentile(rawToT(raw, mean, sd));
}

describe('percentile is strictly monotonic in raw score (cubic-bug regression guard)', () => {
  for (const s of allStrata) {
    it(`${s.sex}/${s.ageBracket} domains monotonic over raw 24..120`, () => {
      for (const d of DOMAIN_CODES) {
        const { mean, sd } = s.norms[d].domain;
        let prev = -1;
        for (let raw = 24; raw <= 120; raw++) {
          const p = pct(raw, mean, sd);
          expect(p).toBeGreaterThan(prev);
          prev = p;
        }
      }
    });
    it(`${s.sex}/${s.ageBracket} facets monotonic over raw 4..20`, () => {
      for (const d of DOMAIN_CODES) {
        for (const f of FACET_NUMBERS) {
          const { mean, sd } = s.norms[d].facets[f];
          let prev = -1;
          for (let raw = 4; raw <= 20; raw++) {
            const p = pct(raw, mean, sd);
            expect(p).toBeGreaterThan(prev);
            prev = p;
          }
        }
      }
    });
  }
});

describe('percentile stays in the open interval (0,100) and band is consistent', () => {
  for (const s of allStrata) {
    it(`${s.sex}/${s.ageBracket}`, () => {
      for (const d of DOMAIN_CODES) {
        for (let raw = 24; raw <= 120; raw++) {
          const p = pct(raw, s.norms[d].domain.mean, s.norms[d].domain.sd);
          expect(p).toBeGreaterThan(0);
          expect(p).toBeLessThan(100);
          expect(['very low', 'low', 'average', 'high', 'very high']).toContain(
            percentileToBand(p)
          );
        }
      }
    });
  }
});

describe('SDs are always positive (no divide-by-zero in T-score)', () => {
  it('every base + combined stratum param has sd > 0', () => {
    for (const s of allStrata) {
      for (const d of DOMAIN_CODES) {
        expect(s.norms[d].domain.sd).toBeGreaterThan(0);
        for (const f of FACET_NUMBERS) {
          expect(s.norms[d].facets[f].sd).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('pooled SD >= averaged SD across all real strata', () => {
  it('holds for every domain+facet param, strict where means differ', () => {
    for (const b of brackets) {
      const m = findBaseStratum(set, 'male', b)!;
      const f = findBaseStratum(set, 'female', b)!;
      for (const d of DOMAIN_CODES) {
        const check = (pm: { mean: number; sd: number }, pf: { mean: number; sd: number }) => {
          const avg = (pm.sd + pf.sd) / 2;
          const pooled = combineParams(pm, pf).sd;
          expect(pooled).toBeGreaterThanOrEqual(avg - 1e-9);
          if (pm.mean !== pf.mean) expect(pooled).toBeGreaterThan(avg);
        };
        check(m.norms[d].domain, f.norms[d].domain);
        for (const fac of FACET_NUMBERS) check(m.norms[d].facets[fac], f.norms[d].facets[fac]);
      }
    }
  });
});
