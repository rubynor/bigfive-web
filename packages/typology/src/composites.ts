// Heuristic composite traits — blends of facet percentiles that don't correspond
// to any validated scale. They are explicitly flagged `heuristic: true` and carry
// their own `formula` string so the UI can disclaim them and a curious user can
// see (and later tune) exactly how each number was built. Every weight set sums
// to 1, so each score is a convex combination of percentiles and stays in [0,100].

import type {
  AssessmentResult,
  Band,
  DomainCode,
  FacetNumber
} from '../../score/src/types';
import { percentileToBand } from '../../score/src/bands';
import { facetName } from '../../score/src/facet-map';

export type CompositeKey =
  'perfectionism' | 'ambition' | 'motivation' | 'desireToLead';

export interface CompositeComponent {
  code: string; // e.g. 'C4'
  domain: DomainCode;
  facet: FacetNumber;
  name: string; // facet name, e.g. 'achievement_striving'
  weight: number;
  percentile: number; // this facet's percentile for the assessment
}

export interface CompositeTrait {
  key: CompositeKey;
  name: string;
  score: number; // weighted sum of component percentiles, in [0, 100]
  band: Band;
  heuristic: true; // always — these are not validated scales
  formula: string; // e.g. '0.35·C4 + 0.35·C2 + 0.30·N4'
  components: CompositeComponent[];
}

interface CompositeTerm {
  domain: DomainCode;
  facet: FacetNumber;
  weight: number;
}

interface CompositeSpec {
  key: CompositeKey;
  name: string;
  terms: CompositeTerm[];
}

// Weights per spec; each set sums to 1.0 (asserted by composites.test.ts).
const COMPOSITE_SPECS: readonly CompositeSpec[] = [
  {
    key: 'perfectionism',
    name: 'Perfectionism',
    terms: [
      { domain: 'C', facet: 4, weight: 0.35 }, // Achievement-Striving
      { domain: 'C', facet: 2, weight: 0.35 }, // Orderliness
      { domain: 'N', facet: 4, weight: 0.3 } // Self-Consciousness
    ]
  },
  {
    key: 'ambition',
    name: 'Ambition',
    terms: [
      { domain: 'C', facet: 4, weight: 0.4 }, // Achievement-Striving
      { domain: 'E', facet: 3, weight: 0.3 }, // Assertiveness
      { domain: 'C', facet: 1, weight: 0.3 } // Self-Efficacy
    ]
  },
  {
    key: 'motivation',
    name: 'Motivation',
    terms: [
      { domain: 'C', facet: 5, weight: 0.4 }, // Self-Discipline
      { domain: 'C', facet: 4, weight: 0.3 }, // Achievement-Striving
      { domain: 'C', facet: 1, weight: 0.3 } // Self-Efficacy
    ]
  },
  {
    key: 'desireToLead',
    name: 'Desire to Lead',
    terms: [
      { domain: 'E', facet: 3, weight: 0.45 }, // Assertiveness (primary)
      { domain: 'C', facet: 4, weight: 0.25 }, // Achievement-Striving
      { domain: 'E', facet: 4, weight: 0.15 }, // Activity Level
      { domain: 'E', facet: 2, weight: 0.15 } // Gregariousness (mild booster)
    ]
  }
];

function formatWeight(weight: number): string {
  return weight.toFixed(2);
}

/**
 * Compute the four heuristic composite traits from an AssessmentResult. Each
 * trait's score is Σ(weight · facetPercentile); since the weights sum to 1 the
 * result is a percentile-scale number in [0, 100] with a band for display.
 */
export function computeComposites(
  assessment: AssessmentResult
): CompositeTrait[] {
  const facetPct = (d: DomainCode, f: FacetNumber) =>
    assessment.domains[d].facets[String(f)].percentile;

  return COMPOSITE_SPECS.map((spec) => {
    const components: CompositeComponent[] = spec.terms.map((t) => ({
      code: `${t.domain}${t.facet}`,
      domain: t.domain,
      facet: t.facet,
      name: facetName(t.domain, t.facet),
      weight: t.weight,
      percentile: facetPct(t.domain, t.facet)
    }));
    const score = components.reduce((s, c) => s + c.weight * c.percentile, 0);
    const formula = spec.terms
      .map((t) => `${formatWeight(t.weight)}·${t.domain}${t.facet}`)
      .join(' + ');
    return {
      key: spec.key,
      name: spec.name,
      score,
      band: percentileToBand(score),
      heuristic: true,
      formula,
      components
    };
  });
}
