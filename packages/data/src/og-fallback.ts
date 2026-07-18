import { getTemplate } from '../../results/src/index';
import type { Answer } from './types';

// --- Fallback: recover a result from the upstream site (bigfive-test.com) ------
//
// bigfive-test.com is Mongo-backed and has no public API, but its /result/{id}
// page ships the computed result inside the RSC flight payload. Every facet
// object there carries its raw score:
//   facet\":1,\"title\":\"Anxiety\",...,\"score\":17,\"count\":4
// The 30 IPIP-NEO facet titles are globally unique and come from the SAME
// @bigfive-org/results English data we use, so we map score→facet by title
// (structure-independent — the facets live in referenced RSC rows, so proximity
// parsing is unreliable, but titles are not).
//
// The upstream only persists summary scores, not the original item answers, so
// we synthesise 4 item scores per facet that sum to the facet's raw score. Norm
// scoring only depends on the raw facet/domain sums, so the reconstructed
// assessment is faithful to what upstream actually stored.
//
// The regex couples to upstream's RSC payload format (a Next.js internal), so
// it is pinned behind a fixture in test/og-fallback.test.ts — if upstream
// upgrades Next and the shape drifts, that test is the tripwire.

export const UPSTREAM_BASE_URL = 'https://bigfive-test.com';

const FACET_OBJECT_RE =
  /facet\\":(\d+),\\"title\\":\\"([^\\]+)\\"[\s\S]*?\\"score\\":(\d+),\\"count\\":(\d+)/g;

const FACET_ITEM_COUNT = 4;
const MIN_FACET_RAW = FACET_ITEM_COUNT * 1; // 4
const MAX_FACET_RAW = FACET_ITEM_COUNT * 5; // 20
const TOTAL_FACETS = 30;

export interface OgResult {
  lang: string;
  answers: Answer[];
}

/** Parse title→raw-score for every facet object in an upstream result page. */
export function parseOgFacetScores(html: string): Map<string, number> {
  const byTitle = new Map<string, number>();
  FACET_OBJECT_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = FACET_OBJECT_RE.exec(html))) {
    const title = m[2];
    const score = Number(m[3]);
    const count = Number(m[4]);
    // Only facet-level objects (count 4); dedupe on first occurrence (the
    // payload embeds the result more than once).
    if (count === FACET_ITEM_COUNT && !byTitle.has(title)) {
      byTitle.set(title, score);
    }
  }
  return byTitle;
}

/** Split a facet raw sum into 4 item scores in [1,5] that sum back to it. */
function synthesiseFacetItems(raw: number): number[] {
  const base = Math.floor(raw / FACET_ITEM_COUNT);
  const remainder = raw - base * FACET_ITEM_COUNT;
  return Array.from({ length: FACET_ITEM_COUNT }, (_, i) =>
    i < remainder ? base + 1 : base
  );
}

/**
 * Turn an upstream result page into synthetic answers, or null if the page
 * isn't a complete result (all 30 facets, each a plausible raw sum).
 */
export async function parseOgResult(
  html: string,
  lang = 'en'
): Promise<OgResult | null> {
  const scoreByTitle = parseOgFacetScores(html);
  if (scoreByTitle.size < TOTAL_FACETS) return null;

  const template = await getTemplate('en');
  const answers: Answer[] = [];
  let resolved = 0;
  for (const domain of template) {
    for (const { facet, title } of domain.facets) {
      const raw = scoreByTitle.get(title);
      if (raw === undefined || raw < MIN_FACET_RAW || raw > MAX_FACET_RAW) {
        return null;
      }
      resolved++;
      synthesiseFacetItems(raw).forEach((score, i) => {
        answers.push({
          id: `og-${domain.domain}-${facet}-${i}`,
          domain: domain.domain,
          facet,
          score
        });
      });
    }
  }
  if (resolved !== TOTAL_FACETS) return null;
  return { lang, answers };
}

/**
 * Fetch a result by id from the upstream site and reconstruct its answers.
 * Returns null on any failure (network, non-200, unparseable, incomplete) so
 * callers can fall through to their normal "not found" handling.
 */
export async function fetchOgResult(
  id: string,
  baseUrl: string = UPSTREAM_BASE_URL
): Promise<OgResult | null> {
  const url = `${baseUrl}/result/${encodeURIComponent(id)}?lang=en`;
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'speculum/og-fallback' },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return null;
    const html = await res.text();
    return await parseOgResult(html, 'en');
  } catch (error) {
    console.error(`og fallback failed for ${id}:`, error);
    return null;
  }
}
