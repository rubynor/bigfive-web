<template>
  <div>
    <h1>{{ $t('getResult.result') }}</h1>
    <div class="body-text">
      {{ $t('getResult.explaination') }} <span class="font-italic secondary--text">58a70606a835c400c8b38e84</span> {{ $t('getResult.idInput') }}
      <br>
      <v-text-field
        v-model="id"
        class="pt-5"
        label="ID"
        hide-details="auto"
        :placeholder="$t('getResult.urlOrId')"
        :rules="[rules.valid]"
        autofocus
      />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          :to="localePath('/result/' + formatId(id))"
          large
          :disabled="!validMongoId(formatId(id))"
        >
          {{ $t('getResult.getResult') }}
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import { validMongoId, formatId } from '../../lib/helpers.js'

export default {
  name: 'ResultForm',
  data: () => ({
    id: '',
    rules: {
      valid: value => validMongoId(formatId(value)) || 'Not a valid ID'
    }
  }),
  methods: {
    validMongoId: validMongoId,
    formatId: formatId
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

<style scoped>
.body-text {
  font-size: 1.3rem;
  line-height: 1.9;
}
</style>
