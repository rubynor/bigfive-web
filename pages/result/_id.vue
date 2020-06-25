<template>
  <v-container>
    <div v-if="result">
      <div class="text-center">
        <b>{{ $t('results.important') }}</b> {{ $t('results.saveResults') }} <nuxt-link :to="localePath('compare')">
          {{ $t('results.compare') }}
        </nuxt-link> {{ $t('results.toOthers') }}
        <br>
        <br>
        <v-alert
          outlined
          color="secondary"
        >
          <span class="secondary--text headline">{{ $route.params.id }}</span>
        </v-alert>
        <ShareLinks :id="'result/' + $route.params.id" />
      </div>

      <div class="display-1 mt-6">
        {{ $t('results.theBigFive') }}
      </div>
      <!-- Todo add language switcher
      <span style="float: right;">
        <v-select
          :items="this.$store.state.languages"
          label="Language"
          v-model="selectedLanguage"
          class="d-none"
        ></v-select>
      </span>
      -->
      <BarChart
        :data="result"
        max="120"
      />
      <div
        v-for="domain in result"
        :key="domain.id"
      >
        <Domain :domain="domain" />
      </div>
      <br>
      <span class="headline">{{ $t('shareLinks.shareResults') }}</span>
      <ShareLinks :id="'result/' + $route.params.id" />
    </div>
    <Error v-else />
  </v-container>
</template>

<script>
export default {
  name: 'Result',
  async asyncData ({ params, store, $axios }) {
    try {
      const result = await $axios.$get(process.env.API_URL + 'result/' + params.id)
      return { result }
    } catch (error) {
      console.log(error)
      store.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
    }
  },
  data: () => ({
    result: false,
    selectedLanguage: 'en'
  }),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.test', { part: 'result' })
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
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('results.seo.description') }
      ]
    }
  }
}
</script>
