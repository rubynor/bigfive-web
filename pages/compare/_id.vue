<template>
  <v-container>
    <div v-if="result">
      <div class="text-right">
        <ShareLinks :id="'compare/' + $route.params.id" />
      </div>
      <h1>Overview</h1>
      <BarChartCompare
        :data="result"
        max="120"
      />
      <div
        v-for="domain in result"
        :key="domain.id"
      >
        <DomainCompare :domain="domain" />
      </div>
    </div>

    <Error v-else />

    <div class="text-right">
      <ShareLinks :id="'compare/' + $route.params.id" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CompareResult',
  async asyncData ({ params, store, $axios }) {
    try {
      const result = await $axios.$get(process.env.API_URL + 'compare/' + params.id)
      return { result }
    } catch (error) {
      store.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
    }
  },
  data: () => ({
    result: false
  }),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.test', { part: 'compare' })
  },
  head: () => ({
    title: 'Team Comparison of personalities from the Big Five personality traits test',
    meta: [
      { name: 'keywords', content: 'big five personality test, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free, jordan peterson' },
      // Open Graph
      { name: 'og:title', content: 'See our comparison of personalities from the BigFive personality test' },
      { name: 'og:description', content: 'See our personalities and compare yourself in the following five domains: Neuroticism, Openness To Experience, Conscientiousness, Extraversion, Agreeableness' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://bigfive-test.com' },
      { name: 'og:image', content: 'https://bigfive-test.com/icon.png' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@maccyber' },
      { name: 'twitter:title', content: 'Free open-source BigFive personality traits test' },
      { name: 'twitter:description', content: 'See our personality comparison in the following five domains: Neuroticism, Openness To Experience, Conscientiousness, Extraversion, Agreeableness' },
      { name: 'twitter:image', content: 'https://bigfive-test.com/icon.png' },
      { name: 'twitter:image:alt', content: 'BigFive logo' }
    ]
  })
}
</script>
