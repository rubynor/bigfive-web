import { index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { Answer, Demographics } from './types';

// Minimal Postgres schema. Ids are app-minted ObjectIds (see object-id.ts), so
// there is no DB-side default for id. Raw answers[] are the sole persisted
// truth; scores/percentiles/typology are derived at read time, never stored.

export const results = pgTable(
  'results',
  {
    id: text('id').primaryKey(),
    lang: text('lang').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    answers: jsonb('answers').$type<Answer[]>().notNull(),
    // Both nullable: a taker may skip demographics (→ combined norms at read
    // time) and only opts into a series token explicitly. series_token is
    // indexed because getSeries looks rows up by it.
    demographics: jsonb('demographics').$type<Demographics>(),
    seriesToken: text('series_token')
  },
  (table) => [index('results_series_token_idx').on(table.seriesToken)]
);

export const feedback = pgTable('feedback', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow()
});
