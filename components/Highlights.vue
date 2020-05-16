<template>
  <v-row>
    <v-col cols="6" xs="6" sm="6" md="3">
      <img class="responsive" alt="open source" :src="require('@/assets/open-source.png')" />
      <h3>Open</h3>
      <span color="#666">This is an open source project under MIT-license.</span>
    </v-col>
    <v-col cols="6" xs="6" sm="6" md="3">
      <img class="responsive" alt="free" :src="require('@/assets/free.png')" />
      <h3>Free</h3>
      <span color="#666">The test is completely free</span>
    </v-col>
    <v-col cols="6" xs="6" sm="6" md="3">
      <img class="responsive" alt="scientific" :src="require('@/assets/scientific.png')" />
      <h3>Scientific</h3>
      <span color="#666">BigFive is a scientifically validated and reliable psychological model.</span>
    </v-col>
    <v-col cols="6" xs="6" sm="6" md="3">
      <img class="responsive" alt="Translated to over 20 langauges" :src="require('@/assets/languages.png')" />
      <h3>Translated</h3>
      <span color="#666">Translated to over 20 languages. Help out!</span>
    </v-col>
  </v-row>
</template>

<style scoped>
.responsive {
  max-width: 100%;
  height: auto;
}

h3 {
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
