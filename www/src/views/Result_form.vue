<template>
  <v-card>
    <v-card-title>Result</v-card-title>
    <v-card-text>
      If you have taken the test and saved your ID, you can see the results here by typing in the ID you got i.e. <span class="font-italic secondary--text">58a70606a835c400c8b38e84</span> in the ID-input field
      <br />
      <v-text-field
        v-model="id"
        label="ID"
        hide-details="auto"
        :rules="[rules.counter]"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :to="'/result/' + id"
          large
          :disabled="!this.validMongoId(id)"
        >
          get result
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { validMongoId } from '../lib/helpers.js'

export default {
  name: 'ResultForm',
  methods: {
    validMongoId: validMongoId
  },
  data: () => ({
    id: '',
    rules: {
      counter: value => validMongoId(value) || 'Not a valid ID'
    }
  })
}
</script>
