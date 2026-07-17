# Architecture — Project Speculum

Norm-based Big Five (IPIP-NEO-120) built on a fork of
[`rubynor/bigfive-web`](https://github.com/rubynor/bigfive-web) (MIT, the code
behind [bigfive-test.com](https://bigfive-test.com)).

Speculum replaces the upstream naive scorer with a **norm-based percentile
engine**, adds a **16Personalities-style typology** and **heuristic composites**,
keeps result IDs **upstream-compatible**, recovers **unknown results** from
bigfive-test.com, and rebuilds the web app on **SolidStart + Postgres**.

> **Status:** Phase 0 (this document). The app still runs upstream's stack
> (Next.js 14 / React 18 / next-intl / NextUI / MongoDB) at this commit; the
> phases below replace it. The scoring core (Phases 1–3) is framework-agnostic
> and is built and fully tested *before* the SolidStart rewrite.

---

## 1. Module map — what stays, what gets replaced

| Area | Upstream (this repo today) | Speculum target | Disposition |
|---|---|---|---|
| Items | `packages/questions` (IPIP-NEO-120 + 20 translations) | unchanged | **KEEP** — never touch item text. Used as the scoring-key oracle. |
| Scoring | `packages/score` — naive averaging, raw thresholds 2.5/3.5 → low/neutral/high (~60 lines) | norm-based engine (T-score → exact-CDF percentile → band) | **REPLACE internals**, keep package name + default `calculateScore` export so `results` keeps working. |
| Result text | `packages/results` — per domain/facet text from a `{score,count,result}` shape | unchanged, fed via a compatibility **adapter** | **KEEP** — `toLegacyScores()` collapses 5 bands → `low\|neutral\|high`. |
| Typology | — (none upstream) | `packages/typology` — axes + composites, pure | **NEW.** |
| Persistence | `web/src/db` MongoDB + `mongodb` driver | Postgres via Drizzle ORM (`results`, `feedback`) | **REPLACE.** IDs stay ObjectId-shaped (minted in-app, no `mongodb` dep). |
| Server logic | `web/src/actions/index.ts` (`getTestResult`/`saveTest`/`saveFeedback`) | SolidStart `"use server"` actions + `getSeries` + og-fallback | **REPLACE.** |
| Web app | Next.js 14 App Router, next-intl, NextUI, Contentlayer, ApexCharts | SolidStart, Kobalte, `@solid-primitives/i18n`, solid-apexcharts | **REBUILD** (functional core first; articles/blog deferred). |
| Dead legacy | `old-packages/` (pre-v2 duplicate of `packages/`) | — | **REMOVED** in Phase 0. |

### Data flow (target)

```
answers[]  ──scoreAssessment()──▶  AssessmentResult {domains,facets: raw,t,percentile,band + meta}
(sole                                    │
 persisted            ┌──────────────────┼───────────────────┐
 truth)               ▼                  ▼                   ▼
              computeTypology()   computeComposites()   toLegacyScores()
                      │                  │                   │
                 Typology          CompositeTrait[]    legacy scores ──generateResult()──▶ Domain[] text
```

Everything below `answers[]` is **derived at read time** — cacheable, always
recomputable, never persisted as the primary record.

---

## 2. Scoring pipeline (replaces `packages/score` internals)

1. **Raw sums.** Per domain (24 items) and per facet (4 items). Reverse-keying is
   already baked into `packages/questions` choices (`plus`/`minus` choice arrays),
   so scoring just sums the selected `choice.score`. A build-time key-validation
   asserts the item set matches the norm index map (120 items, 24/domain, 4 per
   (domain,facet), `num` spacing of 30, unique ids).
2. **T-score.** `T = 10·(raw − mean)/SD + 50`, per domain and facet, against the
   selected stratum. Missing demographics → combined + 21–40 reference stratum.
3. **Percentile.** `percentile = 100·Φ((T−50)/10)` with an **exact erf-based
   normal CDF** (inline, no deps). This **replaces** upstream's cubic
   approximation (`Norm.percent` in the source), which is non-monotonic near
   T≈70–73 and exceeds 99 — a deliberate bug fix. Percentiles are kept on the
   open interval `(0,100)` internally so they stay **strictly monotonic** in raw
   score (a property test guards this).
4. **Band.** From percentiles: very low `<10`, low `10–30`, average `30–70`,
   high `70–90`, very high `>90`.
5. **Adapter.** `toLegacyScores()` collapses bands → `low|neutral|high` for
   `packages/results`, preserving `{score:raw, count, result}` per domain+facet.

Output per domain: `{ raw, t, percentile, band, facets: { [1..6]: { raw, t,
percentile, band } } }` + norm metadata (norm-set id, stratum label,
`fallbackApplied`).

---

## 3. Norm data — provenance (READ THIS BEFORE CITING)

The 120-item norms are **transcoded from
[`NeuroQuestAi/five-factor-e`](https://github.com/NeuroQuestAi/five-factor-e)**
(MIT; `ipipneo/norm.py`), which credits **John A. Johnson & Dhiru Kholia**.

- **8 stored strata:** sex M/F × age brackets `<21`, `21–40`, `41–60`, `>60`
  (strict, contiguous boundaries — ages 21/41/61 fall into the upper bracket).
- **Layout:** each stratum is a 71-float array — `[0]` pad, `[1..5]` domain
  means (N,E,O,A,C), `[6..10]` domain SDs, then five 12-wide facet blocks
  (6 means + 6 SDs) in N,E,O,A,C. Domain raw scale 24–120; facet 4–20.
- **Combined/neutral stratum (documented deviation).** Means = element-wise
  average of M/F. **SD = pooled** `sqrt(0.5·(sd_m² + sd_f²) + 0.25·(mean_m −
  mean_f)²)`, an intentional improvement over five-factor-e's averaged SD (which
  understates dispersion when the sexes differ). Flagged in norm metadata.

> ⚠️ **Provenance caveat (must stay honest).** These mean/SD constants trace to
> Johnson's **online IPIP-NEO report** (via Kholia's port), **not** a
> peer-reviewed normative table. Johnson (2014, *JRP* 51, 78–89) covers
> reliability/validity/structure only — **do not cite it for these numbers.**
> Cite as *"Johnson online report norms, via five-factor-e."* The per-stratum
> sample size (N) is undocumented. `TODO`: check
> [osf.io/jxpu4](https://osf.io/jxpu4) (Johnson's OSF scoring tools) as a
> possible provenance upgrade. **Never invent numeric constants** — if any datum
> is uncertain, STOP and say so.

Norm sets are swappable data modules behind one interface with metadata
`{ id, label, source, provenanceNote, strata[] }`. Ship `johnson-webreport`;
adding another source must not touch scoring logic.

**Fidelity is enforced programmatically**, not by human eyeballing: a test
re-parses `norm.py` == the gold `johnson-webreport.norms.json` == the generated
TS for the 8 base strata (exact), and checks the combined strata against the
averaged-means + pooled-SD formulas. Source materials live in
`packages/score/norms-source/` (`five-factor-e-norm.py`, the gold JSON,
`NOTICE.md`).

---

## 4. Typology & composites (`packages/typology`, pure)

- **16P-Axi axes** from domain percentiles (midpoint 50): E/I←Extraversion,
  N/S←Openness, T/F←Agreeableness (≥50→F), A/T←Neuroticism (≥50→T). **J/P** is a
  documented weighted composite of C-orderliness + C-cautiousness (toward J) and
  Openness (toward P).
- Output: type string (e.g. `INTP-T`) + per-axis continuous strength (distance
  from midpoint) + `borderline: true` within **±5** percentile points of the
  midpoint. The UI must present borderline axes as a **coin flip**, not a crisp
  letter.
- **Composites** are labeled **heuristics** (every formula documented):
  Perfectionism, Ambition, Motivation, Desire-to-Lead. Presentation carries a
  heuristic disclaimer.

---

## 5. Identity & upstream compatibility

- **Result IDs stay Mongo-ObjectId-shaped** (24 hex), minted in-app
  (`web/src/lib/object-id.ts`: 4B time + 5B process-random + 3B counter) with
  **no `mongodb`/`bson` dependency**. This keeps our ID space identical to
  bigfive-test.com so shared links resolve. *(Principle 5 — the ID format must
  stay the same.)*
- **og-fallback.** On a read miss where the id is ObjectId-shaped, the server
  fetches `bigfive-test.com/result/{id}` and reconstructs raw facet scores from
  the page's RSC payload (matched **by facet title** — titles are globally
  unique), synthesizing 4 items/facet that sum to each raw. The result is cached
  under the same id and scored normally. Upstream exposes no public API;
  HTML-scrape is the only route, so the parser is pinned behind a test fixture.
- **Privacy by default.** No accounts. The og-fallback (server-side, to
  bigfive-test.com) is the only third-party call. FB/X share buttons are removed;
  copy-link + print/PDF stay.

---

## 6. Persistence

Drizzle ORM over Postgres (`node-postgres` Pool, lazy singleton `getDb()` so
builds work without a live DB).

```
results(
  id           text PRIMARY KEY,        -- app-minted ObjectId, no DB default
  lang         text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  answers      jsonb NOT NULL,          -- Answer[] — the sole source of truth
  demographics jsonb,                   -- { sex?, ageBracket? }, nullable
  series_token text                     -- client-held token, nullable, indexed
)
feedback(id text PK, name, email, message, created_at)
```

- **Series token** links sessions into a longitudinal series **without an
  account** (a client-held random token). `getSeries(token)` re-scores every
  session with its own stored demographics, oldest first → chart input.
- **Demographics** are collected on a **pre-test screen** (sex + age, before the
  first item). A **Skip** option exists and warns that results may be slightly
  less accurate; skipping → the combined-sexes stratum derived on the fly
  (avg means + pooled SD). Absent age → the 21–40 fallback stratum
  (`meta.fallbackApplied = true`).

### Adaptive local norms (planned, Phase 5b)

The norm tables adjust with the data we collect: a `local` norm source
(same swappable `NormSet` interface — scoring logic untouched) aggregates
mean/SD of domain+facet raw sums per (sex × ageBracket) from stored
`results.answers`. A stratum is usable only above a minimum sample size
(≥200; below that, per-stratum fallback to Johnson). A `norms:refresh` job
writes a snapshot table — scoring reads the snapshot, never aggregates
per-request. Provenance label: *"local sample norms (self-selected web
sample, N=…)"* — honest that this is a convenience sample. Raw answers stay
the sole source of truth; local norms are derived and recomputable.

