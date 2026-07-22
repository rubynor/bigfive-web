# HANDOFF — Project Speculum (updated 2026-07-23)

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
| 4 — SolidStart rebuild | ✅ done (steps 1–7 of 7) | `432015f`… |
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
- [x] **Step 3 — i18n** (`8478172`): `I18nProvider` on
  `@solid-primitives/i18n` (flatten + custom `{param}` resolver for the kept
  next-intl bundles; English fallback for partial translations). Locale =
  first path segment, as-needed prefix (en unprefixed); `localeRoute()`
  guard wraps root pages for their `/[locale]/` alias: `/en/*` → canonical
  unprefixed redirect (query preserved), unknown locale → /404.
  `<html lang/dir>` client-side (rtl-detect; only 'ar' is RTL). Message
  bundles renamed .js→.ts (ar.ts had a duplicate `language` key — kept the
  later object, matching JS runtime semantics). Verified: /de + /ar SSR
  translated, /en?x=1 → /?x=1, /xx → /404.
- [x] **Step 4 — UI kit + chrome** (`eaa75c5`): Navbar (hand-rolled
  Tailwind, sticky, mobile menu), Footer, ThemeSwitch (icon client-only to
  avoid hydration mismatch), LocaleSwitcher (Kobalte Select, compact/full,
  flag avatars, `useLocaleHref` keeps path+query+hash on switch). Kit in
  `components/ui/`: Button/Card/Chip/Alert (tv), RadioCards + LikertScale
  (Kobalte RadioGroup), ProgressBar, Modal, FaqAccordion, Snippet.
  `icons.tsx` ported wholesale from fork via sed (30 icons). Chrome wired
  into app root. Nav labels via `toolbar.*` keys.
