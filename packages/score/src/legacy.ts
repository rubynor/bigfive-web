// Upstream @bigfive-org/score v1 scorer, kept verbatim for back-compat and as a
// fixture oracle. SUPERSEDED by the norm-based scoreAssessment; not used in the
// default export anymore. Do not extend — new work goes through scoring.ts.

interface Answer {
  domain: string;
  facet?: number;
  score: number;
}

interface Result {
  score: number;
  count: number;
  result: string;
  facet: Record<string, { score: number; count: number; result: string }>;
}

export function processAnswers(answers: Answer[]): Record<string, Result> {
  const result: Record<string, Result> = {};

  answers.forEach((answer) => {
    if (result[answer.domain] === undefined) {
      result[answer.domain] = { score: 0, count: 0, result: 'neutral', facet: {} };
    }
    const domain = result[answer.domain];
    domain.score += answer.score;
    domain.count++;

    if (answer.facet === undefined) return;

    if (domain.facet[answer.facet] === undefined) {
      domain.facet[answer.facet] = { score: 0, count: 0, result: 'neutral' };
    }
    const facet = domain.facet[answer.facet];
    facet.score += answer.score;
    facet.count++;
  });

  Object.values(result).forEach((domain) => {
    domain.result = calculateResult(domain.score, domain.count);
    Object.values(domain.facet).forEach((facet) => {
      facet.result = calculateResult(facet.score, facet.count);
    });
  });

  return result;
}

export function calculateResult(score: number, count: number): string {
  const avgScore = score / count;
  if (avgScore > 3.5) {
    return 'high';
  } else if (avgScore < 2.5) {
    return 'low';
  }
  return 'neutral';
}
