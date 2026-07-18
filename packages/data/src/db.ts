import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Lazy, memoized Drizzle client over a node-postgres Pool. Nothing connects at
// import time, and it only throws when DATABASE_URL is missing AND a query is
// actually run — so builds without a live database keep working.

let _db: ReturnType<typeof createDb> | null = null;

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Please export DATABASE_URL');
  }
  const pool = new Pool({ connectionString });
  return drizzle(pool, { schema });
}

export function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}
