<template>
  <v-card>
    <v-img
      :src="require('@/assets/neuroticism.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('neuroticism.title')"
      />
    </v-img>
    <v-card-text>
      <p>
        Neuroticism refers to the tendency to experience negative feelings.
      </p>
      <p>
        Freud originally used the term neurosis to describe a condition marked by mental distress, emotional suffering, and an inability to cope effectively with the normal demands of life.
      </p>
      <p>
        He suggested that everyone shows some signs of neurosis, but that we differ in our degree of suffering and our specific symptoms of distress.
      </p>
      <p>
        Today neuroticism refers to the tendency to experience negative feelings.
      </p>
      <p>
        Those who score high on Neuroticism may experience primarily one specific negative feeling such as anxiety, anger, or depression, but are likely to experience several of these emotions.
      </p>
      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        Neuroticism refers to the tendency to experience negative feelings.
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>
      <p>
        People high in neuroticism are emotionally reactive.
      </p>
      <p>
        They respond emotionally to events that would not affect most people, and their reactions tend to be more intense than normal.
      </p>
      <p>
        They are more likely to interpret ordinary situations as threatening, and minor frustrations as hopelessly difficult.
      </p>
      <p>
        Their negative emotional reactions tend to persist for unusually long periods of time, which means they are often in a bad mood.
      </p>
      <p>
        These problems in emotional regulation can diminish a neurotic's ability to think clearly, make decisions, and cope effectively with stress.
      </p>

      <div class="title">
        Anxiety
      </div>
      <p>
        The "fight-or-flight" system of the brain of anxious individuals is too easily and too often engaged.
        Therefore, people who are high in anxiety often feel like something dangerous is about to happen.
        They may be afraid of specific situations or be just generally fearful.
        They feel tense, jittery, and nervous. Persons low in Anxiety are generally calm and fearless.
      </p>

      <div class="title">
        Anger
      </div>
      <p>
        Persons who score high in Anger feel enraged when things do not go their way.
        They are sensitive about being treated fairly and feel resentful and bitter when they feel they are being cheated.
        This scale measures the tendency to feel angry; whether or not the person expresses annoyance and hostility depends on the individual's level on neuroticism.
        Low scorers do not get angry often or easily.
      </p>

      <div class="title">
        Depression
      </div>
      <p>
        This scale measures the tendency to feel sad, dejected, and discouraged.
        High scorers lack energy and have difficulty initiating activities.
        Low scorers tend to be free from these depressive feelings.
      </p>

      <div class="title">
        Self-Consciousness
      </div>
      <p>
        Self-conscious individuals are sensitive about what others think of them.
        Their concern about rejection and ridicule cause them to feel shy and uncomfortable abound others.
        They are easily embarrassed and often feel ashamed.
        Their fears that others will criticize or make fun of them are exaggerated and unrealistic, but their awkwardness and discomfort may make these fears a self-fulfilling prophecy.
        Low scorers, in contrast, do not suffer from the mistaken impression that everyone is watching and judging them.
        They do not feel nervous in social situations.
      </p>

      <div class="title">
        Immoderation
      </div>
      <p>
        Immoderate individuals feel strong cravings and urges that they have have difficulty resisting.
        They tend to be oriented toward short-term pleasures and rewards rather than long- term consequences.
        Low scorers do not experience strong, irresistible cravings and consequently do not find themselves tempted to overindulge.
      </p>

      <div class="title">
        Vulnerability
      </div>
      <p>
        High scorers on Vulnerability experience panic, confusion, and helplessness when under pressure or stress.
        Low scorers feel more poised, confident, and clear-thinking when stressed.
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Neuroticism',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('neuroticism.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('neuroticism.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('neuroticism.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('neuroticism.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('neuroticism.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('neuroticism.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('neuroticism.seo.description') }
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
