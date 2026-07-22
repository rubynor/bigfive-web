// Phase 4 step 2 scaffold: proves the web -> packages/data wiring end to end
// (workspace resolution, DATABASE_URL, drizzle, vinxi SSR bundling of the
// score/results pipeline). Replaced by the real result/compare pages in
// step 7 — delete this route then.
//
//   GET /api/health          → { ok: true } when Postgres answers `select 1`
//   GET /api/health?id=<id>  → full scored Report for a stored result id
//                               (exercises getTestResult incl. template load)

import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';

export async function GET({ request }: APIEvent) {
  const id = new URL(request.url).searchParams.get('id');
  try {
    const { getDb, getTestResult } = await import('@bigfive-org/data');
    await getDb().$client.query('select 1');
    if (id) {
      return json({ ok: true, report: await getTestResult(id) });
    }
    return json({ ok: true });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : 'unknown' },
      { status: 503 }
    );
  }
}
