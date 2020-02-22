<template>
  <div>
    <v-select :items="languages" v-model="$i18n.locale">
    </v-select>
  </div>
</template>

<script>
import localizations from '../translations'
export default {
  data: () => ({
    languages: Object.keys(localizations)
  })
}
</script>
