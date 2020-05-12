<template>
  <v-container grid-list-xl pa-0>
    <v-layout row wrap>

      <v-flex xs12>
        <v-card>
          <v-img
          class="white--text align-end"
          height="200px"
          :src="require('@/assets/front_image.jpg')"
          :lazy-src="require('@/assets/front_image_lazy.jpg')"
          lazy
          >
            <v-card-title :class="$vuetify.breakpoint.smAndDown ? 'front-title' : 'front-title front-title-big'">
              {{ $t('frontpage.title') }}
            </v-card-title>
          </v-img>
          <v-card-text>
            <p v-html="$t('frontpage.description.top')">
            </p>
            <p>
              {{ $t('frontpage.description.subtop') }}
              <nuxt-link :to="localePath('big_five')">{{ $t('frontpage.title') }}</nuxt-link>
              {{ $t('frontpage.description.subtop2') }}
            </p>
            <p v-html="$t('frontpage.description.reference')" >
            </p>
            <p v-html="$t('frontpage.description.info')">
            </p>
            <p v-html="$t('frontpage.description.result')">
            </p>
            <p>
              <i>
                <nuxt-link :to="localePath('openness_to_experience')">{{ $t('facets.openness_to_experience.title') }}</nuxt-link>,
                <nuxt-link :to="localePath('conscientiousness')">{{ $t('facets.conscientiousness.title') }}</nuxt-link>,
                <nuxt-link :to="localePath('extraversion')">{{ $t('facets.extraversion.title') }}</nuxt-link>,
                <nuxt-link :to="localePath('agreeableness')">{{ $t('facets.agreeableness.title') }}</nuxt-link> {{ $t('common.and') }}
                <nuxt-link :to="localePath('neuroticism')">{{ $t('facets.neuroticism.title') }}</nuxt-link>
              </i>.
            </p>
            <div class="counter">
              700 000 +
              <span class="font-italic text--secondary">
                {{ $t('frontpage.description.tests_taken') }}
              </span>
            </div>

            <p>
              <v-btn large color="secondary" :to="localePath('/test')">
                {{ $t('frontpage.call_to_action') }}
              </v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="development" xs12>
        <v-card color="error" dark>
          <v-card-title>
            Your are running the development environment 💡
          </v-card-title>
          <v-card-text>
            <p>
              Some links for testing
            </p>
            <p>
            <nuxt-link :to="localePath('/result/58a70606a835c400c8b38e84')" class="white--text">See results</nuxt-link>
            </p>
            <p>
              <nuxt-link class="white--text" :to="localePath('/compare/W3sibmFtZSI6Ik1hcnZpbiIsImlkIjoiNThhNzA2MDZhODM1YzQwMGM4YjM4ZTg0In0seyJuYW1lIjoiQXJ0aHVyIERlbnQiLCJpZCI6IjVlNTZiYTdhYjA5NjEzMDAwN2Q1ZDZkOCJ9LHsibmFtZSI6IkZvcmQgUGVyZmVjdCIsImlkIjoiNWRlYTllODhlMTA4Y2IwMDYyMTgzYWYzIn0seyJuYW1lIjoiU2xhcnRpYmFydGZhc3QiLCJpZCI6IjVlNTZiNjUwYjA5NjEzMDAwN2Q1ZDZkMCJ9XQ%3D%3D')">See compare</nuxt-link>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 class="d-none">
      <v-card color="secondary" dark>
        <v-card-title>
          Pro content
        </v-card-title>
      </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-card-title>
            We recently launched a major update 🚀
          </v-card-title>
          <v-card-text>
            <p>
            Please report issues and bugs at <a href="https://github.com/rubynor/bigfive-web/issues" rel="noopener" target="_blank">github</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 class="d-none">
        <v-card>
          <v-card-title>
            Article #2
          </v-card-title>
          <v-card-text>
            Another article
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex class="d-none">
        <v-card color="primary" dark min-height="400">
          <v-card-title>
            How it works video
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['development'])
  },
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.frontpage.loaded');
  },
  head () {
    return {
      title: this.$t('frontpage.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('frontpage.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('frontpage.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('frontpage.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('frontpage.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('frontpage.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('frontpage.seo.description')  }
      ]
    }
  }
}
</script>

<style scoped>
.front-title {
  background: rgba(0, 0, 0, 0.52);
  font-family: 'Passion One', cursive !important;
  text-transform: uppercase;
  font-size: 1.9rem !important;
}

.front-title-big {
  font-size: 3rem !important;
}

.counter {
  font-size: 2rem;
  color: var(--v-secondary-base);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.counter span {
  display: block;
  font-size: 16px;
}
</style>
