// Core types for the norm-based IPIP-NEO-120 score engine.
//
// The pipeline is: raw item sums -> T-score (per selected norm stratum) ->
// percentile (exact normal CDF) -> band. Everything here is pure data; no I/O.

import type { NormSourceId } from './norms';

export type DomainCode = 'N' | 'E' | 'O' | 'A' | 'C';
export type FacetNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type Sex = 'male' | 'female';
export type AgeBracket = 'lt21' | 'a21_40' | 'a41_60' | 'gt60';
export type Band = 'very low' | 'low' | 'average' | 'high' | 'very high';

export interface Demographics {
  sex?: Sex;
  ageBracket?: AgeBracket;
}

// Canonical orders. DOMAIN_CODES matches the norm.py `ns[]` domain order
// (N,E,O,A,C); do not reorder without regenerating the norm tables.
export const DOMAIN_CODES: readonly DomainCode[] = ['N', 'E', 'O', 'A', 'C'];
export const FACET_NUMBERS: readonly FacetNumber[] = [1, 2, 3, 4, 5, 6];

// IPIP-NEO-120 fixed structure.
export const DOMAIN_ITEM_COUNT = 24;
export const FACET_ITEM_COUNT = 4;

// --- assessment result (what scoreAssessment produces) ---

export interface FacetScore {
  facet: FacetNumber;
  name: string; // e.g. 'anxiety'
  raw: number; // sum of the facet's 4 items (4..20)
  t: number; // T = 10*(raw-mean)/sd + 50
  percentile: number; // 100*Phi((t-50)/10), open (0,100)
  band: Band;
}

export interface DomainScore {
  domain: DomainCode;
  raw: number; // sum of the domain's 24 items (24..120)
  t: number;
  percentile: number; // open (0,100)
  band: Band;
  facets: Record<string, FacetScore>; // keyed '1'..'6'
}

export interface ScoreMeta {
  normSource: NormSourceId;
  normLabel: string; // human-readable norm-set label
  stratum: string; // human-readable stratum label
  stratumSex: Sex | 'combined';
  stratumAgeBracket: AgeBracket;
  // true when age was unknown and a reference bracket had to be substituted.
  fallbackApplied: boolean;
  // true when the stratum was derived by combining male+female (sex unknown),
  // using averaged means + pooled SD (a documented deviation from five-factor-e).
  combinedDerived: boolean;
  demographics: Demographics; // as supplied (may be empty)
}

export interface AssessmentResult {
  domains: Record<DomainCode, DomainScore>;
  meta: ScoreMeta;
}

// --- scoreAssessment input ---

export interface ScoreInputAnswer {
  domain: string;
  facet?: number;
  // The already-key-corrected item score (1..5). Reverse-keying is baked into
  // the @bigfive-org/questions choices, so this is the selected choice.score.
  score: number;
}

export interface ScoreInput {
  answers: ScoreInputAnswer[];
  demographics?: Demographics;
  normSource?: NormSourceId;
}
