import { describe, it, expect } from 'vitest';
import {
  base64url,
  decodeComparePeople,
  encodeComparePeople,
  moveItem
} from '../src/compare-people';

// Ported from the reference fork's web/__tests__/lib/helpers.test.ts
// (commit 4a0e042).
describe('compare people codec', () => {
  const freddy = { id: '6a60139787261d7295e1f1db', name: 'Freddy' };
  const livi = { id: '58a70606a835c400c8b38e84', name: 'Livi' };

  it('encodes to the og Name-id_Name-id format', () => {
    expect(encodeComparePeople([freddy, livi])).toBe(
      `Freddy-${freddy.id}_Livi-${livi.id}`
    );
  });

  it('round-trips through encode/decode', () => {
    expect(decodeComparePeople(encodeComparePeople([freddy, livi]))).toEqual([
      freddy,
      livi
    ]);
  });

  it('decodes the og format with hyphenated names and a single person', () => {
    expect(decodeComparePeople(`Mary-Jane-${freddy.id}`)).toEqual([
      { id: freddy.id, name: 'Mary-Jane' }
    ]);
  });

  it('decodes percent-encoded names (spaces, unicode)', () => {
    expect(decodeComparePeople(`May%202026-${freddy.id}`)).toEqual([
      { id: freddy.id, name: 'May 2026' }
    ]);
    expect(decodeComparePeople(`Bj%C3%B6rk-${freddy.id}`)).toEqual([
      { id: freddy.id, name: 'Björk' }
    ]);
  });

  it('keeps a malformed percent sequence as-is instead of throwing', () => {
    expect(decodeComparePeople(`100%25-${freddy.id}`)).toEqual([
      { id: freddy.id, name: '100%' }
    ]);
    expect(decodeComparePeople(`100%-${freddy.id}`)).toEqual([
      { id: freddy.id, name: '100%' }
    ]);
  });

  it('still decodes the legacy base64url(JSON) format', () => {
    const legacy = base64url.encode(JSON.stringify([freddy, livi]));
    expect(decodeComparePeople(legacy)).toEqual([freddy, livi]);
  });

  it('returns null for malformed links', () => {
    expect(decodeComparePeople('')).toBeNull();
    expect(decodeComparePeople('Freddy-')).toBeNull();
    expect(decodeComparePeople('Freddy-notanid')).toBeNull();
    expect(decodeComparePeople('%%%')).toBeNull();
  });
});

describe('moveItem', () => {
  const people = ['a', 'b', 'c'];

  it('moves the item to its target position', () => {
    expect(moveItem(people, 1, 0)).toEqual(['b', 'a', 'c']);
    expect(moveItem(people, 1, 2)).toEqual(['a', 'c', 'b']);
  });

  it('re-inserts (not swaps) on non-adjacent moves', () => {
    expect(moveItem(people, 0, 2)).toEqual(['b', 'c', 'a']);
    expect(moveItem(people, 2, 0)).toEqual(['c', 'a', 'b']);
  });

  it('does not mutate the original array', () => {
    const original = [...people];
    moveItem(people, 0, 1);
    expect(people).toEqual(original);
  });

  it('returns the list unchanged for out-of-bounds or no-op moves', () => {
    expect(moveItem(people, 0, -1)).toBe(people);
    expect(moveItem(people, 2, 3)).toBe(people);
    expect(moveItem(people, -1, 0)).toBe(people);
    expect(moveItem(people, 1, 1)).toBe(people);
  });
});
