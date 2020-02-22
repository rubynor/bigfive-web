<template>
  <div>
    <v-select :items="languages" v-model="$i18n.locale" label="Language:" @change="langChanged">
    </v-select>
  </div>
</template>

<script>
import localizations from '../translations'

const languageEntries = Object.entries(localizations).map(lang => ({
  text: lang[1].language,
  value: lang[0]
}))

console.log(languageEntries)

export default {
  data: () => ({
    languages: languageEntries
  }),
  methods: {
    langChanged: (lang) => {
      window.localStorage.setItem('language', lang)
    }
  }
}
</script>
Privacy
