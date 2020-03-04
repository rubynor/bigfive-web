<template>
  <v-card>
    <v-card-title>
      <v-icon large left>{{ mdiGenderMaleFemale }}</v-icon>
      Gender
      <v-spacer></v-spacer>
    </v-card-title>
      <v-card-text>
        <p>{{ $t("form.iama") }} <b>{{ form.gender }}</b></p>
        <v-radio-group @change="this.SET_GENDER" value="form.gender">
            <v-radio :label="$t('form.female')" color="secondary" value="Female"></v-radio>
            <v-radio :label="$t('form.male')" color="secondary" value="Male"></v-radio>
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
  methods: mapMutations(['SET_GENDER']),
  computed: mapState(['form'])
}
</script>