---

## 7. Next.js → SolidStart migration surface

The web app is a full rewrite (SolidJS has no NextUI/next-intl/Contentlayer
equivalents). Recreated, ordered by dependency; **highest-risk marked ⚠**:

- **Foundation:** SolidStart (vinxi) scaffold, Tailwind + `tailwind-variants`
  (`primitives.ts` moves ~as-is), global CSS, fonts (`@fontsource`), theme
  signal (replaces `next-themes`).
- **Data layer:** Postgres/Drizzle `getDb()` + `"use server"` actions (Mongo code
  is framework-agnostic and moves with minimal change); env `DB_URL`/
  `NEXT_PUBLIC_*` → `DATABASE_URL` + SolidStart conventions.
- ⚠ **i18n:** 20 locale message bundles + namespaces → `@solid-primitives/i18n`
  + `intl-messageformat`; `as-needed` locale-prefix routing + redirect; ICU /
  `t.rich` component interpolation; RTL (`rtl-detect`).
- ⚠ **UI kit:** every `@nextui-org/*` + `@react-aria/*` component (navbar,
  footer, radio, progress, select, table, modal, card, chip, snippet, switch,
  accordion) rebuilt on **Kobalte** + Tailwind.
- ⚠ **Test flow:** `survey.tsx` state machine → Solid signals (auto-advance
  timing, elapsed timer, `localStorage` restore banner, confetti,
  submit→redirect).
