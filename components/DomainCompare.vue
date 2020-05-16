<template>
  <div>
    <h2 class="pt-12">{{ domain.title }}</h2>
    <p>{{ domain.description }}</p>
    <BarChartCompare :data="domain.facets" />
  </div>
</template>

<script>
import BarChartCompare from './BarChartCompare'

export default {
  name: 'Domain',
  props: ['domain'],
  components: {
    BarChartCompare
  }
}
</script>

<style scoped>
p {
  font-size: 1.3rem;
  line-height: 1.9;
}
</style>
