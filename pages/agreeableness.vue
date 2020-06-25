<template>
  <v-card>
    <v-img
      :src="require('@/assets/openness.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('agreeableness.title')"
      />
    </v-img>
    <v-card-text>
      <p>
        Agreeableness reflects individual differences in concern with cooperation and social harmony. Agreeable individuals value getting along with others.
      </p>
      <p>
        They are therefore considerate, friendly, generous, helpful, and willing to compromise their interests with others'.
        Agreeable people also have an optimistic view of human nature.
        They believe people are basically honest, decent, and trustworthy.
        Disagreeable individuals place self-interest above getting along with others.
        They are generally unconcerned with others' well-being, and therefore are unlikely to extend themselves for other people.
        Sometimes their skepticism about others' motives causes them to be suspicious, unfriendly, and uncooperative.
      </p>

      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        Agreeableness reflects individual differences in concern with cooperation and social harmony.
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>

      <p>
        Agreeableness is obviously advantageous for attaining and maintaining popularity.
        Agreeable people are better liked than disagreeable people.
        On the other hand, agreeableness is not useful in situations that require tough or absolute objective decisions.
        Disagreeable people can make excellent scientists, critics, or soldiers.
      </p>

      <div class="title">
        Trust
      </div>
      <p>
        A person with high trust assumes that most people are fair, honest, and have good intentions. Persons low in trust see others as selfish, devious, and potentially dangerous.
      </p>

      <div class="title">
        Morality
      </div>
      <p>
        High scorers on this scale see no need for pretense or manipulation when dealing with others and are therefore candid, frank, and sincere. Low scorers believe that a certain amount of deception in social relationships is necessary. People find it relatively easy to relate to the straightforward high-scorers on this scale. They generally find it more difficult to relate to the unstraightforward low-scorers on this scale. It should be made clear that low scorers are not unprincipled or immoral; they are simply more guarded and less willing to openly reveal the whole truth.
      </p>

      <div class="title">
        Alturism
      </div>
      <p>
        Altruistic people find helping other people genuinely rewarding. Consequently, they are generally willing to assist those who are in need. Altruistic people find that doing things for others is a form of self-fulfillment rather than self-sacrifice. Low scorers on this scale do not particularly like helping those in need. Requests for help feel like an imposition rather than an opportunity for self-fulfillment.
      </p>

      <div class="title">
        Cooperation
      </div>
      <p>
        Individuals who score high on this scale dislike confrontations. They are perfectly willing to compromise or to deny their own needs in order to get along with others. Those who score low on this scale are more likely to intimidate others to get their way.
      </p>

      <div class="title">
        Modesty
      </div>
      <p>
        High scorers on this scale do not like to claim that they are better than other people. In some cases this attitude may derive from low self-confidence or self-esteem. Nonetheless, some people with high self-esteem find immodesty unseemly. Those whoare willing to describe themselves as superior tend to be seen as disagreeably arrogant by other people.
      </p>

      <div class="title">
        Sympathy
      </div>
      <p>
        People who score high on this scale are tenderhearted and compassionate. They feel the pain of others vicariously and are easily moved to pity. Low scorers are not affected strongly by human suffering. They pride themselves on making objective judgments based on reason. They are more concerned with truth and impartial justice than with mercy.
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Agreeableness',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('agreeableness.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('agreeableness.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('agreeableness.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('agreeableness.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('agreeableness.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('agreeableness.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('agreeableness.seo.description') }
      ]
    }
  },
  metaInfo: {
    title: 'Read more about Agreeableness'
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
