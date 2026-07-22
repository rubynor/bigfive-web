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
| 3 — persistence (Drizzle/Postgres) | ✅ done | `2a6d727` |
| 4 — SolidStart rebuild | ⬅ **NEXT** | — |
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

### What Phase 3 delivered (`packages/data`, 28 unit + 8 integration tests green)

- Framework-agnostic data layer (NOT inside `web/` — the Next app is doomed;
  Phase 4 wraps these actions as SolidStart `"use server"` functions).
- Drizzle schema `results` + `feedback`, two additive migrations
  (`drizzle/0000_*`, `0001_*`), lazy `getDb()` over node-postgres.
  `mise run db:generate|db:migrate` now point at `packages/data`.
- `object-id.ts` (mint + isObjectId, no mongodb dep), `og-fallback.ts`
  (RSC-payload parse by facet title, regex pinned behind a fixture test;
  verified live against upstream example `58a70606a835c400c8b38e84`),
  `actions.ts` getTestResult/saveTest/getSeries/saveFeedback — score at read
  time via scoreAssessment→computeTypology→computeComposites→toLegacyScores→
  generateResult. `SaveTestInput` drops the fork's dead fields
  (testId/invalid/timeElapsed/dateStamp) — re-add nothing.
- Round-trip determinism gate passed vs Docker Postgres
  (`mise run db:start && mise run db:migrate && mise run data:test:integration`).
- Cross-package imports remain relative (`../../score/src/*` etc.); proper
  workspace resolution is Phase 4 work.

## Current: Phase 4 — SolidStart rebuild (largest phase; see plan)

Rebuild `web/` on SolidStart: foundation (Tailwind/theme/fonts) → wire
`packages/data` actions as `"use server"` → i18n (20 locales,
`@solid-primitives/i18n`) → UI kit on Kobalte → survey state machine → charts
(solid-apexcharts) → result/compare/home/static pages. Defer articles/blog +
view counter. The plan's Phase 4 section has the ordered dependency list and
risk notes; `ARCHITECTURE.md` §7 maps the migration surface.

Progress within Phase 4:

- [x] **Step 1 — foundation** (`432015f`): Next app deleted from `web/`
  (React sources remain in git history and in the read-only fork);
  `@solidjs/start` 1.3 scaffold with vinxi, Tailwind 3 kept. NextUI theme
  plugin replaced by semantic tokens in `tailwind.config.cjs` + CSS vars in
  `src/app.css` (background/foreground/content1-4/divider vary with `.dark`;
  primary=blue, secondary=violet, default=zinc scales). Fonts via
  `@fontsource-variable` (Inter/Fira Code). Theme = signal in
  `src/lib/theme.ts` + no-FOUC script in `entry-server.tsx`.
  `primitives.ts` and de-Next-ed `config/site.ts` ported. Kept for later
  steps: `public/`, `src/messages/` (20 locales), `posts/` (deferred
  articles). `bun run build` = `tsc --noEmit && vinxi build` (typecheck
  preserved). Verified: build green, dev SSR serves home + 404, all
  package tests green (108/21/9). `@parcel/watcher` postinstall
  intentionally left blocked (prebuilt binaries suffice).
- [x] **Step 2 — workspace resolution + server actions**: root bun workspace
  (`package.json` workspaces `["web", "packages/*"]`; per-package bun.locks
  removed, one root lock; `mise run setup` installs at root). Each package
  exposes TS source via `exports` (`"." → ./src/index.ts`; data also
  `./compare-people`, `./result-id` for client-safe imports — the barrel
  pulls pg/drizzle, never import it from client code). web depends on all
  five via `workspace:*`. `web/src/lib/actions.ts` wraps the four data
  actions as `query`/`action` server functions (dynamic import behind
  `"use server"` keeps pg/drizzle out of the client bundle). Scaffold route
  `GET /api/health[?id=]` proves the wiring — **delete it in step 7**.
  `fix(results)`: `getTemplate` now uses a static loader map (fully dynamic
  `import(`./data/${language}`)` is unbundleable by vite). Verified: all
  unit + integration suites green, `mise run build` green, dev server
  served `/api/health?id=` with a fully scored report vs Docker Postgres.
