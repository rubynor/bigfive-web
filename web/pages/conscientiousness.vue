<template>
  <v-card>
    <v-img
      :src="require('@/assets/conscientiousness.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('conscientiousness.title')"
      />
    </v-img>
    <v-card-text>
      <p>
        Conscientiousness concerns the way in which we control, regulate, and direct our impulses.
      </p>
      <p>
        Impulses are not inherently bad; occasionally time constraints require a snap decision, and acting on our first impulse can be an effective response.
        Also, in times of play rather than work, acting spontaneously and impulsively can be fun.
        Impulsive individuals can be seen by others as colorful, fun-to-be-with, and zany.
        Nonetheless, acting on impulse can lead to trouble in a number of ways.
        Some impulses are antisocial.
      </p>

      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        Openness to Experience describes a dimension of cognitive style that distinguishes imaginative, creative people from down-to-earth, conventional people.
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>

      <p>
        Uncontrolled antisocial acts not only harm other members of society, but also can result in retribution toward the perpetrator of such impulsive acts.
        Another problem with impulsive acts is that they often produce immediate rewards but undesirable, long-term consequences.
        Examples include excessive socializing that leads to being fired from one's job, hurling an insult that causes the breakup of an important relationship, or using pleasure-inducing drugs that eventually destroy one's health.
        Impulsive behavior, even when not seriously destructive, diminishes a person's effectiveness in significant ways.
        Acting impulsively disallows contemplating alternative courses of action, some of which would have been wiser than the impulsive choice.
        Impulsivity also sidetracks people during projects that require organized sequences of steps or stages.
        Accomplishments of an impulsive person are therefore small, scattered, and inconsistent.
        A hallmark of intelligence, what potentially separates human beings from earlier life forms, is the ability to think about future consequences before acting on an impulse.
        Intelligent activity involves contemplation of long-range goals, organizing and planning routes to these goals, and persisting toward one's goals in the face of short-lived impulses to the contrary.
        The idea that intelligence involves impulse control is nicely captured by the term prudence, an alternative label for the Conscientiousness domain.
        Prudent means both wise and cautious.
        Persons who score high on the Conscientiousness scale are, in fact, perceived by others as intelligent.
        The benefits of high conscientiousness are obvious.
        Conscientious individuals avoid trouble and achieve high levels of success through purposeful planning and persistence.
        They are also positively regarded by others as intelligent and reliable.
        On the negative side, they can be compulsive perfectionists and workaholics.
        Furthermore, extremely conscientious individuals might be regarded as stuffy and boring.
        Unconscientious people may be criticized for their unreliability, lack of ambition, and failure to stay within the lines, but they will experience many short-lived pleasures and they will never be called stuffy.
      </p>

      <div class="title">
        Self-Efficacy
      </div>
      <p>
        Self-Efficacy describes confidence in one's ability to accomplish things. High scorers believe they have the intelligence (common sense), drive, and self-control necessary for achieving success. Low scorers do not feel effective, and may have a sense that they are not in control of their lives.
      </p>

      <div class="title">
        Orderliness
      </div>
      <p>
        Persons with high scores on orderliness are well-organized. They like to live according to routines and schedules. They keep lists and make plans. Low scorers tend to be disorganized and scattered.
      </p>

      <div class="title">
        Dutifulness
      </div>
      <p>
        This scale reflects the strength of a person's sense of duty and obligation. Those who score high on this scale have a strong sense of moral obligation. Low scorers find contracts, rules, and regulations overly confining. They are likely to be seen as unreliable or even irresponsible.
      </p>

      <div class="title">
        Achievement-Striving
      </div>
      <p>
        Individuals who score high on this scale strive hard to achieve excellence. Their drive to be recognized as successful keeps them on track toward their lofty goals. They often have a strong sense of direction in life, but extremely high scores may be too single-minded and obsessed with their work. Low scorers are content to get by with a minimal amount of work, and might be seen by others as lazy.
      </p>

      <div class="title">
        Self-Discipline
      </div>
      <p>
        Self-discipline-what many people call will-power-refers to the ability to persist at difficult or unpleasant tasks until they are completed. People who possess high self-discipline are able to overcome reluctance to begin tasks and stay on track despite distractions. Those with low self-discipline procrastinate and show poor follow-through, often failing to complete tasks-even tasks they want very much to complete.
      </p>

      <div class="title">
        Cautiousness
      </div>
      <p>
        Cautiousness describes the disposition to think through possibilities before acting. High scorers on the Cautiousness scale take their time when making decisions. Low scorers often say or do first thing that comes to mind without deliberating alternatives and the probable consequences of those alternatives.
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Conscientiousness',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('conscientiousness.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('conscientiousness.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('conscientiousness.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('conscientiousness.seo.description') }
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
