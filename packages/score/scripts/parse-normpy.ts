// Shared parser for five-factor-e's `norm.py`. Used by BOTH the norm generator
// and the fidelity test, so the encoded TS and the test are checked against the
// same authoritative source parse. The gold JSON is the INDEPENDENT oracle
// (test asserts parseNormPy == gold == generated TS).

import type { AgeBracket, DomainCode, FacetNumber } from '../src/types';
import type { DomainNorms, NormParams } from '../src/norms';

export interface RawStratum {
  id: number;
  sex: 'male' | 'female';
  ageBracket: AgeBracket;
  category: string;
  ns: number[]; // 71 floats: [0]=pad, [1..5]=domain means, [6..10]=domain SDs, ...
}

// The 8 base strata of the 120-item section, id -> (sex, age bracket).
const ID_TO_SEX_AGE: Record<number, [RawStratum['sex'], AgeBracket]> = {
  1: ['male', 'lt21'],
  2: ['male', 'a21_40'],
  3: ['male', 'a41_60'],
  4: ['male', 'gt60'],
  5: ['female', 'lt21'],
  6: ['female', 'a21_40'],
  7: ['female', 'a41_60'],
  8: ['female', 'gt60']
};

// domain order within the ns[] array.
const DOMAIN_ORDER: DomainCode[] = ['N', 'E', 'O', 'A', 'C'];

/**
 * Parse the 8 base (sex x age) strata out of the nquestion==120 section of
 * norm.py. Returns them sorted by id (1..8). Throws if the section, a stratum,
 * or the 71-float layout is missing/malformed.
 */
export function parseNormPy(pyText: string): RawStratum[] {
  const startTok = 'if nquestion == 120:';
  const endTok = 'elif nquestion == 300:';
  const start = pyText.indexOf(startTok);
  const end = pyText.indexOf(endTok);
  if (start < 0 || end < 0 || end <= start) {
    throw new Error('norm.py: could not locate the nquestion==120 section');
  }
  const section = pyText.slice(start, end);

  const re =
    /"id":\s*(\d+),\s*"ns":\s*\[([\s\S]*?)\],\s*"category":\s*"([^"]*)"/g;
  const out: RawStratum[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    const id = Number(m[1]);
    const mapping = ID_TO_SEX_AGE[id];
    if (!mapping) continue;
    const ns = m[2]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number);
    if (ns.length !== 71 || ns.some((n) => Number.isNaN(n))) {
      throw new Error(`norm.py: stratum id=${id} has a malformed ns[] array`);
    }
    const [sex, ageBracket] = mapping;
    out.push({ id, sex, ageBracket, category: m[3], ns });
  }
  if (out.length !== 8) {
    throw new Error(`norm.py: expected 8 base strata, parsed ${out.length}`);
  }
  return out.sort((a, b) => a.id - b.id);
}

/** Facet mean index in ns[]: 11 + domainIndex*12 + (facet-1). */
export function facetMeanIndex(domainIndex: number, facet: FacetNumber): number {
  return 11 + domainIndex * 12 + (facet - 1);
}

/** Facet SD index in ns[]: 17 + domainIndex*12 + (facet-1). */
export function facetSdIndex(domainIndex: number, facet: FacetNumber): number {
  return 17 + domainIndex * 12 + (facet - 1);
}

/** Expand a 71-float ns[] array into the typed per-domain norm structure. */
export function nsToNorms(ns: number[]): Record<DomainCode, DomainNorms> {
  const norms = {} as Record<DomainCode, DomainNorms>;
  DOMAIN_ORDER.forEach((domain, d) => {
    const facets = {} as Record<FacetNumber, NormParams>;
    for (let f = 1 as FacetNumber; f <= 6; f = (f + 1) as FacetNumber) {
      facets[f] = { mean: ns[facetMeanIndex(d, f)], sd: ns[facetSdIndex(d, f)] };
    }
    norms[domain] = {
      domain: { mean: ns[1 + d], sd: ns[6 + d] },
      facets
    };
  });
  return norms;
}
