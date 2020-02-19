<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-check</v-icon>
      {{ $t("form.confirmInfo") }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>

      <p><b>{{ $t("form.language") }}</b>: {{ GET_SELECTED_LANGUAGE }}</p>
      <p><b>{{ $t("form.gender") }}</b>: {{ form.gender }}</p>
      <p><b>{{ $t("form.age") }}</b>: {{ form.age }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Age',
  methods: mapMutations(['NEXT_SLIDE']),
  computed: {
    ...mapState(['form']),
    ...mapGetters(['GET_SELECTED_LANGUAGE'])
  }
}
</script>
