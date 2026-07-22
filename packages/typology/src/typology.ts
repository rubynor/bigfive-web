// 16Personalities-style typology derived from the norm-based percentiles.
//
// Every axis is decided from a *percentile* (norms already baked in), so the
// midpoint is a fixed 50 — no raw-score thresholds leak in here. Four axes read
// a single domain percentile; the J/P axis is a documented composite (weights in
// `meta.jpWeights`). Each axis is reported continuously (basis %, strength toward
// the chosen letter, distance from the midpoint) and flagged `borderline` when it
// sits within ±5 of 50, so the UI can be honest about coin-flip axes instead of
// presenting a crisp four-letter type it doesn't really have.

import type {
  AssessmentResult,
  DomainCode,
  FacetNumber
} from '../../score/src/types';

export type AxisKey = 'EI' | 'NS' | 'TF' | 'JP' | 'AT';

// 16P grouping layers, derived purely from the axis letters (no new numeric
// constants). Roles follow the 16personalities scheme: intuitive types split
// by Nature (N_T Analyst / N_F Diplomat), observant types by Tactics
// (S_J Sentinel / S_P Explorer). Strategies cross Mind with Identity.
export type RoleKey = 'analyst' | 'diplomat' | 'sentinel' | 'explorer';
export type StrategyKey =
  | 'confidentIndividualism'
  | 'peopleMastery'
  | 'constantImprovement'
  | 'socialEngagement';

/** The two-letter poles of an axis and the domain/label its basis comes from. */
export interface TypologyAxis {
  key: AxisKey;
  letter: string; // the chosen pole (basis ≥ 50 → highLetter, else lowLetter)
  highLetter: string; // pole when basis ≥ 50
  lowLetter: string; // pole when basis < 50
  basisLabel: string; // e.g. 'Extraversion' or 'jScore'
  basisPercentile: number; // the deciding percentile, in (0, 100)
  strengthTowardLetter: number; // % toward the chosen pole (≥ 50)
  distanceFromMidpoint: number; // |basis − 50|
  borderline: boolean; // basis ∈ [45, 55]
}

/** Weights of the J/P composite. Documented + surfaced so it can be tuned. */
export interface JpWeights {
  orderliness: number; // C2
  cautiousness: number; // C6
  opennessReversed: number; // applied to (100 − Openness percentile)
}

export interface TypologyMeta {
  midpoint: number; // 50
  borderlineRadius: number; // 5 → borderline band is [45, 55]
  jScore: number; // the computed J/P basis
  jpWeights: JpWeights;
}

export interface Typology {
  type: string; // e.g. 'INTP-T'
  role: RoleKey; // letter-derived 16P role group
  strategy: StrategyKey; // letter-derived 16P strategy group
  axes: TypologyAxis[]; // canonical order: EI, NS, TF, JP, AT
  borderline: boolean; // true if ANY axis is borderline
  meta: TypologyMeta;
}

export const TYPOLOGY_MIDPOINT = 50;
export const TYPOLOGY_BORDERLINE_RADIUS = 5;

// jScore = 0.40·C2(Orderliness) + 0.40·C6(Cautiousness) + 0.20·(100 − Openness).
// J blends structure/planning (Orderliness), deliberation before acting
// (Cautiousness ≈ NEO "Deliberation") and low spontaneity (reversed Openness).
export const JP_WEIGHTS: JpWeights = {
  orderliness: 0.4,
  cautiousness: 0.4,
  opennessReversed: 0.2
};

function buildAxis(
  key: AxisKey,
  highLetter: string,
  lowLetter: string,
  basisLabel: string,
  basis: number
): TypologyAxis {
  const chosenHigh = basis >= TYPOLOGY_MIDPOINT;
  const distanceFromMidpoint = Math.abs(basis - TYPOLOGY_MIDPOINT);
  return {
    key,
    letter: chosenHigh ? highLetter : lowLetter,
    highLetter,
    lowLetter,
    basisLabel,
    basisPercentile: basis,
    strengthTowardLetter: chosenHigh ? basis : 100 - basis,
    distanceFromMidpoint,
    borderline: distanceFromMidpoint <= TYPOLOGY_BORDERLINE_RADIUS
  };
}

/**
 * Derive the typology from an AssessmentResult's percentiles.
 *
 * Axis rules (basis ≥ 50 selects the first letter):
 *   E/I ← Extraversion · N/S ← Openness · T/F ← Agreeableness (≥50 → F)
 *   J/P ← jScore · A/T ← Neuroticism (≥50 → T, Turbulent)
 * Type string = `${EI}${NS}${TF}${JP}-${AT}`, e.g. `INTP-T`.
 */
export function computeTypology(assessment: AssessmentResult): Typology {
  const pct = (d: DomainCode) => assessment.domains[d].percentile;
  const facetPct = (d: DomainCode, f: FacetNumber) =>
    assessment.domains[d].facets[String(f)].percentile;

  const jScore =
    JP_WEIGHTS.orderliness * facetPct('C', 2) +
    JP_WEIGHTS.cautiousness * facetPct('C', 6) +
    JP_WEIGHTS.opennessReversed * (100 - pct('O'));

  const axes: TypologyAxis[] = [
    buildAxis('EI', 'E', 'I', 'Extraversion', pct('E')),
    buildAxis('NS', 'N', 'S', 'Openness', pct('O')),
    buildAxis('TF', 'F', 'T', 'Agreeableness', pct('A')),
    buildAxis('JP', 'J', 'P', 'jScore', jScore),
    buildAxis('AT', 'T', 'A', 'Neuroticism', pct('N'))
  ];

  const [ei, ns, tf, jp, at] = axes;

  // Role: N-types split by the T/F letter, S-types by the J/P letter.
  const role: RoleKey =
    ns.letter === 'N'
      ? tf.letter === 'T'
        ? 'analyst'
        : 'diplomat'
      : jp.letter === 'J'
        ? 'sentinel'
        : 'explorer';
  // Strategy: Mind (E/I) × Identity (A/T).
  const strategy: StrategyKey =
    ei.letter === 'I'
      ? at.letter === 'A'
        ? 'confidentIndividualism'
        : 'constantImprovement'
      : at.letter === 'A'
        ? 'peopleMastery'
        : 'socialEngagement';

  return {
    type: `${ei.letter}${ns.letter}${tf.letter}${jp.letter}-${at.letter}`,
    role,
    strategy,
    axes,
    borderline: axes.some((a) => a.borderline),
    meta: {
      midpoint: TYPOLOGY_MIDPOINT,
      borderlineRadius: TYPOLOGY_BORDERLINE_RADIUS,
      jScore,
      jpWeights: JP_WEIGHTS
    }
  };
}
