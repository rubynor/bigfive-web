import { randomBytes } from 'crypto';

// A MongoDB-compatible ObjectId generator: 12 bytes rendered as 24 lowercase
// hex chars = 4-byte big-endian seconds timestamp + 5-byte per-process random +
// 3-byte incrementing counter.
//
// Why we generate these ourselves: the upstream site (bigfive-test.com) is
// Mongo-backed, so every result id it mints is an ObjectId. Speculum persists
// to Postgres, where the `id` text column has no Mongo to fill it. Minting
// ObjectIds keeps one portable id space: ids we create and ids we cache from
// the og-fallback look and validate the same, and shared bigfive-test.com
// links keep resolving. No `mongodb`/`bson` dependency is pulled in for this.
const PROCESS_RANDOM = randomBytes(5);
let counter = randomBytes(3).readUIntBE(0, 3);

export function generateObjectId(now: number = Date.now()): string {
  const timestamp = Math.floor(now / 1000);
  counter = (counter + 1) % 0x1000000; // wrap at 3 bytes (16_777_216)
  const buf = Buffer.alloc(12);
  buf.writeUInt32BE(timestamp >>> 0, 0);
  buf.set(PROCESS_RANDOM, 4);
  buf.writeUIntBE(counter, 9, 3);
  return buf.toString('hex');
}

const OBJECT_ID_RE = /^[0-9a-f]{24}$/i;

export function isObjectId(id: string): boolean {
  return OBJECT_ID_RE.test(id);
}
