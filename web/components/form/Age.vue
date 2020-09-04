<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiAccountOutline }}
      </v-icon>
      {{ $t("form.age") }}
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <p>{{ $t("form.iam") }} <b>{{ form.age }}</b> {{ $t("form.yearsOld") }}</p>
      <v-slider
        value="form.age"
        color="secondary"
        :hint="form.age < 15 ? $t('form.ageWarning') : ''"
        min="0"
        max="100"
        persistent-hint
        thumb-label
        @change="SET_AGE"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Age',
  data: () => ({
    mdiAccountOutline
  }),
  computed: mapState(['form']),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'age' })
  },
  methods: mapMutations(['SET_AGE', 'NEXT_SLIDE'])
}
</script>
