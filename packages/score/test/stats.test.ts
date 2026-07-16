import { describe, it, expect } from 'vitest';
import { erf, normalCdf, tToPercentile, rawToT } from '../src/stats';

// Expected values are textbook standard-normal constants, independent of the
// implementation.
describe('normalCdf against known standard-normal values', () => {
  const cases: Array<[number, number]> = [
    [-3, 0.0013499],
    [-1.96, 0.0249979],
    [-1, 0.1586553],
    [-0.5, 0.3085375],
    [0, 0.5],
    [0.5, 0.6914625],
    [1, 0.8413447],
    [1.96, 0.9750021],
    [3, 0.9986501]
  ];
  for (const [z, phi] of cases) {
    it(`Phi(${z}) ~= ${phi}`, () => {
      expect(normalCdf(z)).toBeCloseTo(phi, 4);
    });
  }
});

describe('erf', () => {
  it('erf(0) = 0, is odd, saturates to +/-1', () => {
    expect(erf(0)).toBeCloseTo(0, 6);
    expect(erf(-1)).toBeCloseTo(-erf(1), 6);
    expect(erf(4)).toBeCloseTo(1, 5);
    expect(erf(-4)).toBeCloseTo(-1, 5);
  });
});

describe('tToPercentile', () => {
  it('maps the T-score anchors to normal percentiles', () => {
    expect(tToPercentile(50)).toBeCloseTo(50, 6);
    expect(tToPercentile(60)).toBeCloseTo(84.1345, 3);
    expect(tToPercentile(70)).toBeCloseTo(97.725, 2);
    expect(tToPercentile(40)).toBeCloseTo(15.8655, 3);
    expect(tToPercentile(30)).toBeCloseTo(2.275, 2);
  });

  it('is strictly monotonic and never reaches 0 or 100 (unlike the cubic)', () => {
    let prev = -1;
    for (let t = 0; t <= 100; t += 0.25) {
      const p = tToPercentile(t);
      expect(p).toBeGreaterThan(0);
      expect(p).toBeLessThan(100);
      expect(p).toBeGreaterThan(prev);
      prev = p;
    }
  });

  it('does NOT exhibit the cubic bug: percentile keeps rising past T~=70-73', () => {
    // The five-factor-e cubic is non-monotonic here and exceeds 99; ours is not.
    expect(tToPercentile(73)).toBeGreaterThan(tToPercentile(70));
    expect(tToPercentile(72)).toBeLessThan(tToPercentile(73));
  });
});

describe('rawToT', () => {
  it('raw == mean -> T = 50; +1 SD -> 60', () => {
    expect(rawToT(50, 50, 10)).toBe(50);
    expect(rawToT(60, 50, 10)).toBe(60);
    expect(rawToT(40, 50, 10)).toBe(40);
  });
});
