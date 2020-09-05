<template>
  <v-list-item
    two-line
    class="text-center"
  >
    <v-list-item-content>
      <v-list-item-title
        class="headline"
        v-html="title"
      />
      <v-list-item-subtitle v-html="subtitle" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ProductTitle',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    subtitle: {
      type: String,
      default: () => ''
    }
  }
}
</script>
