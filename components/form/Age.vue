<template>
  <v-card>
    <v-card-title>
      <v-icon large left>{{ mdiAccountOutline }}</v-icon>
      {{ $t("form.age") }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <p>{{ $t("form.iam") }} <b>{{ form.age }}</b> {{ $t("form.yearsOld") }}</p>
      <v-slider
        value="form.age"
        @change="this.SET_AGE"
        color="secondary"
        :hint="form.age < 15 ? $t('form.ageWarning') : ''"
        min="0"
        max="100"
        persistent-hint
        thumb-label
      ></v-slider>
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
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'age' });
  },
  methods: mapMutations(['SET_AGE', 'NEXT_SLIDE']),
  computed: mapState(['form'])
}
</script>
