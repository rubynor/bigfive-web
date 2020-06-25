<template>
  <div
    class="wrapper"
    :style="style"
  >
    <v-container>
      <slot />
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: 'radial-gradient(70% 70% at 50% 100%, rgb(232, 232, 232) 0px, rgb(250, 250, 250) 100%)'
    }
  },
  data: function () {
    return {
      style: {
        background: this.background
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}
<style>
