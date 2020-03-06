<template>
  <v-container>
    <div v-if="result">
      <div class="text-center">
        <b>{{ $t('results.important') }}</b> {{ $t('results.saveResults') }} <nuxt-link :to="localePath('compare')">{{ $t('results.compare') }}</nuxt-link> {{ $t('results.toOthers') }}
        <br />
        <br />
        <v-alert outlined color="secondary">
          <span class="secondary--text headline">{{ $route.params.id }}</span>
        </v-alert>
        <ShareLinks :id="$route.params.id" />
      </div>

      <span class="display-1">{{ $t('results.theBigFive') }}</span>
      <BarChart :data="result" max='120' />
      <div v-for="domain in result" :key="domain.id">
        <Domain :domain="domain" />
      </div>
      <br />
      <span class="headline">{{ $t('shareLinks.shareResults') }}</span>
      <ShareLinks :id="$route.params.id" />
    </div>
    <Error v-else />
  </v-container>
</template>

<script>
import BarChart from '../../components/BarChart'
import Domain from '../../components/Domain'
import ShareLinks from '../../components/ShareLinks'
import Error from '../../components/Error'

export default {
  name: 'result',
  data: () => ({
    result: false
  }),
  async asyncData ({ params, store, $axios }) {
    try {
      const result = await $axios.$get(process.env.API_URL + 'result/' + params.id)
      return { result }
    } catch (error) {
      console.log(error)
      store.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
    }
  },
  components: {
    BarChart,
    Domain,
    ShareLinks,
    Error
  },
  head: () => ({
    title: 'Results from the BigFive personality traits test',
    meta: [
      { name: 'keywords', content: 'big five personality test, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free, jordan peterson' },
      // Open Graph
      { name: 'og:title', content: 'My results from the BigFive personality test' },
      { name: 'og:description', content: 'See my personality and compare yourself in the following five domains: Neuroticism, Openness To Experience, Conscientiousness, Extraversion, Agreeableness' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://bigfive-test.com' },
      { name: 'og:image', content: 'https://bigfive-test.com/icon.png' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@maccyber' },
      { name: 'twitter:title', content: 'Free open-source BigFive personality traits test' },
      { name: 'twitter:description', content: 'See my personality and compare yourself in the following five domains: Neuroticism, Openness To Experience, Conscientiousness, Extraversion, Agreeableness' },
      { name: 'twitter:image', content: 'https://bigfive-test.com/icon.png' },
      { name: 'twitter:image:alt', content: 'BigFive logo' }
    ]
  })
}
</script>
