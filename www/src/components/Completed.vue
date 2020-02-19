<template>
  <v-icon :color="active ? 'success' : '#d3d3d3'">mdi-checkbox-marked-circle</v-icon>
</template>

<script>
export default {
  name: 'Completed',
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
