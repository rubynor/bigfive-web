<template>
  <v-card>
    <v-img
      :src="require('@/assets/openness.jpg')"
      height="200px"
      lazy
    >
      <v-card-title class="image-title" v-html="$t('openness_to_experience.title')">Openness To Experience</v-card-title>
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
  head: () => ({
    title: 'Overview of Openness To Experience',
    meta: [
      { hid: 'description', name: 'description', content: 'Read more about the Openness To Experience domain in the b5 model' }
    ]
  }),
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  })
}
</script>

<style>
.image-title {
  font-family: 'Passion One', cursive;
  font-size: 3rem;
  text-transform: uppercase;
}
</style>
