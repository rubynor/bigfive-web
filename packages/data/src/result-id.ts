// Result id helpers — pure and isomorphic (no node builtins), so both
// SolidStart server code and client bundles (compare builder, get-result
// form) can use them. Ported from the reference fork's web/src/lib/helpers.ts
// (commits e1c2ea6 + 638f085).

export const formatId = (id: string): string => {
  // Strip a pasted full result URL and any stray spaces. Do NOT lowercase:
  // legacy nanoids are case-sensitive (e.g. `YjA6v1icaLMYyo_c8063w`), so
  // lowercasing would corrupt them. ObjectIds/UUIDs are hex and unaffected.
  return id.replace(/^https?:\/\/.+\/result\//, '').replaceAll(' ', '');
};

// A valid result id is any of the schemes this id space has ever used:
//   - Mongo ObjectId (24 hex) — what bigfive-test.com mints and what we mint now
//   - UUID — the Supabase-era ids
//   - nanoid (21 url-safe chars) — the brief Phase-0 Postgres scheme
// Accepting all three means shared og links and older ids all resolve.
const OBJECT_ID_RE = /^[0-9a-f]{24}$/i;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NANOID_RE = /^[A-Za-z0-9_-]{21}$/;

export const validId: (id: string) => boolean = (id: string) =>
  OBJECT_ID_RE.test(id) || UUID_RE.test(id) || NANOID_RE.test(id);

export const formatAndValidateId = (id: string): boolean => {
  const formattedId = formatId(id);
  return validId(formattedId);
};
