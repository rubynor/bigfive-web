import type {
  AssessmentResult,
  DomainCode,
  DomainScore,
  FacetNumber,
  FacetScore,
  ScoreInput
} from './types';
import { DOMAIN_CODES, FACET_NUMBERS } from './types';
import { rawToT, tToPercentile } from './stats';
import { percentileToBand } from './bands';
import { facetName } from './facet-map';
import { DEFAULT_NORM_SOURCE, getNormSet, selectStratum } from './norms';
import type { NormParams } from './norms';

/**
 * Norm-based scoring for IPIP-NEO-120.
 *
 * Aggregates the (already key-corrected) raw item scores per domain (24 items)
 * and facet (4 items), selects a norm stratum from the demographics, then for
 * each raw sum computes T = 10*(raw-mean)/sd + 50, percentile = 100*Phi((T-50)/10),
 * and a band. Percentiles are stored unrounded on the open interval (0,100).
 *
 * Demographics are optional: missing sex -> combined (derived) stratum; missing
 * age -> 21-40 reference bracket (meta.fallbackApplied).
 */
export function scoreAssessment(input: ScoreInput): AssessmentResult {
  const { answers, demographics, normSource = DEFAULT_NORM_SOURCE } = input;

  // 1. raw sums per domain and per (domain, facet)
  const rawDomain: Partial<Record<string, number>> = {};
  const rawFacet: Partial<Record<string, Partial<Record<number, number>>>> = {};
  for (const a of answers) {
    rawDomain[a.domain] = (rawDomain[a.domain] ?? 0) + a.score;
    if (a.facet === undefined) continue;
    const byFacet = (rawFacet[a.domain] ??= {});
    byFacet[a.facet] = (byFacet[a.facet] ?? 0) + a.score;
  }

  // 2. pick the norm stratum
  const { stratum, fallbackApplied } = selectStratum(demographics, normSource);
  const set = getNormSet(normSource);

  // 3. raw -> T -> percentile -> band
  const score = (raw: number, params: NormParams) => {
    const t = rawToT(raw, params.mean, params.sd);
    const percentile = tToPercentile(t);
    return { t, percentile, band: percentileToBand(percentile) };
  };

  const domains = {} as Record<DomainCode, DomainScore>;
  for (const domain of DOMAIN_CODES) {
    const norms = stratum.norms[domain];
    const raw = rawDomain[domain] ?? 0;

    const facets: Record<string, FacetScore> = {};
    for (const f of FACET_NUMBERS as readonly FacetNumber[]) {
      const fraw = rawFacet[domain]?.[f] ?? 0;
      facets[String(f)] = {
        facet: f,
        name: facetName(domain, f),
        raw: fraw,
        ...score(fraw, norms.facets[f])
      };
    }

    domains[domain] = {
      domain,
      raw,
      ...score(raw, norms.domain),
      facets
    };
  }

  return {
    domains,
    meta: {
      normSource,
      normLabel: set.meta.label,
      stratum: stratum.label,
      stratumSex: stratum.sex,
      stratumAgeBracket: stratum.ageBracket,
      fallbackApplied,
      combinedDerived: stratum.combinedDerived ?? false,
      demographics: demographics ?? {}
    }
  };
}
