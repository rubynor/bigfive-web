<template>
  <div>
    <a @click="copyLink(`https://bigfive-test.com/result/${id}`)">
      <v-icon large>mdi-link</v-icon>
    </a>
    <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://bigfive-test.com/result/' + id">
      <v-icon large>mdi-facebook</v-icon>
    </a>
    <a :href="'https://twitter.com/home?status=https://bigfive-test.com/result/' + id">
      <v-icon large>mdi-twitter</v-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ShareLinks',
  props: ['id'],
  methods: {
    copyLink (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
    }
  }
}
</script>
