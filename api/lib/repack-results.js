const calculateScore = require('@alheimsins/bigfive-calculate-score')
const { getDomain, getFacet } = require('@alheimsins/b5-result-text')

function unwrapFacets (data) {
  const results = []
  Object.keys(data).forEach(facetKey => {
    results.push({
      id: facetKey,
      title: data[facetKey].title,
      description: data[facetKey].description,
      scores: data[facetKey].scores
    })
  })
  return results
}

module.exports = (data, language) => {
  const results = []
  const scores = data.map(item => {
    return {
      name: item.name,
      scores: calculateScore({ answers: item.data.answers })
    }
  })
  const repacked = scores.reduce((prev, current) => {
    const person = current.name
    Object.keys(current.scores).forEach(domainKey => {
      if (!Object.keys(prev).includes(domainKey)) {
        const domain = getDomain({ language: language, domain: domainKey })
        prev[domainKey] = { scores: [], facet: {}, description: domain.shortDescription, title: domain.title }
      }
      prev[domainKey].scores.push({ title: person, score: current.scores[domainKey].score })
      Object.keys(current.scores[domainKey].facet).forEach(facetKey => {
        if (!Object.keys(prev[domainKey].facet).includes(facetKey)) {
          const facet = getFacet({ language: language, domain: domainKey, facet: facetKey })
          prev[domainKey].facet[facetKey] = {
            scores: [],
            description: facet.text,
            title: facet.title
          }
        }
        prev[domainKey].facet[facetKey].scores.push({ title: person, score: current.scores[domainKey].facet[facetKey].score })
      })
    })
    return prev
  }, {})

  Object.keys(repacked).forEach(domainKey => {
    results.push({
      id: domainKey,
      title: repacked[domainKey].title,
      scores: repacked[domainKey].scores,
      description: repacked[domainKey].description,
      facets: unwrapFacets(repacked[domainKey].facet)
    })
  })

  return results
}
