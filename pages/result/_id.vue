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
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.test', { part: 'result' });
  },
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
  head () {
    return {
      title: this.$t('results.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('results.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('results.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('results.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('results.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('results.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('results.seo.description')  }
      ]
    }
  }
}
</script>
