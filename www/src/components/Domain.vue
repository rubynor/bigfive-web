<template>
  <div>
    <span class="headline">{{ domain.title }}</span>
    <p>{{ domain.shortDescription }}</p>
    <BarChart :data="domain.facets" />
    <div v-for="facet in domain.facets" :key="facet.title">
      <span class="title">{{ facet.title }}</span>
      <p>Score: {{ facet.score }} - {{ facet.scoreText }}</p>
      <p v-html="facet.text" />
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart'

export default {
  name: 'Domain',
  props: ['domain'],
  components: {
    BarChart
  }
}
</script>
