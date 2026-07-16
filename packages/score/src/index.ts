// @bigfive-org/score — norm-based percentile scoring for IPIP-NEO-120.
//
// Pipeline: raw item sums -> T-score (per norm stratum) -> percentile (exact
// normal CDF) -> band. Pure and deterministic. See ARCHITECTURE.md.

export * from './types';
export * from './norms';
export * from './stats';
export * from './bands';
export * from './facet-map';
export * from './scoring';
export * from './adapter';
export * from './key-validation';

// Legacy raw-threshold scorer (superseded; kept for back-compat + fixtures).
export { processAnswers, calculateResult } from './legacy';

import type { ScoreInput } from './types';
import { scoreAssessment } from './scoring';
import { toLegacyScores, type LegacyScores } from './adapter';

/**
 * Back-compat default export: same call shape as upstream calculateScore, but
 * now norm-based. Returns the legacy scores object (raw sums + low|neutral|high
 * bands) so existing @bigfive-org/results consumers keep working.
 */
export default function calculateScore(input: ScoreInput): LegacyScores {
  return toLegacyScores(scoreAssessment(input));
}
