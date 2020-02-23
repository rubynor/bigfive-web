<template>
  <div class="pt-5">
    <a @click="copyLink(`https://bigfive-test.com/result/${id}`)">
      <v-icon large>mdi-link</v-icon>
    </a>
    <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://bigfive-test.com/result/' + id" target="_blank">
      <v-icon large>mdi-facebook</v-icon>
    </a>
    <a :href="'https://twitter.com/home?status=https://bigfive-test.com/result/' + id" target="_blank">
      <v-icon large>mdi-twitter</v-icon>
    </a>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="155"
      origin="top left"
      transition="fade-transition"
    >
      <v-card
        color="secondary"
        dark
      >
        <v-card-title>
          Copied link
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { sleep } from '../lib/helpers'

export default {
  name: 'ShareLinks',
  props: ['id'],
  data: () => ({
    dialog: false
  }),
  methods: {
    async copyLink (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      this.dialog = true
      await sleep(600)
      this.dialog = false
    }
  }
}
</script>

<style scoped>
a:hover i {
  color: var(--v-secondary);
}
</style>
