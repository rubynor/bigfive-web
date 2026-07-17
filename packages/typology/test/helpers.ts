// Test-only builder for a synthetic AssessmentResult. computeTypology and
// computeComposites read nothing but domain/facet *percentiles*, so this lets a
// test set exactly the percentiles it cares about (everything else defaults) and
// compute expected typology/composite outputs independently of the norm tables.
// raw/t are left at 0 — deliberately inconsistent with the percentile, and
// deliberately ignored by everything under test.

import type {
  AssessmentResult,
  DomainCode,
  DomainScore,
  FacetNumber,
  FacetScore
} from '../../score/src/types';
import { DOMAIN_CODES, FACET_NUMBERS } from '../../score/src/types';
import { percentileToBand } from '../../score/src/bands';
import { facetName } from '../../score/src/facet-map';

export interface AssessmentSpec {
  /** Per-domain percentile overrides. */
  domains?: Partial<Record<DomainCode, number>>;
  /** Per-(domain, facet) percentile overrides. */
  facets?: Partial<Record<DomainCode, Partial<Record<FacetNumber, number>>>>;
  /** Percentile used for anything not overridden (default 50). */
  default?: number;
}

export function makeAssessment(spec: AssessmentSpec = {}): AssessmentResult {
  const dflt = spec.default ?? 50;
  const domains = {} as Record<DomainCode, DomainScore>;

  for (const d of DOMAIN_CODES) {
    const domainPct = spec.domains?.[d] ?? dflt;
    const facets: Record<string, FacetScore> = {};
    for (const f of FACET_NUMBERS) {
      const facetPct = spec.facets?.[d]?.[f] ?? dflt;
      facets[String(f)] = {
        facet: f,
        name: facetName(d, f),
        raw: 0,
        t: 0,
        percentile: facetPct,
        band: percentileToBand(facetPct)
      };
    }
    domains[d] = {
      domain: d,
      raw: 0,
      t: 0,
      percentile: domainPct,
      band: percentileToBand(domainPct),
      facets
    };
  }

  return {
    domains,
    meta: {
      normSource: 'johnson-webreport',
      normLabel: 'test',
      stratum: 'test',
      stratumSex: 'combined',
      stratumAgeBracket: 'a21_40',
      fallbackApplied: false,
      combinedDerived: false,
      demographics: {}
    }
  };
}
