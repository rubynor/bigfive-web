// SolidStart server functions wrapping the framework-agnostic actions in
// packages/data (Phase 4 step 2). The `"use server"` directive + dynamic
// import keep the data layer (pg/drizzle) out of the client bundle; only
// these RPC stubs ship to the browser. Type-only imports are erased at
// build time, so they're safe to pull from the barrel here.

import { query, action } from '@solidjs/router';
import type {
  Demographics,
  Feedback,
  Report,
  SaveTestInput,
  SeriesPoint
} from '@bigfive-org/data';

export const getTestResultQuery = query(
  async (
    id: string,
    language?: string,
    // Read-only norm-stratum override for the result page's reference-group
    // control. Never written back — the stored row keeps the demographics the
    // taker gave at test time.
    demographics?: Demographics
  ): Promise<Report> => {
    'use server';
    const { getTestResult } = await import('@bigfive-org/data');
    return getTestResult(id, language, demographics);
  },
  'testResult'
);

export const getSeriesQuery = query(
  async (seriesToken: string): Promise<SeriesPoint[]> => {
    'use server';
    const { getSeries } = await import('@bigfive-org/data');
    return getSeries(seriesToken);
  },
  'series'
);

export const saveTestAction = action(
  async (input: SaveTestInput): Promise<{ id: string }> => {
    'use server';
    const { saveTest } = await import('@bigfive-org/data');
    return saveTest(input);
  },
  'saveTest'
);

export const saveFeedbackAction = action(
  async (entry: Feedback): Promise<{ id: string }> => {
    'use server';
    const { saveFeedback } = await import('@bigfive-org/data');
    return saveFeedback(entry);
  },
  'saveFeedback'
);
