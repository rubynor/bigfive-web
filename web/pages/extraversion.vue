<template>
  <v-card>
    <v-img
      :src="require('@/assets/extraversion.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('extraversion.title')"
      />
    </v-img>
    <v-card-text>
      <p>
        Extraversion is marked by pronounced engagement with the external world.
      </p>
      <p>
        Extraverts enjoy being with people, are full of energy, and often experience positive emotions.
        They tend to be enthusiastic, action-oriented, individuals who are likely to say "Yes!" or "Let's go!" to opportunities for excitement.
        In groups they like to talk, assert themselves, and draw attention to themselves.
      </p>
      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        Extraversion is marked by pronounced engagement with the external world.
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>
      <p>
        Introverts lack the exuberance, energy, and activity levels of extraverts.
        They tend to be quiet, low-key, deliberate, and disengaged from the social world.
        Their lack of social involvement should not be interpreted as shyness or depression; the introvert simply needs less stimulation than an extravert and prefers to be alone.
        The independence and reserve of the introvert is sometimes mistaken as unfriendliness or arrogance.
        In reality, an introvert who scores high on the extraversion dimension will not seek others out but will be quite pleasant when approached.
      </p>

      <div class="title">
        Friendliness
      </div>
      <p>
        Friendly people genuinely like other people and openly demonstrate positive feelings toward others.
        They make friends quickly and it is easy for them to form close, intimate relationships.
        Low scorers on Friendliness are not necessarily cold and hostile, but they do not reach out to others and are perceived as distant and reserved.
      </p>

      <div class="title">
        Gregariousness
      </div>
      <p>
        Gregarious people find the company of others pleasantly stimulating and rewarding.
        They enjoy the excitement of crowds. Low scorers tend to feel overwhelmed by, and therefore actively avoid, large crowds.
        They do not necessarily dislike being with people sometimes, but their need for privacy and time to themselves is much greater than for individuals who score high on this scale.
      </p>

      <div class="title">
        Assertiveness
      </div>
      <p>
        High scorers Assertiveness like to speak out, take charge, and direct the activities of others.
        They tend to be leaders in groups.
        Low scorers tend not to talk much and let others control the activities of groups.
      </p>

      <div class="title">
        Activity Level
      </div>
      <p>
        Active individuals lead fast-paced, busy lives.
        They move about quickly, energetically, and vigorously, and they are involved in many activities.
        People who score low on this scale follow a slower and more leisurely, relaxed pace.
      </p>

      <div class="title">
        Excitement-Seeking
      </div>
      <p>
        High scorers on this scale are easily bored without high levels of stimulation.
        They love bright lights and hustle and bustle.
        They are likely to take risks and seek thrills.
        Low scorers are overwhelmed by noise and commotion and are adverse to thrill-seeking.
      </p>

      <div class="title">
        Cheerfulness
      </div>
      <p>
        This scale measures positive mood and feelings, not negative emotions (which are a part of the Neuroticism domain).
        Persons who score high on this scale typically experience a range of positive feelings, including happiness, enthusiasm, optimism, and joy.
        Low scorers are not as prone to such energetic, high spirits.
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Extraversion',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('extraversion.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('extraversion.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('extraversion.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('extraversion.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('extraversion.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('extraversion.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('extraversion.seo.description') }
      ]
    }
  }
}
</script>

<style>
.image-title {
  font-family: 'Passion One', cursive;
  font-size: 3rem;
  text-transform: uppercase;
}
</style>
