<template>
  <v-card>
    <v-img
      :src="require('@/assets/openness.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('openness_to_experience.title')"
      >
        Openness To Experience
      </v-card-title>
    </v-img>
    <v-card-text>
      <div v-html="$t('opennessToExperience.text1')" />
      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        <span v-html="$t('opennessToExperience.quote')" />
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>
      <span v-html="$t('opennessToExperience.text2')" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Openness',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('openness_to_experience.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('openness_to_experience.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('openness_to_experience.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('openness_to_experience.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('openness_to_experience.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('openness_to_experience.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('openness_to_experience.seo.description') }
      ]
    }
  }
}
</script>

<style>
.image-title {
  font-family: 'Passion One', cursive;
  font-size: 3rem;
  text-transform: uppercase;
}

p {
  font-size: 1.3rem;
  line-height: 1.3;
}
</style>
