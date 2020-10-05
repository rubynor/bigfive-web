<template>
  <div class="faq">
    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  async asyncData ({ $content }) {
    const page = await $content('faq').fetch()
    return { page }
  }
}
</script>

<style>
.nuxt-content h1 {
  margin-bottom: 10px;
}

.nuxt-content h3 {
  margin-bottom: 8px;
}
</style>
