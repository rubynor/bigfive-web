<template>
  <p class="text-right">{{this.secToMin(Math.round(elapsed / 1000))}}</p>
</template>

<script>
import { secToMin } from '../lib/helpers'

export default {
  name: 'Timer',
  created () {
    this.time = Date.now()
  },
  data: () => ({
    timer: null,
    time: '',
    elapsed: 0
  }),
  methods: {
    secToMin,
    tick () {
      this.elapsed = new Date() - this.time
    }
  },
  mounted () {
    this.timer = setInterval(() => this.tick(), 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
