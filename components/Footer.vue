<template>
  <v-footer class="pl-10 mt-10">
    <v-col class="footer-heading">
      SAY<br/>HALLO
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-icon>{{ mdiFacebook }}</v-icon>
      <v-divider inset vertical class="mx-1"></v-divider>
      <v-icon>{{ mdiTwitter }}</v-icon>
      <v-divider inset vertical class="mx-1"></v-divider>
      <v-icon>{{ mdiLinkedin }}</v-icon>
    </v-col>
    <v-col cols="12" class="footer-about">
      B5<br/>
      Bedriftsveien 64<br/>
      3735 Skien, Norway<br /><br />
      support@bigfive-test.com<br />
    </v-col>
    <v-col
      class="footer-text"
      cols="12"
    >
      © {{ new Date().getFullYear() }} — B5 - all rights reserved.
    </v-col>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js'

export default {
  name: 'Footer',
  data: () => ({
    mdiFacebook,
    mdiTwitter,
    mdiLinkedin
  })
}
</script>

<style scoped>
.footer-heading {
  font-family: 'Passion One', cursive;
  font-size: 4rem;
  color: #4c4f5a;
  line-height: 3.5rem;
}
.footer-about {
  letter-spacing: .1em;
}
.footer-text {
  font-family: 'Didact Gothic', sans-serif;
  color: #b3b3b3;
}
</style>
