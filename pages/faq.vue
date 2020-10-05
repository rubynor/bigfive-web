<template>
  <div class="faq">
    <v-list class="d-none">
      <v-list-item
        v-for="link of page.toc"
        :key="link.id"
        class
      >
        <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
      </v-list-item>
    </v-list>
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

.nuxt-content ul {
  list-style: none;
}
</style>
