import { describe, it, expect } from 'vitest';
import { getTemplate } from '../../results/src/index';
import { parseOgFacetScores, parseOgResult } from '../src/og-fallback';

// This suite pins the RSC-payload regex behind a fixture: the chunks below are
// built in the exact escaped shape a bigfive-test.com result page ships
// (facet\":N,\"title\":\"X\",...,\"score\":S,\"count\":4). If upstream's Next
// upgrade changes that shape, fetchOgResult breaks silently — this file is the
// tripwire that documents what the parser expects.
function facetChunk(facet: number, title: string, score: number): string {
  return `facet\\":${facet},\\"title\\":\\"${title}\\",\\"text\\":\\"some narrative text\\",\\"score\\":${score},\\"count\\":4,\\"scoreText\\":\\"neutral\\"`;
}

async function fullPage(scoreFor: (title: string) => number): Promise<string> {
  const template = await getTemplate('en');
  const chunks: string[] = [];
  for (const domain of template) {
    // include the (ignored) inline domain object to mimic the real payload
    chunks.push(`domain\\":\\"${domain.domain}\\",\\"count\\":24,\\"score\\":50`);
    for (const f of domain.facets)
      chunks.push(facetChunk(f.facet, f.title, scoreFor(f.title)));
  }
  return `<script>self.__next_f.push([1,"${chunks.join(',')}"])</script>`;
}

describe('parseOgFacetScores', () => {
  it('extracts facet scores by title and dedupes repeats', () => {
    const html =
      facetChunk(1, 'Anxiety', 17) + ',' + facetChunk(1, 'Anxiety', 99); // dup
    const scores = parseOgFacetScores(html);
    expect(scores.get('Anxiety')).toBe(17); // first wins
  });

  it('ignores domain-level count:24 objects', () => {
    const html =
      `domain\\":\\"N\\",\\"count\\":24,\\"score\\":61,` +
      facetChunk(1, 'Anxiety', 12);
    const scores = parseOgFacetScores(html);
    expect(scores.size).toBe(1);
    expect(scores.get('Anxiety')).toBe(12);
  });
});

describe('parseOgResult', () => {
  it('reconstructs 120 answers whose facet sums equal the upstream raw scores', async () => {
    // deterministic per-title score in [4,20]
    const scoreFor = (title: string) => 4 + (title.length % 17);
    const html = await fullPage(scoreFor);
    const result = await parseOgResult(html, 'en');
    expect(result).not.toBeNull();
    expect(result!.answers).toHaveLength(120);

    // every item is a valid 1..5 response
    for (const a of result!.answers) {
      expect(a.score).toBeGreaterThanOrEqual(1);
      expect(a.score).toBeLessThanOrEqual(5);
    }

    // facet sums must reproduce the upstream raw scores exactly
    const template = await getTemplate('en');
    for (const domain of template) {
      for (const f of domain.facets) {
        const sum = result!.answers
          .filter((a) => a.domain === domain.domain && a.facet === f.facet)
          .reduce((acc, a) => acc + a.score, 0);
        expect(sum).toBe(scoreFor(f.title));
      }
    }
  });

  it('returns null when the page is missing facets', async () => {
    const html = facetChunk(1, 'Anxiety', 12); // only 1 of 30
    expect(await parseOgResult(html)).toBeNull();
  });

  it('returns null when a facet score is out of the raw range', async () => {
    const html = await fullPage((t) => (t === 'Anxiety' ? 21 : 12)); // 21 > max 20
    expect(await parseOgResult(html)).toBeNull();
  });
});
