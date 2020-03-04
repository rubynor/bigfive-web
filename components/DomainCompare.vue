<template>
  <div>
    <span class="headline">{{ domain.title }}</span>
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
