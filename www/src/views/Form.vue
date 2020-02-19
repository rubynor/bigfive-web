<template>
  <v-container grid-list-xl>

    <v-stepper :value="slide" class="mb-3">
      <v-stepper-header>
        <v-stepper-step @click="SET_SLIDE(0)" color="secondary" step="0" :complete="slide > 0">
          {{ $t("form.information") }}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step @click="SET_SLIDE(1)" color="secondary" step="1" :complete="!!form.language">
          {{ $t("form.language") }}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step @click="SET_SLIDE(2)" color="secondary" step="2" :complete="!!form.gender">
          {{ $t("form.gender") }}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step @click="SET_SLIDE(3)" color="secondary" step="3" :complete="FORM_IS_VALID">
          {{ $t("form.age") }}
        </v-stepper-step>
        <v-stepper-step @click="SET_SLIDE(4)" color="secondary" step="4">
          {{ $t("form.confirm") }}
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-carousel
      v-model="slide"
      hide-delimiters
      :show-arrows="false"
      light
      height="250"
      touchless
    >

      <!-- Info -->
      <v-carousel-item>
        <Info />
      </v-carousel-item>

      <!-- Language -->
      <v-carousel-item>
        <Language />
      </v-carousel-item>

      <!-- Gender -->
      <v-carousel-item>
        <Gender />
      </v-carousel-item>

      <!-- Age -->
      <v-carousel-item>
        <Age />
      </v-carousel-item>

      <!-- Confirm -->
      <v-carousel-item>
        <Confirm />
      </v-carousel-item>

    </v-carousel>

    <v-row class="justify-center pt-4" v-if="FORM_IS_VALID && slide === 4">
      <v-btn color="secondary" @click="$router.push('test')">
        {{ $t("form.toTestButton") }}
      </v-btn>
    </v-row>

  </v-container>
</template>

<script>
import { Info, Language, Age, Gender, Confirm } from '../components/form'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Info,
    Language,
    Gender,
    Age,
    Confirm
  },
  methods: mapMutations(['SET_SLIDE']),
  watch: {
    slide: function () {
      window.scrollTo(0, 0)
    }
  },
  computed: {
    ...mapState(['slide', 'form']),
    ...mapGetters(['FORM_IS_VALID'])
  }
}
</script>
