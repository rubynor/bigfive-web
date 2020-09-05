<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCheck }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content two-line>
          <v-list-item-title v-text="item.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mdiCheck } from '@mdi/js'

export default {
  name: 'FeatureList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    mdiCheck
  })
}
</script>
