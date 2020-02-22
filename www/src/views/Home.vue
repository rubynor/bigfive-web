<template>
  <v-container grid-list-xl pa-0>
    <v-layout row wrap>

      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://static.neris-assets.com/images/personality-types/headers/fb/entj-personality-type-header.png"
            lazy
          >
            <v-card-title class="front-title">
              {{ $t('frontpage.title') }}
            </v-card-title>
          </v-img>
          <v-card-text>
            <p v-html="$t('frontpage.description.top')">
            </p>
            <p>
              {{ $t('frontpage.description.subtop') }}
              <router-link to='bigfive'>{{ $t('frontpage.title') }}</router-link>
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
                <router-link to="openness_to_experience">{{ $t('facets.openness_to_experience.title') }}</router-link>,
                <router-link to="conscientiousness">{{ $t('facets.conscientiousness.title') }}</router-link>,
                <router-link to="extraversion">{{ $t('facets.extraversion.title') }}</router-link>,
                <router-link to="agreeableness">{{ $t('facets.agreeableness.title') }}</router-link> {{ $t('common.and') }}
                <router-link to="neuroticism">{{ $t('facets.neuroticism.title') }}</router-link>
              </i>.
            </p>
            <div class="counter">
              700 000 +
              <span class="font-italic text--secondary">
                {{ $t('frontpage.description.tests_taken') }}
              </span>
            </div>

            <p>
              <v-btn large color="secondary" to="/form">
                {{ $t('frontpage.call_to_action') }}
              </v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
      <router-link to="pro">
        <v-card color="secondary" dark>
          <v-card-title>
            Pro content
          </v-card-title>
        </v-card>
      </router-link>
      </v-flex>

      <v-flex xs12 md6>
        <router-link to="article1">
          <v-card>
            <v-card-title>
              Article #1
            </v-card-title>
            <v-card-text>
              a cool story bro'
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>

      <v-flex xs12 md6>
        <router-link to="article2">
          <v-card>
            <v-card-title>
              Article #2
            </v-card-title>
            <v-card-text>
              Another article
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>

      <v-flex>
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
export default {
  name: 'Home'
}
</script>

<style>
.front-title {
  background: rgba(0, 0, 0, 0.52);
  font-family: 'Passion One', cursive !important;
  font-size: 3rem !important;
  text-transform: uppercase;
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
