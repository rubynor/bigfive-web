<template>
  <div class="pt-5">

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <a v-on="on" @click="copyLink(`https://bigfive-test.com/result/${id}`)">
          <v-icon large>{{ mdiLink }}</v-icon>
        </a>
      </template>
      {{ $t('shareLinks.copyLink') }}
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <a v-on="on" @click="logClick('facebook')" :href="'https://www.facebook.com/sharer/sharer.php?u=https://bigfive-test.com/result/' + id" target="_blank">
          <v-icon large>{{ mdiFacebook }}</v-icon>
        </a>
      </template>
      {{ $t('shareLinks.shareFacebook') }}
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <a v-on="on" @click="logClick('twitter')" :href="'https://twitter.com/intent/tweet?text=See my personality traits!&url=https://bigfive-test.com/result/' + id" target="_blank">
          <v-icon large>{{ mdiTwitter }}</v-icon>
        </a>
      </template>
      {{ $t('shareLinks.shareTwitter') }}
    </v-tooltip>

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
          {{ $t('shareLinks.copiedLink') }}
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiLink } from '@mdi/js'
import { sleep } from '../lib/helpers'

export default {
  name: 'ShareLinks',
  props: ['id'],
  data: () => ({
    mdiFacebook,
    mdiTwitter,
    mdiLink,
    dialog: false
  }),
  methods: {
    logClick (type) {
      this.$amplitude.getInstance().logEvent('b5.sharing', { type })
    },
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
      this.logClick('link')
    }
  }
}
</script>

<style scoped>
a:hover i {
  color: var(--v-secondary);
}

a {
  margin-right: 10px;
}
</style>
