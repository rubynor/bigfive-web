// Framework-agnostic data actions. Phase 4 wraps these as SolidStart
// "use server" functions; nothing here may import framework code.
//
// Scoring happens at READ time from the stored raw answers:
//   scoreAssessment → computeTypology → computeComposites → toLegacyScores →
//   generateResult. Nothing derived is ever persisted.

import { eq } from 'drizzle-orm';
import { getDb } from './db';
import { generateObjectId, isObjectId } from './object-id';
import { fetchOgResult } from './og-fallback';
import { feedback, results } from './schema';
import { B5Error } from './types';
import type { Feedback, SaveTestInput } from './types';
import { scoreAssessment } from '../../score/src/scoring';
import { toLegacyScores } from '../../score/src/adapter';
import type { AssessmentResult } from '../../score/src/types';
import { computeTypology, type Typology } from '../../typology/src/typology';
import {
  computeComposites,
  type CompositeTrait
} from '../../typology/src/composites';
import generateResult, { getInfo } from '../../results/src/index';
import type { Language, LanguageCode } from '../../results/src/data/languages';

const resultLanguages = getInfo().languages;

// One rendered result domain (title, description, score text, facets) as
// produced by @bigfive-org/results for the report page.
export type ResultDomain = Awaited<ReturnType<typeof generateResult>>[number];

export type Report = {
  id: string;
  timestamp: number;
  availableLanguages: Language[];
  language: string;
  results: ResultDomain[];
  // Norm-based percentiles + bands (Phase 1) and the typology/composites
  // (Phase 2), all derived from the same stored answers at read time.
  assessment: AssessmentResult;
  typology: Typology;
  composites: CompositeTrait[];
};

export async function getTestResult(
  id: string,
  language?: string
): Promise<Report> {
  let report = await getDb().query.results.findFirst({
    columns: {
      id: true,
      lang: true,
      createdAt: true,
      answers: true,
      demographics: true
    },
    where: eq(results.id, id)
  });
  // Not stored locally, but the id is an upstream (bigfive-test.com) ObjectId:
  // fetch that shared result, cache it under the same id, and serve it from
  // then on. Only ObjectId-shaped ids can exist upstream, so guard on that.
  if (!report && isObjectId(id)) {
    const og = await fetchOgResult(id);
    if (og) {
      await getDb()
        .insert(results)
        .values({
          id,
          lang: og.lang,
          answers: og.answers,
          demographics: null,
          seriesToken: null
        })
        .onConflictDoNothing();
      report = {
        id,
        lang: og.lang,
        createdAt: new Date(),
        answers: og.answers,
        demographics: null
      };
    }
  }
  if (!report) {
    throw new B5Error({
      name: 'NotFoundError',
      message: `The test results with id ${id} is not found in the database!`
    });
  }
  const selectedLanguage =
    language ||
    (resultLanguages.some((l) => l.code === report.lang) ? report.lang : 'en');
  // Norm-based scoring. Stored demographics (if any) pick the norm stratum;
  // null → undefined → the combined + 21–40 reference stratum (fallbackApplied).
  const assessment = scoreAssessment({
    answers: report.answers,
    demographics: report.demographics ?? undefined
  });
  const typology = computeTypology(assessment);
  const composites = computeComposites(assessment);
  const scores = toLegacyScores(assessment);
  // getTemplate() falls back to 'en' for any unknown code, so the cast is safe
  // at runtime for codes outside the LanguageCode union.
  const domainResults = await generateResult({
    language: selectedLanguage as LanguageCode,
    scores
  });
  return {
    id: report.id,
    timestamp: report.createdAt.getTime(),
    availableLanguages: resultLanguages,
    language: selectedLanguage,
    results: domainResults,
    assessment,
    typology,
    composites
  };
}

export async function saveTest(input: SaveTestInput): Promise<{ id: string }> {
  try {
    const [inserted] = await getDb()
      .insert(results)
      .values({
        // App-minted ObjectId — see object-id.ts for why: it keeps our ids the
        // same shape as bigfive-test.com's shared result ids.
        id: generateObjectId(),
        lang: input.lang,
        answers: input.answers,
        demographics: input.demographics ?? null,
        seriesToken: input.seriesToken ?? null
      })
      .returning({ id: results.id });
    if (!inserted) {
      throw new Error('insert returned no row');
    }
    return { id: inserted.id };
  } catch (error) {
    throw new B5Error({
      name: 'SavingError',
      message: 'Failed to save test result!',
      cause: error
    });
  }
}

// One session in a longitudinal series: its id, when it was taken, and the full
// norm-based assessment (domains + facets carry the percentiles the chart plots).
export type SeriesPoint = {
  id: string;
  timestamp: number;
  assessment: AssessmentResult;
};

/**
 * Load every session sharing a series token, oldest first, and score each with
 * its own stored demographics. Returns [] for an empty token or unknown series
 * (an unknown token is not an error — it just has no points yet).
 */
export async function getSeries(seriesToken: string): Promise<SeriesPoint[]> {
  if (!seriesToken) return [];
  const rows = await getDb().query.results.findMany({
    columns: { id: true, createdAt: true, answers: true, demographics: true },
    where: eq(results.seriesToken, seriesToken),
    orderBy: (row, { asc }) => [asc(row.createdAt)]
  });
  return rows.map((row) => ({
    id: row.id,
    timestamp: row.createdAt.getTime(),
    assessment: scoreAssessment({
      answers: row.answers,
      demographics: row.demographics ?? undefined
    })
  }));
}

export async function saveFeedback(entry: Feedback): Promise<{ id: string }> {
  try {
    const [inserted] = await getDb()
      .insert(feedback)
      .values({
        id: generateObjectId(),
        name: entry.name,
        email: entry.email,
        message: entry.message
      })
      .returning({ id: feedback.id });
    if (!inserted) {
      throw new Error('insert returned no row');
    }
    return { id: inserted.id };
  } catch (error) {
    throw new B5Error({
      name: 'SavingError',
      message: 'Failed to save feedback!',
      cause: error
    });
  }
}
