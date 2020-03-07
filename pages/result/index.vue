<template>
  <v-card>
    <v-card-title>{{ $t('getResult.result') }}</v-card-title>
    <v-card-text>
      {{ $t('getResult.explaination') }} <span class="font-italic secondary--text">58a70606a835c400c8b38e84</span> {{ $t('getResult.idInput') }}
      <br />
      <v-text-field
        class="pt-5"
        v-model="id"
        label="ID"
        hide-details="auto"
        :placeholder="$t('getResult.urlOrId')"
        :rules="[rules.valid]"
        autofocus
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :to="localePath('/result/' + this.formatId(id))"
          large
          :disabled="!this.validMongoId(this.formatId(id))"
        >
          {{ $t('getResult.getResult') }}
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { validMongoId, formatId } from '../../lib/helpers.js'

export default {
  name: 'ResultForm',
  head: () => ({
    title: 'See your results',
    meta: [
      { hid: 'description', name: 'description', content: 'See your Big Five personality results' }
    ]
  }),
  methods: {
    validMongoId: validMongoId,
    formatId: formatId
  },
  data: () => ({
    id: '',
    rules: {
      valid: value => validMongoId(formatId(value)) || 'Not a valid ID'
    }
  })
}
</script>
