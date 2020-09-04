<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiInformationOutline }}
      </v-icon>
      {{ $t("form.information") }}
    </v-card-title>
    <v-card-text>
      <p>{{ $t("form.informationText") }} <b>{{ $t("form.mostAccurate") }}</b>.</p>
      <p>{{ $t("form.readMoreAbout") }} <a href="">{{ $t("form.privacy") }}</a></p>

      <v-btn
        color="secondary"
        depressed
        class="ma-1"
        @click="NEXT_SLIDE"
      >
        <v-icon left>
          mdi-check
        </v-icon>
        {{ $t("form.nextButton") }}
      </v-btn>
      <v-btn
        depressed
        class="ma-1"
      >
        <v-icon left>
          mdi-block-helper
        </v-icon>
        {{ $t("form.declineButton") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import { mapMutations } from 'vuex'

export default {
  name: 'Info',
  data: () => ({
    mdiInformationOutline
  }),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'info' })
  },
  methods: mapMutations(['NEXT_SLIDE'])
}
</script>
