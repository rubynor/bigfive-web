<template>
  <div class="mt-4">
    <b>Languages</b>
    <br />
    <nuxt-link
      v-for="locale in availableLocales"
      @click.native="logClick(locale.code)"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">{{ locale.name }}
    </nuxt-link>
  </div>
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
