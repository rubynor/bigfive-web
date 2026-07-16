import { describe, it, expect } from 'vitest';
import { validateScoringKey } from '../src/key-validation';
import type { KeyItem } from '../src/key-validation';
import questions from '../../questions/src/data/en/questions';

// Build-time guard: the real @bigfive-org/questions item set must match the
// IPIP-NEO-120 structure the norm engine assumes (counts, spacing, and the
// N,E,O,A,C x facet enumeration that aligns raw sums with the right mean/SD).
const items: KeyItem[] = (questions as Array<Omit<KeyItem, 'num'>>).map((q, i) => ({
  ...q,
  num: i + 1
}));

describe('scoring key validation against the en questions data', () => {
  const result = validateScoringKey(items);

  it('reports no errors', () => {
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it('has exactly 120 items', () => {
    expect(items).toHaveLength(120);
  });

  it('flags a corrupted key (regression: validator actually checks)', () => {
    const broken = items.map((it, i) => (i === 0 ? { ...it, facet: 6 } : it));
    expect(validateScoringKey(broken).ok).toBe(false);
  });
});
