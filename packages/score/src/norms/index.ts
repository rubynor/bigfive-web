import type {
  AgeBracket,
  Demographics,
  DomainCode,
  FacetNumber,
  Sex
} from '../types';
import { DOMAIN_CODES, FACET_NUMBERS } from '../types';
import { labelFor } from './labels';
import { johnsonWebReport } from './sources/johnson-webreport';

export { labelFor, AGE_BRACKET_LABELS } from './labels';

// --- norm table shape -------------------------------------------------------

export interface NormParams {
  mean: number;
  sd: number; // always > 0
}

export interface DomainNorms {
  domain: NormParams;
  facets: Record<FacetNumber, NormParams>;
}

export interface NormStratum {
  sex: Sex | 'combined';
  ageBracket: AgeBracket;
  label: string;
  norms: Record<DomainCode, DomainNorms>;
  // set on strata derived by combineStrata (sex unknown).
  combinedDerived?: boolean;
}

export interface NormMeta {
  id: string;
  label: string;
  source: string;
  provenanceNote: string;
  instrument: string;
  version: string;
  ageBrackets: AgeBracket[];
  combinedMethod: string;
}

// A norm set ships ONLY the 8 base (sex x age) strata. The combined/neutral
// strata are derived on demand (combineStrata) so the data stays minimal and
// the pooled-SD policy lives in one place.
export interface NormSet {
  meta: NormMeta;
  strata: NormStratum[]; // exactly the 8 base strata
}

// --- swappable source registry ---------------------------------------------
// Adding another documented source here must not touch scoring logic.

export const NORM_SOURCES = {
  'johnson-webreport': johnsonWebReport
} as const;

export type NormSourceId = keyof typeof NORM_SOURCES;

export const DEFAULT_NORM_SOURCE: NormSourceId = 'johnson-webreport';

export function getNormSet(source: NormSourceId = DEFAULT_NORM_SOURCE): NormSet {
  return NORM_SOURCES[source];
}

export function listNormSources(): NormSourceId[] {
  return Object.keys(NORM_SOURCES) as NormSourceId[];
}

// --- combining (documented deviation from five-factor-e) --------------------

/**
 * Pool two norm params into a combined one:
 *   mean_c = (mean_m + mean_f) / 2
 *   sd_c   = sqrt( 0.5*(sd_m^2 + sd_f^2) + 0.25*(mean_m - mean_f)^2 )
 *
 * The pooled SD is the exact SD of the 50/50 mixture of two normal groups
 * (within-group variance + between-group variance). five-factor-e instead
 * averages the SDs, which understates dispersion whenever the sexes differ;
 * pooling is a deliberate improvement. sd_c >= avg(sd_m, sd_f), with equality
 * iff mean_m == mean_f (proved in the tests).
 */
export function combineParams(m: NormParams, f: NormParams): NormParams {
  const mean = (m.mean + f.mean) / 2;
  const within = 0.5 * (m.sd * m.sd + f.sd * f.sd);
  const between = 0.25 * (m.mean - f.mean) * (m.mean - f.mean);
  return { mean, sd: Math.sqrt(within + between) };
}

/** Derive the combined stratum for an age bracket from its male+female strata. */
export function combineStrata(male: NormStratum, female: NormStratum): NormStratum {
  const norms = {} as Record<DomainCode, DomainNorms>;
  for (const domain of DOMAIN_CODES) {
    const dm = male.norms[domain];
    const df = female.norms[domain];
    const facets = {} as Record<FacetNumber, NormParams>;
    for (const f of FACET_NUMBERS) {
      facets[f] = combineParams(dm.facets[f], df.facets[f]);
    }
    norms[domain] = { domain: combineParams(dm.domain, df.domain), facets };
  }
  return {
    sex: 'combined',
    ageBracket: male.ageBracket,
    label: labelFor('combined', male.ageBracket),
    norms,
    combinedDerived: true
  };
}

// --- stratum selection ------------------------------------------------------

export interface StratumSelection {
  stratum: NormStratum;
  fallbackApplied: boolean; // age unknown -> reference bracket substituted
}

// Missing-age fallback: the modal adult group (a real published bracket, not a
// synthesized pool).
export const FALLBACK_AGE_BRACKET: AgeBracket = 'a21_40';

export function findBaseStratum(
  set: NormSet,
  sex: Sex,
  ageBracket: AgeBracket
): NormStratum | undefined {
  return set.strata.find((s) => s.sex === sex && s.ageBracket === ageBracket);
}

/**
 * Pick the norm stratum for (possibly partial) demographics:
 *   - both present  -> exact (sex + age)
 *   - sex missing   -> combined + age (derived)
 *   - age missing   -> sex + fallback bracket           (fallbackApplied)
 *   - both missing  -> combined + fallback bracket      (fallbackApplied)
 * fallbackApplied is true exactly when age was unknown.
 */
export function selectStratum(
  demographics: Demographics | undefined,
  source: NormSourceId = DEFAULT_NORM_SOURCE
): StratumSelection {
  const set = getNormSet(source);
  const hasAge = Boolean(demographics?.ageBracket);
  const ageBracket: AgeBracket = demographics?.ageBracket ?? FALLBACK_AGE_BRACKET;
  const sex = demographics?.sex;

  if (sex) {
    const stratum = findBaseStratum(set, sex, ageBracket);
    if (!stratum) {
      throw new Error(
        `Norm source '${source}' missing stratum ${sex}/${ageBracket}`
      );
    }
    return { stratum, fallbackApplied: !hasAge };
  }

  // sex unknown -> combine male + female for the (possibly fallback) bracket.
  const male = findBaseStratum(set, 'male', ageBracket);
  const female = findBaseStratum(set, 'female', ageBracket);
  if (!male || !female) {
    throw new Error(
      `Norm source '${source}' missing male/female stratum for ${ageBracket}`
    );
  }
  return { stratum: combineStrata(male, female), fallbackApplied: !hasAge };
}
