<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiCheck }}
      </v-icon>
      {{ $t('form.confirmInfo') }}
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <p><b>{{ $t("form.language") }}</b>: {{ GET_SELECTED_LANGUAGE }}</p>
      <p><b>{{ $t("form.gender") }}</b>: {{ form.gender }}</p>
      <p><b>{{ $t("form.age") }}</b>: {{ form.age }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCheck } from '@mdi/js'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Age',
  data: () => ({
    mdiCheck
  }),
  computed: {
    ...mapState(['form']),
    ...mapGetters(['GET_SELECTED_LANGUAGE'])
  },
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'confirm' })
  },
  methods: mapMutations(['NEXT_SLIDE'])
}
</script>
