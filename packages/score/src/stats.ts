// Exact-enough normal CDF, erf-based. No dependencies.
//
// This REPLACES the upstream cubic percentile approximation (five-factor-e's
// `Norm.percent`), which is non-monotonic near T ~ 70-73 and can exceed 99
// inside its valid range (deviations up to ~1.9 percentile points). The cubic
// is a deliberate bug we do not reproduce.
//
// erf is the Abramowitz & Stegun 7.1.26 rational-times-exponential form
// (max abs error ~1.5e-7). It is strictly monotonic across the whole real line,
// which is the property the scoring engine depends on: percentile must be
// strictly increasing in raw score (guarded by a property test).

const SQRT2 = Math.SQRT2;

// A&S 7.1.26 coefficients.
const P = 0.3275911;
const A1 = 0.254829592;
const A2 = -0.284496736;
const A3 = 1.421413741;
const A4 = -1.453152027;
const A5 = 1.061405429;

/** Error function, erf(x), via Abramowitz & Stegun 7.1.26. Odd: erf(-x)=-erf(x). */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + P * ax);
  const y =
    1 - ((((A5 * t + A4) * t + A3) * t + A2) * t + A1) * t * Math.exp(-ax * ax);
  return sign * y;
}

/** Standard normal CDF, Phi(z) = 0.5*(1 + erf(z/sqrt2)). In (0,1). */
export function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / SQRT2));
}

/**
 * T-score -> percentile, on the open interval (0,100): a standard T-score has
 * mean 50, sd 10, so z = (t-50)/10 and percentile = 100*Phi(z). No [1,99]
 * clamp (five-factor-e clamps for display) — we keep the raw value so
 * percentiles stay strictly monotonic in raw score.
 */
export function tToPercentile(t: number): number {
  return 100 * normalCdf((t - 50) / 10);
}

/** Raw -> T-score against a (mean, sd): T = 10*(raw-mean)/sd + 50. */
export function rawToT(raw: number, mean: number, sd: number): number {
  return (10 * (raw - mean)) / sd + 50;
}
