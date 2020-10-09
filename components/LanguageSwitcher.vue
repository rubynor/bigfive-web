<template>
  <v-menu
    v-model="drawer"
    bottom
    offset-y
    max-width="250"
  >
    <template #activator="{ on }">
      <v-btn
        icon
        aria-label="Expand menu"
        v-on="on"
        @click="drawer = !drawer"
      >
        <v-img
          v-if="icons[selectedLocale]"
          :src="icons[selectedLocale]"
          max-width="24"
        />
        <span v-else>
          {{ selectedLocale }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-subheader class="text-uppercase">
          {{ $t('common.languages') }}
        </v-subheader>
      </v-list-item>
      <v-divider />
      <v-row>
        <v-col
          v-for="locale in availableLocales"
          :key="locale.code"
          cols="6"
        >
          <v-list-item
            link
            :to="switchLocalePath(locale.code)"
            class="text-none font-weight-regular pl-5 body-2"
            @click="logClick(locale.code)"
          >
            {{ locale.name }}
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-menu>
</template>

<script>
import enIcon from 'svg-country-flags/svg/gb.svg'
import heIcon from 'svg-country-flags/svg/il.svg'
import jaIcon from 'svg-country-flags/svg/jp.svg'
import noIcon from 'svg-country-flags/svg/no.svg'
import dkIcon from 'svg-country-flags/svg/dk.svg'
import seIcon from 'svg-country-flags/svg/se.svg'
import fiIcon from 'svg-country-flags/svg/fi.svg'
import deIcon from 'svg-country-flags/svg/de.svg'
import esIcon from 'svg-country-flags/svg/es.svg'
import frIcon from 'svg-country-flags/svg/fr.svg'
import ruIcon from 'svg-country-flags/svg/ru.svg'
import cnIcon from 'svg-country-flags/svg/cn.svg'
import uaIcon from 'svg-country-flags/svg/ua.svg'
import inIcon from 'svg-country-flags/svg/in.svg'
import idIcon from 'svg-country-flags/svg/id.svg'
import ptIcon from 'svg-country-flags/svg/pt.svg'
import itIcon from 'svg-country-flags/svg/it.svg'

export default {
  name: 'LanguageSwitcher',
  data: function () {
    return {
      drawer: false,
      icons: {
        en: enIcon,
        he: heIcon,
        ja: jaIcon,
        no: noIcon,
        da: dkIcon,
        sv: seIcon,
        fi: fiIcon,
        de: deIcon,
        es: esIcon,
        fr: frIcon,
        ru: ruIcon,
        'zh-Hans': cnIcon,
        uk: uaIcon,
        hi: inIcon,
        id: idIcon,
        pt: ptIcon,
        it: itIcon
      }
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    selectedLocale () {
      return this.$i18n.locale
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
