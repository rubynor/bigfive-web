# Project Speculum — Claude session bootstrap

Norm-based Big Five (IPIP-NEO-120) on a fork of `rubynor/bigfive-web`.
**Read `HANDOFF.md` first** — it says exactly where the project stands and what
to do next. `ARCHITECTURE.md` is the living technical map.

## Hard rules (non-negotiable)

- Raw `answers[]` are the sole persisted truth; all scores/percentiles/typology
  are derived at read time. Never persist derived scores as the primary record.
- Scoring/typology/norm code is pure (no I/O), TypeScript strict, fully tested.
- Norm sets are swappable data modules behind one interface; scoring logic
  never changes when a norm source is added.
- **Result IDs are Mongo-ObjectId-shaped (24 hex)** — minted in-app, no mongodb
  dep. Never change the ID format (upstream bigfive-test.com compatibility).
- Never touch item text in `packages/questions`.
- **Provenance honesty:** cite norms as "Johnson online report norms, via
  five-factor-e" — NOT Johnson 2014 (JRP). Never invent numeric constants; if a
  datum can't be obtained with confidence, STOP and say so.
- Conventional commits; every phase leaves the tree green.

## Toolchain (nothing is on the default PATH)

```sh
export PATH="$HOME/.local/bin:$PATH"   # mise lives here
mise run score:test                    # pure engine tests (no DB needed)
mise run db:start && mise run db:migrate && mise run test
mise run build                         # the real typecheck
```

bun + node come from `mise.toml`. Postgres runs via `docker-compose.yml`
(Docker Desktop must be running: `open -a Docker`, then poll `docker info`).

## Reference material (READ-ONLY, do not build on it)

The abandoned prior attempt lives at `/Users/freddy/.dev/Rust/bigfive-web`
(branch `feat/speculum`). Its patterns (actions, og-fallback, object-id,
Drizzle schema) are good reference; its auxesis/Supabase/nanoid baggage is not.
