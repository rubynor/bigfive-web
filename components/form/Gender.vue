<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiGenderMaleFemale }}
      </v-icon>
      Gender
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <p>{{ $t("form.iama") }} <b>{{ form.gender }}</b></p>
      <v-radio-group
        value="form.gender"
        @change="SET_GENDER"
      >
        <v-radio
          :label="$t('form.female')"
          color="secondary"
          value="Female"
        />
        <v-radio
          :label="$t('form.male')"
          color="secondary"
          value="Male"
        />
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiGenderMaleFemale } from '@mdi/js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Gender',
  data: () => ({
    mdiGenderMaleFemale
  }),
  computed: mapState(['form']),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'gender' })
  },
  methods: mapMutations(['SET_GENDER'])
}
</script>
