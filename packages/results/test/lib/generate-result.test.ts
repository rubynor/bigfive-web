import { generateResult, getTemplate } from '../../src'
import languages from '../../src/data/languages'
import { type Scores } from '../../src/types'
import scores from '../data/scores.json'
import fullScores from '../data/scores-full.json'

it('it returns expected result for no', async () => {
  const template = await getTemplate('no')
  const result = generateResult(scores as Scores, template)
  expect(result).toBeTruthy()
})

it('it returns expected result for all languages', async () => {
  for (const language of languages) {
    const template = await getTemplate(language.code)
    const result = generateResult(scores as Scores, template)
    expect(result).toBeTruthy()
  }
})

// Regression: generateResult once read facet[key] (a domain letter on the
// template facet object) instead of scores[key].facet[facet], so every facet
// was filtered out and reports rendered without facet bars/text. Pin the full
// facet mapping — 6 facets per domain, with score/count/scoreText carried
// through from the input.
it('maps all 6 facet scores/counts/results through per domain', async () => {
  const template = await getTemplate('en')
  const input = fullScores as Scores
  const result = generateResult(input, template)
  expect(result).toHaveLength(5)
  for (const domain of result) {
    expect(domain.facets).toHaveLength(6)
    for (const facet of domain.facets) {
      const facetInput = input[domain.domain].facet[String(facet.facet)]
      expect(facet.score).toBe(facetInput.score)
      expect(facet.count).toBe(facetInput.count)
      expect(facet.scoreText).toBe(facetInput.result)
    }
  }
})
