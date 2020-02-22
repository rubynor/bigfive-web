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
      <p class="text-center">
        Save the following ID to see the results later or compare yourself to others
        <ShareLinks :id="$route.params.id" />
        <br />
        <span class="secondary--text headline">{{ $route.params.id }}</span>
      </p>

      <span class="headline">The five domains</span>
      <BarChart v-if="result" :data="result" />
      <div v-for="domain in result" :key="domain.id">
        <Domain :domain="domain" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import BarChart from '../components/BarChart'
import Domain from '../components/Domain'
import ShareLinks from '../components/ShareLinks'

export default {
  name: 'result',
  created () {
    this.$store.dispatch('GET_RESULT', this.$route.params.id)
  },
  computed: mapState(['result', 'loading']),
  components: {
    BarChart,
    Domain,
    ShareLinks
  }
}
</script>
