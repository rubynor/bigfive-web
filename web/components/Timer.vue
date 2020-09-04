<template>
  <p class="text-right">
    {{ secToMin(Math.round(elapsed / 1000)) }}
  </p>
</template>

<script>
import { secToMin } from '../lib/helpers'

export default {
  name: 'Timer',
  data: () => ({
    timer: null,
    time: '',
    elapsed: 0
  }),
  created () {
    this.time = Date.now()
  },
  mounted () {
    this.timer = setInterval(() => this.tick(), 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    secToMin,
    tick () {
      this.elapsed = new Date() - this.time
    }
  }
}
</script>
