<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}

      <img
        class="responsive"
        :src="require('@/assets/404.svg')"
      >
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <v-btn
      to="/"
      class="mt-5"
      color="secondary"
    >
      Go to home page
    </v-btn>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
