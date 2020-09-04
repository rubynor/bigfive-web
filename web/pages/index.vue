<template>
  <div>
    <Wrapper>
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-md-left text-center"
        >
          <h1>
            {{ $t('frontpage.title') }}
          </h1>
          <p
            :class="{ 'responsive-text': $vuetify.breakpoint.smAndDown }"
            v-html="$t('frontpage.description.top')"
          />
          <p
            :class="{ 'responsive-text': $vuetify.breakpoint.smAndDown }"
            v-html="$t('frontpage.description.info')"
          />

          <v-btn
            x-large
            color="#0070f3"
            :to="localePath('/test')"
            dark
            class="mt-7"
          >
            {{ $t('frontpage.call_to_action') }}
          </v-btn>
          <br>
          <div
            class="ml-2 mt-2 grey--text text--darken-2"
            v-html="$t('frontpage.no_registration')"
          />
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="6"
        >
          <img
            class="responsive"
            alt="Girl infront of test"
            :src="require('@/assets/front.svg')"
          >
        </v-col>
      </v-row>
    </Wrapper>
    <Wrapper background="#e4e4e4">
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1
            class="font-italic"
            v-html="$t('frontpage.tests_taken')"
          />
        </v-col>
        <v-col>
          <Highlights />
        </v-col>
      </v-row>
    </Wrapper>
    <Wrapper background="white">
      <v-row
        cols="12"
        :class="{ 'flex-column-reverse': $vuetify.breakpoint.smAndDown }"
        class="py-10"
      >
        <v-col
          cols="12"
          xs="12"
          md="6"
        >
          <img
            class="responsive"
            alt="Comparing people"
            :src="require('@/assets/front_compare.svg')"
            loading="lazy"
          >
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-md-left text-center"
        >
          <h1 v-html="$t('frontpage.compare.title')" />
          <p v-html="$t('frontpage.compare.text1')" />
          <p class="black--link">
            {{ $t('frontpage.compare.text2') }}
            <nuxt-link :to="localePath('openness_to_experience')">
              {{ $t('facets.openness_to_experience.title') }}
            </nuxt-link>,
            <nuxt-link :to="localePath('conscientiousness')">
              {{ $t('facets.conscientiousness.title') }}
            </nuxt-link>,
            <nuxt-link :to="localePath('extraversion')">
              {{ $t('facets.extraversion.title') }}
            </nuxt-link>,
            <nuxt-link :to="localePath('agreeableness')">
              {{ $t('facets.agreeableness.title') }}
            </nuxt-link> {{ $t('common.and') }}
            <nuxt-link :to="localePath('neuroticism')">
              {{ $t('facets.neuroticism.title') }}
            </nuxt-link>
          </p>
          <p>
            <v-btn
              outlined
              :to="localePath('/compare/W3sibmFtZSI6Ik1hcnZpbiIsImlkIjoiNThhNzA2MDZhODM1YzQwMGM4YjM4ZTg0In0seyJuYW1lIjoiQXJ0aHVyIERlbnQiLCJpZCI6IjVlNTZiYTdhYjA5NjEzMDAwN2Q1ZDZkOCJ9LHsibmFtZSI6IkZvcmQgUGVyZmVjdCIsImlkIjoiNWRlYTllODhlMTA4Y2IwMDYyMTgzYWYzIn0seyJuYW1lIjoiU2xhcnRpYmFydGZhc3QiLCJpZCI6IjVlNTZiNjUwYjA5NjEzMDAwN2Q1ZDZkMCJ9XQ%3D%3D')"
            >
              {{ $t('frontpage.compare.action') }}
            </v-btn>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="text-center"
          cols="12"
        >
          <h2
            style="color: #797878"
            v-html="$t('frontpage.share')"
          />
          <ShareLinks />
        </v-col>
      </v-row>
    </Wrapper>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['development'])
  },
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.frontpage.loaded')
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
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('frontpage.seo.description') }
      ]
    }
  }
}
</script>

<style scoped>
p {
  font-size: 1.3rem;
  line-height: 1.9;
}

.responsive-text {
  padding-top: 10px;
  font-size: 18px;
  line-height: 1.0;
}

.responsive {
  max-width: 100%;
  height: auto;
}

.black--link a {
  color: unset;
  text-decoration: underline;
}

.default-width {
  max-width: 960px;
}

</style>
