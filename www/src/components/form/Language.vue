<template>
  <v-card>
    <v-card-title>
      <v-icon large left>mdi-earth</v-icon>
      Language
    </v-card-title>
    <v-card-text>
      <p>{{ $t("form.prefferedLanguage") }} <b>{{ GET_SELECTED_LANGUAGE }}</b></p>

      <v-autocomplete
        :value="form.language"
        @input="this.SET_LANGUAGE"
        :items="languages"
        :label="$t('form.selectLanguage')"
        color="secondary"
      ></v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Language',
  methods: mapMutations(['SET_LANGUAGE']),
  computed: {
    ...mapState(['form', 'languages']),
    ...mapGetters(['GET_SELECTED_LANGUAGE'])
  }
}
</script>
