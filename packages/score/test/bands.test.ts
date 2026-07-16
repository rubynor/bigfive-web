import { describe, it, expect } from 'vitest';
import { percentileToBand } from '../src/bands';
import type { Band } from '../src/types';

describe('percentileToBand', () => {
  const cases: Array<[number, Band]> = [
    [0.01, 'very low'],
    [9.99, 'very low'],
    [10, 'low'],
    [29.99, 'low'],
    [30, 'average'],
    [50, 'average'],
    [69.99, 'average'],
    [70, 'high'],
    [89.99, 'high'],
    [90, 'very high'],
    [99.99, 'very high']
  ];
  for (const [p, band] of cases) {
    it(`${p} -> ${band}`, () => {
      expect(percentileToBand(p)).toBe(band);
    });
  }
});
