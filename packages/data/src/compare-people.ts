// Compare-people codec — pure and isomorphic (atob/btoa + TextEncoder instead
// of Buffer, so it runs in the SolidStart client bundle too). Ported from the
// reference fork's web/src/lib/helpers.ts (commits e1c2ea6, 638f085, 4a0e042).

import { formatId, validId } from './result-id';

const unescape = (str: string) =>
  (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/');
const escape = (str: string) =>
  str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

export const base64url = {
  encode: (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return escape(btoa(binary));
  },
  decode: (str: string) => {
    const trimmedString = str
      .split('?')[0]
      .replaceAll('=', '')
      .replaceAll('%3D', '');
    const binary = atob(unescape(trimmedString));
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }
};

export type ComparePerson = {
  id: string;
  name: string;
};

// Compare links use the og bigfive-test.com format: `Name-id_Name2-id2`
// (entries joined by `_`, name and id joined by the last `-` before the id).
// Human-readable and compatible with shared links from the original site.
export function encodeComparePeople(people: ComparePerson[]): string {
  return people.map((person) => `${person.name}-${person.id}`).join('_');
}

// Id pattern anchored at the END of a segment: ObjectId (24 hex), legacy UUID,
// or legacy nanoid. Names may contain hyphens — the match is greedy from the
// right, so the id is the trailing token.
const TRAILING_ID_RE =
  /^(?<name>.+)-(?<id>(?:[0-9a-f]{24})|(?:[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})|(?:[A-Za-z0-9_-]{21}))$/i;

// Names arrive percent-encoded: the builder pushes a path like
// `/compare/May 2026-<id>` and the router encodes the space to `%20`,
// which reaches us raw in the route param. Decode defensively — a
// malformed `%` sequence must not throw, it just stays as-is.
const safeDecodeURIComponent = (str: string) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

// Decode a compare param defensively: a malformed, truncated or hand-typed link
// must yield null (so callers can render a friendly message), never throw.
// Accepts both the og `Name-id_Name-id` format and the legacy base64url(JSON)
// encoding, so links minted before the switch still resolve. Shared by the
// compare result page and the "Edit Comparison" flow that re-seeds the builder.
export function decodeComparePeople(param: string): ComparePerson[] | null {
  // Legacy: base64url(JSON.stringify([{ id, name }, ...]))
  try {
    const decoded: unknown = base64url.decode(param);
    if (Array.isArray(decoded) && decoded.length > 0) {
      const people: ComparePerson[] = [];
      for (const entry of decoded as unknown[]) {
        if (typeof entry !== 'object' || entry === null) return null;
        const record = entry as Record<string, unknown>;
        if (typeof record.id !== 'string' || typeof record.name !== 'string') {
          return null;
        }
        const cleanId = formatId(record.id);
        if (!validId(cleanId)) return null;
        people.push({ id: cleanId, name: record.name });
      }
      return people;
    }
  } catch {
    // not a base64url(JSON) param — fall through to the og format
  }

  // OG format: Name-id_Name2-id2
  const segments = param.split('_').filter(Boolean);
  if (segments.length === 0) return null;
  const people: ComparePerson[] = [];
  for (const segment of segments) {
    const match = TRAILING_ID_RE.exec(segment);
    if (!match?.groups) return null;
    const cleanId = formatId(match.groups.id);
    if (!validId(cleanId)) return null;
    people.push({
      id: cleanId,
      name: safeDecodeURIComponent(match.groups.name)
    });
  }
  return people;
}

// Move the item at `index` to `target`, returning a new array. The item is
// removed and re-inserted (not swapped), matching drag-and-drop expectations.
// Out-of-bounds targets return the list unchanged. Used to reorder compared
// persons.
export function moveItem<T>(items: T[], index: number, target: number): T[] {
  if (
    index < 0 ||
    index >= items.length ||
    target < 0 ||
    target >= items.length ||
    index === target
  ) {
    return items;
  }
  const moved = [...items];
  const [item] = moved.splice(index, 1);
  moved.splice(target, 0, item);
  return moved;
}
