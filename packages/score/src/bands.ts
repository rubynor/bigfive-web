import type { Band } from './types';

// Banding is done from PERCENTILES (not T-scores): very low <10, low 10-30,
// average 30-70, high 70-90, very high >=90. Boundaries assign the lower band's
// upper edge to the next band (e.g. exactly 30 -> average).
export const BAND_THRESHOLDS = {
  veryLow: 10,
  low: 30,
  average: 70,
  high: 90
} as const;

export function percentileToBand(percentile: number): Band {
  if (percentile < BAND_THRESHOLDS.veryLow) return 'very low';
  if (percentile < BAND_THRESHOLDS.low) return 'low';
  if (percentile < BAND_THRESHOLDS.average) return 'average';
  if (percentile < BAND_THRESHOLDS.high) return 'high';
  return 'very high';
}
