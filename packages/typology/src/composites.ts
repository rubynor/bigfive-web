// Composite traits derived from Big Five percentiles. These are linear
// projections, NOT administered scales, so every trait is flagged
// `heuristic: true` and carries its exact `formula` plus a `provenance` note
// the UI can disclose. Two groups:
//
//   - Empirically anchored (perfectionisticStrivings, perfectionisticConcerns,
//     selfControl, procrastination): weights are published meta-analytic
//     Big Five correlations (normalized to sum 1 where needed), cited per spec.
//     Source digest: compass_artifact_wf-4b98090b (repo root).
//   - Editorial heuristics (ambition, motivation, desireToLead): hand-picked
//     facet weights, user-approved in Phase 2. No published anchor.
//
// Perfectionism is deliberately SPLIT into strivings vs concerns following
// Smith, Sherry, Vidovic, Saklofske, Stoeber & Benoit (2019; k = 77,
// N = 24,789): the two factors have different Big Five signatures and the
// literature explicitly recommends against a single composite score.
// Grit is deliberately ABSENT: ρ = .84 with Conscientiousness (Credé, Tynan &
// Harms 2017) makes it a re-label of C, not an additional signal.
//
// Every weight set sums to 1 and each term is a percentile or its reverse
// (100 − percentile), so scores are convex combinations that stay in [0, 100].

import type {
  AssessmentResult,
  Band,
  DomainCode,
  FacetNumber
} from '../../score/src/types';
import { percentileToBand } from '../../score/src/bands';
import { facetName } from '../../score/src/facet-map';

export type CompositeKey =
  | 'perfectionisticStrivings'
  | 'perfectionisticConcerns'
  | 'selfControl'
  | 'procrastination'
  | 'ambition'
  | 'motivation'
  | 'desireToLead';

export interface CompositeComponent {
  code: string; // 'C4' (facet term) or 'N' (whole-domain term)
  domain: DomainCode;
  facet?: FacetNumber; // absent → the domain percentile is the basis
  name: string; // 'achievement_striving' or 'neuroticism'
  reversed: boolean; // true → contributes (100 − percentile)
  weight: number;
  percentile: number; // the raw (unreversed) percentile
}

export interface CompositeTrait {
  key: CompositeKey;
  name: string;
  score: number; // Σ weight · (reversed ? 100 − percentile : percentile)
  band: Band;
  heuristic: true; // always — none of these are validated administered scales
  formula: string; // e.g. '0.50·N + 0.26·(100−A) + 0.24·(100−E)'
  provenance: string; // where the weights come from (citation or 'editorial')
  components: CompositeComponent[];
}

interface CompositeTerm {
  domain: DomainCode;
  facet?: FacetNumber;
  weight: number;
  reversed?: boolean;
}

interface CompositeSpec {
  key: CompositeKey;
  name: string;
  provenance: string;
  terms: CompositeTerm[];
}

const DOMAIN_NAMES: Record<DomainCode, string> = {
  N: 'neuroticism',
  E: 'extraversion',
  O: 'openness',
  A: 'agreeableness',
  C: 'conscientiousness'
};

// Tangney SCS × Big Five correlations, normalized by their absolute sum so the
// weights form a convex combination (0.54 + 0.50 + 0.29 = 1.33).
const SCS_SUM = 0.54 + 0.5 + 0.29;

