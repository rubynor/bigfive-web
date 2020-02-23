<template>
  <v-card>
    <v-card-title>Compare</v-card-title>
    <v-card-text>
      <p>Compare results from the bigfive personality test with multiple people.</p>
      <p>Type in the ID you got from the test results i.e. <span class="font-italic secondary--text">58a70606a835c400c8b38e84</span> in the ID-input field</p>
      <br />

      <v-list-item-group>
        <v-list-item
          two-line
          v-for="(person, i) in people"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="person.name"></v-list-item-title>
            <v-list-item-subtitle v-text="person.id"></v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            @click="delPerson(i)"
            icon
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>

        </v-list-item>
      </v-list-item-group>
      <v-btn
        v-if="people.length > 1"
        color="primary"
        large
        @click="this.compare"
      >
        compare people
      </v-btn>

      <v-text-field
        class="mt-5"
        v-model="name"
        label="Name"
        placeholder="Name for comparison"
      ></v-text-field>

      <v-text-field
        v-model="id"
        label="ID"
        :rules="[rules.valid]"
        placeholder="URL or ID for comparison"
      ></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="this.addPerson"
          large
          :disabled="!this.validMongoId(this.formatId(id)) || !name"
        >
          add
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import router from '../router'
import { validMongoId, formatId, base64url } from '../lib/helpers.js'

export default {
  name: 'ResultForm',
  methods: {
    validMongoId: validMongoId,
    formatId: formatId,
    delPerson (i) {
      this.people.splice(i, 1)
    },
    addPerson () {
      this.people.push({ name: this.name, id: formatId(this.id) })
      this.name = ''
      this.id = ''
    },
    compare () {
      const id = base64url(JSON.stringify(this.people))
      router.push({ path: `/compare/${id}` })
    }
  },
  data: () => ({
    people: [],
    name: '',
    id: '',
    rules: {
      valid: value => validMongoId(formatId(value)) || 'Not a valid ID'
    }
  })
}
</script>
