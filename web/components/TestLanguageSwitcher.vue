<template>
  <div>
    <v-chip color="secondary">
      {{ form.language }}
    </v-chip>
    <v-chip
      v-for="languageId in languages.map(({ value }) => value).filter(langCode => langCode !== form.language).slice(0, expanded ? languages.length : 1)"
      :key="languageId"
      class="ma-1"
      @click="CHANGE_LANGUAGE(languageId)"
    >
      {{ languageId }}
    </v-chip>
    <v-chip
      v-if="!expanded"
      @click="toggleExpand"
    >
      ... {{ languages.length - 2 }} {{ $t('test.more') }}
    </v-chip>
    <v-chip
      v-else
      color="secondary"
      dark
      @click="toggleExpand"
    >
      <v-icon small>
        {{ mdiClose }}
      </v-icon>
    </v-chip>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { mapState, mapMutations } from 'vuex'
import { sleep } from '../lib/helpers'

export default {
  name: 'TestLanguageSwitcher',
  data: () => ({
    expanded: false,
    mdiClose
  }),
  computed: mapState(['languages', 'form']),
  methods: {
    ...mapMutations(['CHANGE_LANGUAGE']),
    async toggleExpand () {
      this.expanded = !this.expanded
      if (this.expanded) {
        await sleep(6000)
        this.expanded = false
      }
    }
  }
}
</script>