// Weights per spec; each set sums to 1.0 (asserted by composites.test.ts).
const COMPOSITE_SPECS: readonly CompositeSpec[] = [
  {
    // Smith et al. (2019) two-factor model: strivings load on Conscientiousness
    // (rc+ = .44) and on nothing else at the factor level — so the projection
    // IS the Conscientiousness percentile, honestly labeled.
    key: 'perfectionisticStrivings',
    name: 'Perfectionistic Strivings',
    provenance:
      'Smith et al. (2019) meta-analysis (k=77, N=24,789): perfectionistic strivings load on Conscientiousness (rc+ = .44) only. Rendered as the Conscientiousness percentile; heuristic projection, not an administered perfectionism scale.',
    terms: [{ domain: 'C', weight: 1 }]
  },
  {
    // Smith et al. (2019): concerns ← Neuroticism .50, Agreeableness −.26,
    // Extraversion −.24. The correlation magnitudes sum to exactly 1.00 and are
    // used as-is for the weights.
    key: 'perfectionisticConcerns',
    name: 'Perfectionistic Concerns',
    provenance:
      'Smith et al. (2019) meta-analysis: perfectionistic concerns correlate rc+ = .50 with Neuroticism, −.26 with Agreeableness, −.24 with Extraversion; the magnitudes (which sum to 1.00) are the weights. Heuristic projection, not an administered perfectionism scale.',
    terms: [
      { domain: 'N', weight: 0.5 },
      { domain: 'A', weight: 0.26, reversed: true },
      { domain: 'E', weight: 0.24, reversed: true }
    ]
  },
  {
    // Tangney Self-Control Scale × Big Five: C .54, N −.50, A .29,
    // normalized by 1.33 (their absolute sum).
    key: 'selfControl',
    name: 'Self-Control',
    provenance:
      "Tangney's Self-Control Scale correlates ≈ .54 with Conscientiousness, −.50 with Neuroticism, .29 with Agreeableness; the magnitudes normalized to sum 1 are the weights. Heuristic projection, not the SCS.",
    terms: [
      { domain: 'C', weight: 0.54 / SCS_SUM },
      { domain: 'N', weight: 0.5 / SCS_SUM, reversed: true },
      { domain: 'A', weight: 0.29 / SCS_SUM }
    ]
  },
  {
    // Steel (2007, meta-analysis of 691 correlations): procrastination ×
    // Conscientiousness r ≈ −.62, its only strong Big Five anchor — rendered
    // as reversed Conscientiousness.
    key: 'procrastination',
    name: 'Procrastination',
    provenance:
      'Steel (2007) meta-analysis: procrastination correlates r ≈ −.62 with Conscientiousness (no other strong Big Five anchor). Rendered as the reversed Conscientiousness percentile; heuristic projection, not a procrastination scale.',
    terms: [{ domain: 'C', weight: 1, reversed: true }]
  },
  {
    key: 'ambition',
    name: 'Ambition',
    provenance:
      'Editorial heuristic (Phase 2, user-approved): hand-picked facet weights, no published anchor.',
    terms: [
      { domain: 'C', facet: 4, weight: 0.4 }, // Achievement-Striving
      { domain: 'E', facet: 3, weight: 0.3 }, // Assertiveness
      { domain: 'C', facet: 1, weight: 0.3 } // Self-Efficacy
    ]
  },
  {
    key: 'motivation',
    name: 'Motivation',
    provenance:
      'Editorial heuristic (Phase 2, user-approved): hand-picked facet weights, no published anchor.',
    terms: [
      { domain: 'C', facet: 5, weight: 0.4 }, // Self-Discipline
      { domain: 'C', facet: 4, weight: 0.3 }, // Achievement-Striving
      { domain: 'C', facet: 1, weight: 0.3 } // Self-Efficacy
    ]
  },
  {
    key: 'desireToLead',
    name: 'Desire to Lead',
    provenance:
      'Editorial heuristic (Phase 2, user-approved): hand-picked facet weights, no published anchor.',
    terms: [
      { domain: 'E', facet: 3, weight: 0.45 }, // Assertiveness (primary)
      { domain: 'C', facet: 4, weight: 0.25 }, // Achievement-Striving
      { domain: 'E', facet: 4, weight: 0.15 }, // Activity Level
      { domain: 'E', facet: 2, weight: 0.15 } // Gregariousness (mild booster)
    ]
  }
];

// 3 decimals, trailing zero trimmed: 0.5 → '0.50', 0.54/1.33 → '0.406'.
function formatWeight(weight: number): string {
  const three = weight.toFixed(3);
  return three.endsWith('0') ? three.slice(0, -1) : three;
}

/**
 * Compute the composite traits from an AssessmentResult. Each score is
 * Σ(weight · basis) with basis = the term's domain/facet percentile, reversed
 * (100 − percentile) where flagged; since the weights sum to 1 the result is a
 * percentile-scale number in [0, 100] with a band for display.
 */
export function computeComposites(
  assessment: AssessmentResult
): CompositeTrait[] {
  const pct = (t: CompositeTerm) =>
    t.facet !== undefined
      ? assessment.domains[t.domain].facets[String(t.facet)].percentile
      : assessment.domains[t.domain].percentile;

  return COMPOSITE_SPECS.map((spec) => {
    const components: CompositeComponent[] = spec.terms.map((t) => ({
      code: t.facet !== undefined ? `${t.domain}${t.facet}` : t.domain,
      domain: t.domain,
      facet: t.facet,
      name:
        t.facet !== undefined
          ? facetName(t.domain, t.facet)
          : DOMAIN_NAMES[t.domain],
      reversed: t.reversed ?? false,
      weight: t.weight,
      percentile: pct(t)
    }));
    const score = components.reduce(
      (s, c) => s + c.weight * (c.reversed ? 100 - c.percentile : c.percentile),
      0
    );
    const formula = components
      .map(
        (c) =>
          `${formatWeight(c.weight)}·${c.reversed ? `(100−${c.code})` : c.code}`
      )
      .join(' + ');
    return {
      key: spec.key,
      name: spec.name,
      score,
      band: percentileToBand(score),
      heuristic: true,
      formula,
      provenance: spec.provenance,
      components
    };
  });
}