- [x] **Step 5 — survey state machine** (`e4528e4`, `6c0af84`): `getItems`
  rewritten to static per-language loader maps (same pattern as the
  getTemplate fix; also re-exports `Language`/`LanguageCode`; jest suite
  still green). `/test` route (+ `/[locale]/test` alias) loads the
  inventory via `getItemsQuery` server fn (`lib/items.ts`); UI locale →
  inventory mapping pt→pt-br, zh→zh-cn (upstream fell back to English),
  `?lang=<code>` override via a plain-select switcher of all 31
  inventories. `components/survey.tsx` ports the fork survey to Solid
  signals: demographics card on page 1 as RadioCards (sex/age each with
  an explicit "Prefer not to say" + a card-level Skip button — either
  shows the accuracy-warning Alert, realizing decision #5), LikertScale
  with pole anchors, 3-per-page on desktop / 1 + 700 ms auto-advance on
  mobile, elapsed timer, localStorage restore (inProgress + b5data,
  demographics included, malformed JSON guarded), dev-only skip-to-end
  (`import.meta.env.DEV`). Submit posts the lean `SaveTestInput`
  (lang/answers/demographics? — no dead fork fields) via saveTestAction
  and navigates locale-aware to `/result/[id]` (page lands in step 7).
  i18n: new `test.*` keys in en.ts; i18n loader typing switched to
  DeepPartial so partial locales typecheck. Verified: all suites green
  (108/21/28 + 8 integration vs Docker Postgres), build green, dev SSR
  served /test, /de/test (German items) and /test?lang=de.
- [x] **Step 6 — charts** (`9359a7d`): `components/charts/ — `BarChart`
  (single result, distributed bars, domain palette
  `#9353d3/#006FEE/#f31260/#f5a524/#17c964/#E2711D`, no legend/toolbar) and
  `BarChartCompare` (one series per person, ApexCharts-3 palette pinned per
  fork `cde47b8`, legend + download-only toolbar) on `solid-apexcharts` 0.6 +
  `apexcharts` 6.5. Both wrapped in `clientOnly` from `./index.tsx` (import
  charts only from there). Shared theme-aware options in
  `charts/options.ts` read the `theme()` signal (fork lesson: resolvedTheme,
  not raw). Verified headless (puppeteer-core + Brave, script was in
  /tmp/chart-test): 3 canvases render, dark-mode label color `#e4e4e7`
  applied, both palettes present. No page consumes the charts yet — that is
  step 7. (Headless `--dump-dom` does NOT run the chart's async init —
  verify with puppeteer, not curl/dump-dom.)
- [x] **Step 7 — result/get-result/compare/home/static pages** (specs below;
  `/api/health` deleted, packages/results facet bug fixed + pinned by test).
  Landed together with the review-fix round below.

### Step-7 review-fix round (2026-07-23, committed with step 7)

Full review of the step-7 diff + three live-reported bugs; all fixed and
verified (unit suites 108/21/28 + 8 integration + results 8 green, `mise run
build` green, puppeteer smoke against dev server + Docker Postgres):

- **Route shadowing (the "incompatible compare link" report):** `/compare/<id>`
  and `/result/<id>` rendered the builder/get-result pages — SolidStart nests
  `compare/[id].tsx` under a same-named `compare.tsx` with no outlet. Moved to
  `compare/index.tsx` / `result/index.tsx` (+ `[locale]` twins). Rule recorded
  in ARCHITECTURE §7. Verified: the exact reported
  `/de/compare/Andreas-…_Bella-…_Cathrin-…` link loads all three upstream ids
  via og-fallback, in German.
- **Radio rows dead-zone click fix:** Kobalte selects only via ItemControl /
  ItemLabel, so card padding never registered. `RadioCards` now forwards any
  row click to the hidden input; the survey Likert scale switched from
  unlabeled circles to the upstream-style vertical labeled rows (same
  component) per user preference. Verified by synthetic padding clicks.
- **Test-language select showed the wrong language:** SSR `<select value>`
  is ignored by browsers; added `selected` on the matching `<option>` so
  /de/test shows "German", not "English". **Then removed entirely** (user
  decision 2026-07-23): two language dropdowns on one page confused users —
  the inventory now always follows the UI locale, `?lang=` on /test is gone,
  and the `test.language` message key was dropped from en.ts.
- `packages/results` facet fix pinned by a regression test + full 5-domain ×
  6-facet fixture (`scores-full.json`) asserting facets.length === 6 with
  score/count/scoreText carried through.
- `/compare/[id]` now passes the viewer locale to `getTestResultQuery`
  (was: each person's taken-language; chart categories labelled every series
  in person #1's language).
 - Compare builder: delete by index (duplicate ids no longer both vanish),
   duplicate guard mirrored into the edit path.
 - Compare builder reorder: pointer-based row drag (whole row grabs except on
   buttons, pointer capture + translate-only shifts, touch works via
   `touch-none`) — the earlier native-HTML5-DnD grip never started a drag in
   Firefox (no `dataTransfer.setData`) and had no touch support. Zebra rows
   use `bg-content2` (theme-var); `default-100` is static zinc in this
   tailwind config, not theme-aware like NextUI's was in the fork.
- Share-bar copies `window.location.href` (keeps locale prefix + ?lang=).
- Result page splits NotFound ("check the id") from technical errors (new
  `results.loadError*` en keys; verified both branches live, incl. DB down).
- Date chip rendered with `timeZone: 'UTC'` (SSR/browser TZ mismatch).
- `domain-tabs` facet percentile lookup guarded with `<Show>` (skip, not
  crash, on divergence).
- `.DS_Store` added to .gitignore and strays deleted; `compass_artifact_…md`
  still pending user confirmation for deletion.

### Eval-display extension round (2026-07-23, uncommitted)

- **Survey submit was broken since step 5** (live-reported "Something went
  wrong saving your result"): `saveTestAction`/`saveFeedbackAction` were
  called as raw `action()` functions from event handlers, which throws
  client-side before any request (`Cannot read properties of undefined
  (reading 'r')` — no router context in a handler). Fixed by binding with
  `useAction(...)` at render time in `survey.tsx` + `feedback-form.tsx`; the
  step-5 gate had only verified SSR serving, never a live submit. The submit
  catch now also `console.error`s the cause (alert stays generic). Verified
  headless end-to-end: 120 answers → save → redirect → scored result page.

Verified: score 108 / typology 29 / data 28 + 8 integration green, `mise run
build` green, puppeteer smoke on /result/58a70606a835c400c8b38e84 (og-fallback).

- **Compare grip-drag fix:** the grip is a `<button>` (keyboard fallback), so
  the pointer-down guard `closest('button')` blocked drags from the one element
  styled as the drag handle. Grip now carries `data-grip`; guard excludes only
  `button:not([data-grip])`. Body-drag, grip-drag up/down all verified headless.
- **Norm-hint union (fork-parity fix):** hint now shows when
  `fallbackApplied || combinedDerived` (fork keyed on the former, we keyed on
  the latter — either means an inexact reference group). Key renamed
  `results.normCombinedHint` → `normApproxHint`, wording generalized.
  Also adopted the fork's `autofocus` on the compare Name input.
- **16P role + strategy** (`packages/typology`): letter-derived, no new
  constants. Role: N-types split by T/F (Analyst/Diplomat), S-types by J/P
  (Sentinel/Explorer); Strategy: Mind × Identity (Confident Individualism /
  People Mastery / Constant Improvement / Social Engagement). Shown as chips
  under the type string in `typology-view`.
- **Composites overhauled** per the user's research digest
  (`compass_artifact_…md`, repo root — KEEP, it is now cited by code):
  - Perfectionism **split** into `perfectionisticStrivings` (1.00·C, Smith et
    al. 2019 rc+ .44) and `perfectionisticConcerns` (.50·N + .26·(100−A) +
    .24·(100−E), the cited magnitudes sum to exactly 1) — the meta-analysis
    explicitly warns against a single composite. Old `perfectionism` key gone.
  - New `selfControl` (Tangney SCS correlations .54C/−.50N/.29A normalized by
    1.33) and `procrastination` (1.00·(100−C), Steel 2007 r≈−.62).
  - **Grit deliberately absent** (ρ=.84 with C — a jangle re-label, per doc).
  - Component model extended: domain-level terms (`facet` optional), `reversed`
    flag (uses 100−percentile), per-trait `provenance` citation string.
    Weight sets still sum to 1; scores stay convex in [0,100].
  - `ambition`/`motivation`/`desireToLead` unchanged, provenance marked
    "Editorial heuristic (Phase 2, user-approved)".
- **Result page renders composites** for the first time (`composites-view.tsx`:
  card grid, meter bar, band, `<details>` with formula + provenance, honesty
  disclaimer up top). Placed between typology and domain tabs. New en.ts
  namespaces `typology.roles/strategies` + `composites.*` (other locales fall
  back to English). Integration test now expects 7 composites.

### Open loose ends (not blocking)

- Untracked stray at repo root: `compass_artifact_…md` — user chose to KEEP
  it (2026-07-23); leave untracked. `.DS_Store` handled: gitignored + removed.
- SSR ships the active locale's full dictionary in the hydration payload
  (~10 KB); fine for now, revisit if pages get heavy.
- Accept-Language negotiation on first visit (upstream redirects / → /de
  for German browsers) not implemented; URLs work, detection TODO.

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
- `packages/questions` `getItems` uses static per-language loader maps
  (rewritten in step 5, vite-safe). Never reintroduce
  `path.join(__dirname, …)` or fully dynamic imports there; item TEXT is
  untouchable.
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
