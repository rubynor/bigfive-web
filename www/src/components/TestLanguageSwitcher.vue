<template>
  <div>
    <v-chip color="secondary">
      {{ form.language }}
    </v-chip>
    <v-chip
      @click="CHANGE_LANGUAGE(languageId)"
      class="ma-1"
      :key="languageId"
      v-for="languageId in languages.map(({ value }) => value).filter(langCode => langCode !== form.language).slice(0, expanded ? languages.length : 1)"
    >
      {{ languageId }}
    </v-chip>
    <v-btn @click="toggleExpand" icon small>
      <v-icon dark>
        {{ expanded ? 'mdi-arrow-left' : 'mdi-arrow-right' }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TestLanguageSwitcher',
  computed: mapState(['languages', 'form']),
  methods: {
    ...mapMutations(['CHANGE_LANGUAGE']),
    toggleExpand () {
      this.expanded = !this.expanded
    }
  },
  data: () => ({
    expanded: false
  })
}
</script>
