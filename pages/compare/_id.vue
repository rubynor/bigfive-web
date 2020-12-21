<template>
  <v-container>
    <div v-if="result">
      <div v-if="notFound">
        <v-alert
          outlined
          color="secondary"
        >
          <span
            class="secondary--text headline"
            :class="{'title': $vuetify.breakpoint.xs}"
            @click="$router.go(-1)"
          >Sonuç karşılaştırma kayıtı bulunamadı. Lütfen farklı bir ID veya Link deneyin. Geri dönmek için yazıya tıklayın.</span>
        </v-alert>
      </div>
      <div v-else>
        <div class="text-right">
          <ShareLinks :id="'compare/' + $route.params.id" />
        </div>
        <h1>Overview</h1>
        <BarChartCompare
          :data="result"
          :max="Number(120)"
        />
        <div
          v-for="domain in result"
          :key="domain.id"
        >
          <DomainCompare :domain="domain" />
        </div>
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
      return { result, notFound: result.type === 'notFound' }
    } catch (error) {
      store.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
    }
  },
  data: () => ({
    result: false,
    notFound: false
  }),
  head: () => ({
    title: 'Team Comparison of personalities from the Big Five personality traits test',
    meta: [
      { name: 'keywords', content: 'big five personality test, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free, jordan peterson' },
      // Open Graph
      { name: 'og:title', content: 'Kişilik Testi karşılaştırmamıza göz at!' },
      { name: 'og:description', content: 'Kişilik Testi karşılaştırmamıza göz at ve aramızdaki farkları şu beş alanda incele: Yeni deneyimlere açıklık, Öz-denetim, Dışa-dönüklük, Duygusal Denge, Yumuşak Başlılık.' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://test-mypersonality.com' },
      { name: 'og:image', content: 'https://test-mypersonality.com/icon.png' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@maccyber' },
      { name: 'twitter:title', content: 'Big Five Kişilik Testi' },
      { name: 'twitter:description', content: 'Kişilik Testi karşılaştırmamıza göz at ve aramızdaki farkları şu beş alanda incele: Yeni deneyimlere açıklık, Öz-denetim, Dışa-dönüklük, Duygusal Denge, Yumuşak Başlılık.' },
      { name: 'twitter:image', content: 'https://test-mypersonality.com/icon.png' },
      { name: 'twitter:image:alt', content: 'BigFive logo' }
    ]
  }),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.test', { part: 'compare' })
  }
}
</script>
