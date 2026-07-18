import { describe, it, expect } from 'vitest';
import { generateObjectId, isObjectId } from '../src/object-id';

describe('generateObjectId', () => {
  it('produces a 24-char lowercase hex string', () => {
    const id = generateObjectId();
    expect(id).toMatch(/^[0-9a-f]{24}$/);
    expect(isObjectId(id)).toBe(true);
  });

  it('encodes the timestamp in the first 4 bytes', () => {
    const now = 1_700_000_000_000; // fixed ms
    const id = generateObjectId(now);
    const encodedSeconds = parseInt(id.slice(0, 8), 16);
    expect(encodedSeconds).toBe(Math.floor(now / 1000));
  });

  it('is unique across many rapid calls (counter increments)', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => generateObjectId()));
    expect(ids.size).toBe(1000);
  });
});

describe('isObjectId', () => {
  it('accepts upstream-shaped ids, rejects everything else', () => {
    expect(isObjectId('507f1f77bcf86cd799439011')).toBe(true);
    expect(isObjectId('507F1F77BCF86CD799439011')).toBe(true); // case-insensitive
    expect(isObjectId('507f1f77bcf86cd79943901')).toBe(false); // 23 chars
    expect(isObjectId('507f1f77bcf86cd7994390111')).toBe(false); // 25 chars
    expect(isObjectId('g07f1f77bcf86cd799439011')).toBe(false); // non-hex
    expect(isObjectId('')).toBe(false);
    expect(isObjectId('not-an-id')).toBe(false);
  });
});
