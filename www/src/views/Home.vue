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
              Big Five Personality Test
            </v-card-title>
          </v-img>
          <v-card-text>
            <p>
            Learn to know yourself better with a <b>free, open-source</b> personality test to measure the <router-link to="bigfive">big five personality</router-link> traits,
            the far the most scientifically validated and reliable psychological model to measure personality.
            </p>
            <p>
            The following test contains <b>120 questions</b> which is estimated to take you about <b>10 minutes</b> to complete.
            </p>
            <p>
            After you have completed the test you will receive a detailed personality report in the following domains:
            <br />
            <i><router-link to="openness_to_experience">Openness to experience</router-link>, <router-link to="consciousness">Conscientiousness</router-link>, <router-link to="extraversion">Extraversion</router-link>, <router-link to="agreeableness">Agreeableness</router-link> and <router-link to="neuroticism">Neuroticism</router-link></i>.
            </p>
            <div class="counter">
              123 456 78
              <span class="font-italic text--secondary">
                tests taken so far
              </span>
            </div>

            <p>
              <v-btn large color="secondary" to="/form">
                take the free test now
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
