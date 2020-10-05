<template>
  <div class="faq">
    <h1 class="mb-4">
      Frequently Asked Questions
    </h1>
    <v-row justify="center">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(item, i) in 5"
          :key="i"
        >
          <v-expansion-panel-header :expand-icon="mdiChevronDown">
            Item
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'

export default {
  name: 'FAQ',
  data: function () {
    return {
      mdiChevronDown
    }
  }
}
</script>
