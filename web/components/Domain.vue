<template>
  <div>
    <a
      :id="domain.title.toLowerCase()"
      :href="'#' + domain.title.toLowerCase() || ''"
    >
      <span class="headline">
        {{ domain.title }}
      </span>
    </a>
    <p class="subheading grey--text text--darken-1">
      {{ $t('results.score') }}: {{ domain.score }} - {{ domain.scoreText }}
    </p>
    <p>{{ domain.shortDescription }}</p>
    <BarChart :data="domain.facets" />
    <div
      v-for="facet in domain.facets"
      :key="facet.title"
    >
      <a
        :id="facet.title.toLowerCase()"
        :href="'#' + facet.title.toLowerCase()"
      >
        <span class="title">
          {{ facet.title }}
        </span></a>
      <p class="subheading grey--text text--darken-1">
        {{ $t('results.score') }}: {{ facet.score }} - {{ facet.scoreText }}
      </p>
      <p v-html="facet.text" />
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart'

export default {
  name: 'Domain',
  components: {
    BarChart
  },
  props: {
    domain: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
