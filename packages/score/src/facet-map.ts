import type { DomainCode, FacetNumber } from './types';

// Facet names per domain, facet numbers 1..6, matching the norm.py `ns[]`
// facet order (and the @bigfive-org/questions item ordering). Verified against
// five-factor-e; do not reorder.
export const FACET_NAMES: Record<DomainCode, Record<FacetNumber, string>> = {
  N: {
    1: 'anxiety',
    2: 'anger',
    3: 'depression',
    4: 'self_consciousness',
    5: 'immoderation',
    6: 'vulnerability'
  },
  E: {
    1: 'friendliness',
    2: 'gregariousness',
    3: 'assertiveness',
    4: 'activity_level',
    5: 'excitement_seeking',
    6: 'cheerfulness'
  },
  O: {
    1: 'imagination',
    2: 'artistic_interests',
    3: 'emotionality',
    4: 'adventurousness',
    5: 'intellect',
    6: 'liberalism'
  },
  A: {
    1: 'trust',
    2: 'morality',
    3: 'altruism',
    4: 'cooperation',
    5: 'modesty',
    6: 'sympathy'
  },
  C: {
    1: 'self_efficacy',
    2: 'orderliness',
    3: 'dutifulness',
    4: 'achievement_striving',
    5: 'self_discipline',
    6: 'cautiousness'
  }
};

export function facetName(domain: DomainCode, facet: FacetNumber): string {
  return FACET_NAMES[domain][facet];
}
