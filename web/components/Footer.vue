<template>
  <v-footer class="pl-10 pt-10">
    <v-row class="footer-container">
      <v-col
        sm="12"
        md="6"
      >
        <v-row class="footer-wrapper">
          <v-col class="footer-heading">
            SAY<br>HALLO
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
          >
            <a
              href="https://www.facebook.com/rubynorno/"
              aria-label="Gå til facebook"
            >
              <v-icon large>{{ mdiFacebook }}</v-icon>
            </a>

            <v-divider
              inset
              vertical
              class="mx-1"
            />

            <a
              href="https://github.com/rubynor"
              aria-label="Gå til github"
            >
              <v-icon large>{{ mdiGithub }}</v-icon>
            </a>

            <v-divider
              inset
              vertical
              class="mx-1"
            />

            <a
              href="https://twitter.com/rubynor"
              aria-label="Gå til twitter"
            >
              <v-icon large>{{ mdiTwitter }}</v-icon>
            </a>

            <v-divider
              inset
              vertical
              class="mx-1"
            />

            <a
              href="https://no.linkedin.com/company/rubynor-as"
              aria-label="Gå til linkedIn"
            >
              <v-icon large>{{ mdiLinkedin }}</v-icon>
            </a>
          </v-col>
          <v-col
            cols="12"
            class="footer-about"
          >
            Rubynor<br>
            Bedriftsveien 64<br>
            3735 Skien, Norway<br><br>
            bigfive-test@rubynor.com<br>
          </v-col>
          <v-col
            class="footer-text"
            cols="12"
          >
            © {{ new Date().getFullYear() }} — Rubynor - all rights reserved.
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <h3 class="mb-2">
          Having issues with the site?
        </h3>
        Submit an issue at <a
          href="https://github.com/rubynor/bigfive-web"
          rel="noopener noreferrer"
          target="_blank"
        >GitHub</a> or contact us at <a href="mailto:bigfive-test@rubynor.com">bigfive-test@rubynor.com</a>
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
  })
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
