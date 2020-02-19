<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-account-outline</v-icon>
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Age',
  methods: mapMutations(['SET_AGE', 'NEXT_SLIDE']),
  computed: mapState(['form'])
}
</script>
