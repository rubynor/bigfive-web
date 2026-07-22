import { describe, it, expect } from 'vitest';
import { formatId, validId, formatAndValidateId } from '../src/result-id';

// Ported from the reference fork's web/__tests__/lib/helpers.test.ts
// (commit 4a0e042).
const OBJECT_ID = '58a70606a835c400c8b38e84'; // 24 hex — bigfive-test.com shape
const NANOID = 'YjA6v1icaLMYyo_c8063w'; // 21 chars, mixed case, has _ and -
const UUID = 'ab8118ca-d140-4224-891a-f1934c95c9df';

describe('validId', () => {
  it('accepts a Mongo ObjectId (og + current id format)', () => {
    expect(validId(OBJECT_ID)).toBe(true);
    expect(validId(OBJECT_ID.toUpperCase())).toBe(true);
  });

  it('still accepts a legacy nanoid', () => {
    expect(validId(NANOID)).toBe(true);
    expect(validId('V1StGXR8_Z5jdHi6B-myT')).toBe(true);
  });

  it('still accepts a legacy UUID', () => {
    expect(validId(UUID)).toBe(true);
    expect(validId(UUID.toUpperCase())).toBe(true);
  });

  it('rejects malformed ids', () => {
    expect(validId('')).toBe(false);
    expect(validId('too-short')).toBe(false);
    expect(validId('has spaces in it xxxx')).toBe(false);
    expect(validId(NANOID + 'x')).toBe(false); // 22 chars
    expect(validId(OBJECT_ID + 'ff')).toBe(false); // 26 hex
    expect(validId('z8a70606a835c400c8b38e84')).toBe(false); // non-hex
  });
});

describe('formatId', () => {
  it('preserves case so case-sensitive nanoids survive', () => {
    expect(formatId(NANOID)).toBe(NANOID);
  });

  it('strips a pasted full result URL', () => {
    expect(formatId(`https://bigfive-test.com/result/${NANOID}`)).toBe(NANOID);
  });

  it('strips stray spaces', () => {
    expect(formatId(` ${NANOID} `)).toBe(NANOID);
  });
});

describe('formatAndValidateId', () => {
  it('validates a pasted nanoid URL', () => {
    expect(formatAndValidateId(`https://bigfive-test.com/result/${NANOID}`)).toBe(
      true
    );
  });
});
