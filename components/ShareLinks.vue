<template>
  <div class="pt-5">
    <v-tooltip bottom>
      <template #activator="{ on }">
        <a
          v-on="on"
          @click="copyLink(`https://bigfive-test.com/${id}`)"
        >
          <v-icon x-large>{{ mdiLink }}</v-icon>
        </a>
      </template>
      {{ $t('shareLinks.copyLink') }}
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="{ on }">
        <a
          :href="'https://www.facebook.com/sharer/sharer.php?u=https://bigfive-test.com/' + id"
          target="_blank"
          rel="noopener"
          aria-label="Share on facebook"
          v-on="on"
          @click="logClick('facebook')"
        >
          <v-icon x-large>{{ mdiFacebook }}</v-icon>
        </a>
      </template>
      {{ $t('shareLinks.shareFacebook') }}
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="{ on }">
        <a
          :href="'https://twitter.com/intent/tweet?text=See my personality traits!&url=https://bigfive-test.com/' + id"
          target="_blank"
          rel="noopener"
          aria-label="Share on twitter"
          v-on="on"
          @click="logClick('twitter')"
        >
          <v-icon x-large>{{ mdiTwitter }}</v-icon>
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
  props: {
    id: {
      type: String,
      default: ''
    }
  },
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

<style>
.v-icon svg:hover {
  fill: #ff0080;
}
</style>

<style scoped>
a {
  margin-right: 30px;
}
</style>