- [ ] Step 3 — i18n (20 locales, `@solid-primitives/i18n`, locale routing, RTL)
- [ ] Step 4 — UI kit on Kobalte (navbar/footer/modals/selects/radio/…)
- [ ] Step 5 — survey state machine
- [ ] Step 6 — charts (solid-apexcharts, clientOnly)
- [ ] Step 7 — result/get-result/compare/home/static pages

### Fork UX pass ported (2026-07-22)

The reference fork (`../bigfive-web`, branch `feat/speculum`) got a 7-commit
UX-polish pass after our Phase 3 handoff (`e1c2ea6`..`4a0e042`, + README). The
portable logic is now in `packages/data` (28 unit tests green, +19):

- `src/result-id.ts` — `formatId` / `validId` / `formatAndValidateId`;
  validId accepts all three historical id schemes (ObjectId 24-hex, UUID,
  nanoid-21) so og links and legacy ids resolve. Isomorphic (no node builtins).
- `src/compare-people.ts` — `encodeComparePeople` / `decodeComparePeople`:
  og-style `Name-id_Name-id` links (bigfive-test.com compatible) with legacy
  base64url(JSON) fallback, defensive (null, never throws), percent-encoded
  names handled; plus `moveItem` (re-insert, not swap) for compare reorder.

The remaining fork commits are Next.js UI — throwaway code, but they encode
**design specs** for the SolidJS rebuild (reference impls readable in the fork):

- **Step 5 (survey):** `359c9b5` — optional sex+age card on the first test
  page, persisted with the result, survives localStorage restore. (Realizes
  decision #5; remember the Skip + accuracy-warning requirement is ours.)
- **Step 6 (charts):** `cde47b8` — pin the classic ApexCharts 3 default
  palette; apexcharts 5 retuned palette1 away from the OG look.
- **Step 7 (result page):** `544030f` — domains in OCEAN order (template
  ships N,E,O,A,C); typology section = centered type string + five axis bars
  behind a "Breakdown" toggle, borderline chip + honesty note when any axis is
  within ±5 of midpoint; norm stratum stated under the chart with a hint to
  provide sex & age when the combined reference was used.
- **Step 7 (compare):** `e1c2ea6` + `4a0e042` — share bar with "Edit
  Comparison" that re-seeds the builder via `?people=`; builder mirrors its
  list into `?people=` via replaceState (survives reloads); locale switchers
  must re-append the query string; drag-to-reorder rows (translate-only
  animation, keyboard arrow fallback on a grip handle).
- **Site config:** supportEmail sentinel `REPLACE_ME@example.com`, overridable
  via env (fork: `NEXT_PUBLIC_SUPPORT_EMAIL`).

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
- Root bun workspace exists since Phase 4 step 2 (one root lockfile,
  `mise run setup` at root). `packages/score` tests still import questions
  data via relative path `../../questions/src/data/en/questions` — fine,
  cross-package relative imports remain the norm inside packages/*.
- `packages/questions` `getItems` loads via `path.join(__dirname, …)` +
  dynamic import — CJS-only, **breaks under vite/vinxi**. Must be rewritten
  (static per-language loaders, like the `getTemplate` fix in results)
  before the Step 5 survey imports it. Item TEXT is untouchable.
- `packages/results` has a latent facet bug upstream (`generateResult` reads
  `facet[key]` instead of `scores[key].facet[facet]` → facet texts silently
  dropped). Fix it when web starts rendering facet text (the fork fixed the
  vendored copy the same way).
- Old jest tests in `packages/questions`/`packages/results` still exist and
  are untouched; only `packages/score` moved to vitest.
- The old fork's `bigfive-db` Docker container can squat on port 5432 and
  block `db:start` (`docker stop bigfive-db`; currently stopped). Never drop
  tables manually without also clearing `drizzle.__drizzle_migrations` —
  drizzle-kit then considers migrations applied and no-ops.
