<template>
  <span>
    <v-list-item>
      <v-subheader class="text-uppercase">
        {{ $t('common.languages') }}
      </v-subheader>
    </v-list-item>
    <v-divider />
    <v-list-item
      v-for="locale in availableLocales"
      :key="locale.code"
      link
      :to="switchLocalePath(locale.code)"
      class="text-none font-weight-regular pl-5 body-2"
      @click="logClick(locale.code)"
    >
      {{ locale.name }}
    </v-list-item>
  </span>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    logClick (code) {
      this.$amplitude.getInstance().logEvent('b5.langauge.switch', { code })
      const { dir } = this.$i18n.locales.find(i => i.code === code)
      this.$vuetify.rtl = dir === 'rtl'
    }
  }
}
</script>