- ⚠ **Charts:** `bar-chart` via `solid-apexcharts` + `clientOnly`,
  theme-reactive.
- **Pages:** result (+ percentile numbers, norm note, DomainTabs/ReadMore/
  ShareBar) · get-result · compare (base64url) · home (SonarPulse) · about ·
  feedback · faq · privacy.
- **Deferred:** Contentlayer articles/blog, Vercel-KV view counter.

---

## 8. Tooling & local dev

- **mise** (`mise.toml`) provides `bun` + `node` and task shortcuts. Tools are
  not on the default PATH — `export PATH="$HOME/.local/bin:$PATH"`.
- **Postgres** runs via `docker-compose.yml` (Postgres 16, `speculum-db`).
  `DATABASE_URL=postgres://bigfive:bigfive@127.0.0.1:5432/bigfive`.
- **Tasks:** `mise run score:test` (pure engine, no DB) · `mise run db:start` /
  `db:migrate` · `mise run dev` / `build` / `test` / `setup`.

Verify sequence (once each phase lands): `mise run db:start && mise run
db:migrate && mise run test`, and `mise run build` for the real typecheck.

---

## 9. Phase roadmap

| Phase | Deliverable | Gate |
|---|---|---|
| **0** | Relocate, infra (this doc, docker-compose, mise) | **STOP — review this doc** |
| **1** | `packages/score` norm engine + fidelity/property tests | **STOP — review encoded norms** |
| **2** | `packages/typology` axes + composites | — |
| **3** | Drizzle persistence + object-id + og-fallback + actions | — |
| **4** | SolidStart rebuild (functional core) | — |
| **5** | Typology UI + demographics intake + `/series/[token]` | — |
| **6** | LLM interpretation (flagged OFF) + CI | — |

Each phase uses conventional commits and leaves the tree green.
