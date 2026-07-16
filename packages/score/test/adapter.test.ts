import { describe, it, expect } from 'vitest';
import { bandToLegacy, toLegacyScores } from '../src/adapter';
import { scoreAssessment } from '../src/scoring';
import { DOMAIN_CODES, FACET_NUMBERS } from '../src/types';
import fixture from './data/120-test-results.json';

describe('bandToLegacy', () => {
  it('collapses 5 bands to low|neutral|high', () => {
    expect(bandToLegacy('very low')).toBe('low');
    expect(bandToLegacy('low')).toBe('low');
    expect(bandToLegacy('average')).toBe('neutral');
    expect(bandToLegacy('high')).toBe('high');
    expect(bandToLegacy('very high')).toBe('high');
  });
});

describe('toLegacyScores emits the @bigfive-org/results contract', () => {
  const assessment = scoreAssessment({ answers: fixture.testResult.answers });
  const legacy = toLegacyScores(assessment);

  it('is keyed by domain letters with the right counts and raw scores', () => {
    for (const d of DOMAIN_CODES) {
      expect(legacy[d]).toBeDefined();
      expect(legacy[d].count).toBe(24);
      expect(legacy[d].score).toBe(assessment.domains[d].raw);
      expect(['low', 'neutral', 'high']).toContain(legacy[d].result);
      for (const f of FACET_NUMBERS) {
        const fac = legacy[d].facet[String(f)];
        expect(fac.count).toBe(4);
        expect(fac.score).toBe(assessment.domains[d].facets[String(f)].raw);
        expect(['low', 'neutral', 'high']).toContain(fac.result);
      }
    }
  });
});
