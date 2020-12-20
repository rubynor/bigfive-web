<template>
  <v-footer class="pl-10 pt-10">
    <v-row class="footer-container">
      <v-col
        sm="12"
        md="6"
        class="pl-0 pt-0"
      >
        <v-row class="footer-wrapper pl-0">
          <v-col class="footer-heading">
            #KendiniTanı
          </v-col>
          <v-col
            class="footer-text"
            cols="12"
          >
            © {{ new Date().getFullYear() }} — test-mypersonality.com - bütün haklarımız saklıdır.
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <h3 class="mb-2">
          Herhangi bir konu hakkında sorunuz mu var?
        </h3>
        Lütfen bizimle <a
          href="mailto:bigfive-test@rubynor.com"
          rel="noopener noreferrer"
          target="_blank"
        >buradan</a> iletişime geçin.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiGithub, mdiLinkedin } from '@mdi/js'

export default {
  name: 'Footer',
  data: () => ({
    mdiFacebook,
    mdiTwitter,
    mdiLinkedin,
    mdiGithub
  }),
  methods: {
    logClick (choice) {
      console.log(choice)
      this.$amplitude.getInstance().logEvent(`goes to ${choice}`, {})
    }
  }
}
</script>

<style scoped>
.footer-container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
}
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
.footer-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
