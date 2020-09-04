<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiEarth }}
      </v-icon>
      {{ $t('form.language') }}
    </v-card-title>
    <v-card-text>
      <p>{{ $t('form.prefferedLanguage') }} <b>{{ GET_SELECTED_LANGUAGE }}</b></p>

      <v-autocomplete
        :value="form.language"
        :items="languages"
        :label="$t('form.selectLanguage')"
        color="secondary"
        :append-icon="mdiMenuDown"
        @input="choseLanguage"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiEarth, mdiMenuDown } from '@mdi/js'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Language',
  data: () => ({
    mdiEarth,
    mdiMenuDown
  }),
  computed: {
    ...mapState(['form', 'languages']),
    ...mapGetters(['GET_SELECTED_LANGUAGE'])
  },
  methods: {
    ...mapMutations(['SET_LANGUAGE', 'SET_INVENTORY']),
    choseLanguage (lang) {
      this.$amplitude.getInstance().logEvent('b5.test.language', { language: lang })
      this.SET_LANGUAGE(lang)
      this.SET_INVENTORY()
    }
  }
}
</script>
