import type { AssessmentResult, Band, DomainCode } from './types';
import { DOMAIN_CODES, DOMAIN_ITEM_COUNT, FACET_ITEM_COUNT } from './types';

// The legacy Result shape consumed by @bigfive-org/results generateResult. This
// is the load-bearing compatibility contract; toLegacyScores must emit it so
// the existing result text keeps working unmodified.
export type LegacyResultCategory = 'low' | 'neutral' | 'high';

export interface LegacyFacet {
  score: number;
  count: number;
  result: LegacyResultCategory;
}

export interface LegacyDomain {
  score: number;
  count: number;
  result: LegacyResultCategory;
  facet: Record<string, LegacyFacet>;
}

export type LegacyScores = Record<string, LegacyDomain>;

/** Collapse the 5-band percentile scale to the legacy 3-category scale. */
export function bandToLegacy(band: Band): LegacyResultCategory {
  if (band === 'very low' || band === 'low') return 'low';
  if (band === 'high' || band === 'very high') return 'high';
  return 'neutral';
}

/**
 * Convert an AssessmentResult into the legacy scores object generateResult
 * consumes: `score` is the raw sum (unchanged), `count` is the fixed item count,
 * `result` is the norm-based band collapsed to low|neutral|high. Domain keys are
 * N/E/O/A/C; facet keys are '1'..'6'.
 */
export function toLegacyScores(result: AssessmentResult): LegacyScores {
  const out: LegacyScores = {};
  for (const domain of DOMAIN_CODES as DomainCode[]) {
    const d = result.domains[domain];
    const facet: Record<string, LegacyFacet> = {};
    for (const key of Object.keys(d.facets)) {
      const f = d.facets[key];
      facet[key] = {
        score: f.raw,
        count: FACET_ITEM_COUNT,
        result: bandToLegacy(f.band)
      };
    }
    out[domain] = {
      score: d.raw,
      count: DOMAIN_ITEM_COUNT,
      result: bandToLegacy(d.band),
      facet
    };
  }
  return out;
}
