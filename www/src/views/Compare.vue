<template>
  <v-container>
    <div class="text-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="secondary"
        size="128"
      ></v-progress-circular>
    </div>
    <div v-else>
      <span class="headline">Overview</span>
      <BarChartCompare v-if="compareResult" :data="compareResult" />
      <div v-for="domain in compareResult" :key="domain.id">
      <DomainCompare :domain="domain" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import BarChartCompare from '../components/BarChartCompare'
import DomainCompare from '../components/DomainCompare'

export default {
  name: 'compareResult',
  created () {
    this.$store.dispatch('GET_COMPARE_RESULT', this.$route.params.id)
  },
  computed: mapState(['compareResult', 'loading']),
  components: {
    BarChartCompare,
    DomainCompare
  }
}
</script>
