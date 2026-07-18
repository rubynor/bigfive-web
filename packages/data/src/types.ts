// Shared data-layer types. Framework-agnostic: no React, no Next/Solid imports.

import type { Demographics } from '../../score/src/types';

// Re-export the score package's Demographics so the data layer has a single,
// canonical shape for the optional sex/ageBracket a taker may supply (absent →
// combined norms). It is the exact type scoreAssessment consumes.
export type { Demographics };

export type BaseAnswer = {
  score: number;
  domain: string;
  facet: number;
};

export type Answer = BaseAnswer & { id: string };

// What saveTest persists. Deliberately lean: the old survey also posted
// testId/invalid/timeElapsed/dateStamp, but none of that was ever stored or
// read — raw answers[] (+ optional demographics/seriesToken) are the record.
export type SaveTestInput = {
  lang: string;
  answers: Answer[];
  // `demographics` selects a norm stratum at read time (absent → combined
  // reference). `seriesToken` links sessions into a longitudinal series and is
  // set only on explicit opt-in (client-generated random token; no accounts).
  demographics?: Demographics;
  seriesToken?: string;
};

export type Feedback = {
  name: string;
  email: string;
  message: string;
};

type ErrorName = 'NotFoundError' | 'SavingError';

class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause: unknown;

  constructor({
    name,
    message,
    cause
  }: {
    name: T;
    message: string;
    cause?: unknown;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export class B5Error extends ErrorBase<ErrorName> {}
