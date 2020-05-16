<template>
  <span>
    <v-list-item>
      <v-subheader class="text-uppercase">
        {{ $t('common.languages') }}
      </v-subheader>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      v-for="locale in availableLocales"
      @click.native="logClick(locale.code)"
      :key="locale.code"
      link
      :to="switchLocalePath(locale.code)"
      class="text-none font-weight-regular pl-5 body-2"
    >
      {{ locale.name }}
    </v-list-item>
    </span>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  methods: {
    logClick (code) {
      this.$amplitude.getInstance().logEvent('b5.langauge.switch', { code })
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
