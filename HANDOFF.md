# HANDOFF — Project Speculum (updated 2026-07-17)

State + next steps for a fresh session. Companion docs: `CLAUDE.md` (rules),
`ARCHITECTURE.md` (technical map), and the master plan at
`/Users/freddy/.claude/plans/project-speculum-mighty-goblet.md`.

## Where things stand

Repo: `/Users/freddy/.dev/Rust/speculum`, branch **`speculum`** off upstream
`rubynor/bigfive-web` master ("v2 genesis commit"). Remote still points at
rubynor (no fork pushed yet).

| Phase | Status | Commit |
|---|---|---|
| 0 — relocate, infra, ARCHITECTURE.md | ✅ done, gate passed | `c7ecdda` |
| 1 — norm-based score engine | ✅ done, gate passed | `169d4ad` |
| 2 — typology + composites | ✅ done | `0ad03af` |
| 3 — persistence (Drizzle/Postgres) | ⬅ **NEXT** | — |
| 4 — SolidStart rebuild | pending | — |
| 5 — Speculum UI (typology view, demographics, series) | pending | — |
| 5b — adaptive local norms | pending (new requirement, see below) | — |
| 6 — LLM interpretation (OFF) + CI | pending | — |

### What Phase 1 delivered (`packages/score`, 108 vitest tests green)

- `scoreAssessment`: raw sums → T = 10·(raw−mean)/SD + 50 → percentile =
  100·Φ((T−50)/10) via inline erf (replaces five-factor-e's buggy cubic; strict
  monotonicity is property-tested) → bands (<10 very low, 10–30 low, 30–70
  average, 70–90 high, ≥90 very high).
- Norm data: 8 Johnson strata (sex × age lt21/a21_40/a41_60/gt60) generated
  from `norms-source/five-factor-e-norm.py` by `scripts/generate-norms.ts`
  (`bun run generate-norms`). Do NOT hand-edit
  `src/norms/sources/johnson-webreport.ts`.
- **Combined (sex unknown) strata are DERIVED AT RUNTIME** (`combineStrata`):
  mean = avg(M,F), SD = pooled `sqrt(0.5(sd_m²+sd_f²)+0.25(Δmean)²)` — a
  documented deviation from five-factor-e (which averages SDs). User approved.
- Fallbacks: missing age → `a21_40` reference (`meta.fallbackApplied`); missing
  sex → combined derived (`meta.combinedDerived`).
- Fidelity harness `test/norms.test.ts`: parseNormPy(norm.py) == gold JSON ==
  generated TS for the 8 base strata; combined means match gold within
  banker's-rounding ±0.005; pooled ≥ averaged SD.
- `toLegacyScores` adapter feeds `@bigfive-org/results` unchanged; default
  export `calculateScore` keeps the upstream call shape.
- Key validation (`key-validation.ts`) pins the questions item set to the norm
  index map.

## User decisions locked in (do not re-litigate)

1. Web app: **migrate to SolidJS/SolidStart** (full rewrite, not a Next upgrade).
2. IDs: **Mongo-ObjectId-shaped**, minted in-app (no mongodb dep).
3. Norm engine: re-derived from five-factor-e source (done, Phase 1).
4. Combined-stratum policy: derive at runtime, pooled SD (done, Phase 1).
5. **Demographics are asked BEFORE the test** (2026-07-17): a pre-test screen
   collects sex + age. A **Skip** option must exist and show a warning that the
   result may be a bit less accurate; skipping → combined-sexes norms computed
   on the fly. (Belongs to Phase 5 UI; the scoring side already supports it.)
6. **Adaptive local norms** (2026-07-17): the norm tables must be able to adjust
   with data we collect — see Phase 5b below.

### What Phase 2 delivered (`packages/typology`, 21 vitest tests green)

- `computeTypology(assessment)`: axes E/I←Extraversion, N/S←Openness,
  T/F←Agreeableness (≥50→F), A/T←Neuroticism (≥50→T), J/P←jScore =
  `0.40·C2 + 0.40·C6 + 0.20·(100−Openness pct)` (weights in output meta).
  Type string `${EI}${NS}${TF}${JP}-${AT}`; per-axis {letter, basisPercentile,
  strengthTowardLetter, distanceFromMidpoint, borderline on [45,55]} plus
  aggregate `borderline` (OR across axes).
- `computeComposites(assessment)`: Perfectionism `0.35·C4+0.35·C2+0.30·N4`,
  Ambition `0.40·C4+0.30·E3+0.30·C1`, Motivation `0.40·C5+0.30·C4+0.30·C1`,
  Desire to Lead `0.45·E3+0.25·C4+0.15·E4+0.15·E2`; each `heuristic: true`
  with formula string + weighted components; weights sum to 1 (tested).
- Imports score types via relative `../../score/src/*` (like score→questions);
  `tsc` build therefore nests `build/score/` + `build/typology/` — fine until
  workspace resolution lands in Phase 3/4. `mise run typology:test` runs it.

## Next: Phase 3 — persistence (see plan for detail)

Drizzle/Postgres: `results(id text PK ObjectId, lang, created_at, answers
jsonb, demographics jsonb NULL, series_token text NULL indexed)` + `feedback`;
`object-id.ts` minting; og-fallback (scrape bigfive-test.com RSC payload by
facet title, synthesize 4 items/facet, cache under same id — reference:
fork's `web/src/lib/og-fallback.ts`, pin the regex behind a fixture);
actions getTestResult/saveTest/getSeries/saveFeedback; round-trip determinism
test against Docker Postgres.

## Phase 5b — adaptive local norms (new requirement, design sketch)

- New norm source `local` implementing the existing `NormSet` interface (the
  registry in `packages/score/src/norms/index.ts` was built for this; scoring
  logic must not change).
- Aggregate mean/SD of domain+facet raw sums per (sex × ageBracket) from stored
  `results.answers`. Raw answers remain the sole source of truth; local norms
  are a derived, recomputable snapshot.
- **Min-N gate:** stratum usable only with ≥200 samples; below that fall back
  per-stratum to Johnson. Report meta must state norm set + stratum + N.
- `norms:refresh` job (mise task, later cron) writes a snapshot table; scoring
  reads the snapshot, never aggregates per-request.
- Provenance label: "local sample norms (self-selected web sample, N=…)".

## Gotchas

- Toolchain: `export PATH="$HOME/.local/bin:$PATH"`; run things via
  `mise exec -- bun …` or `mise run <task>`. See CLAUDE.md.
- `packages/score` tests import questions data via relative path
  `../../questions/src/data/en/questions` (no workspace setup yet — there is no
  root package.json; web pins published npm versions of the packages. Phase 3/4
  should wire local workspace resolution so web consumes OUR score package).
- `packages/results` has a latent facet bug upstream (`generateResult` reads
  `facet[key]` instead of `scores[key].facet[facet]` → facet texts silently
  dropped). Fix it when web starts rendering facet text (the fork fixed the
  vendored copy the same way).
- Old jest tests in `packages/questions`/`packages/results` still exist and
  are untouched; only `packages/score` moved to vitest.
