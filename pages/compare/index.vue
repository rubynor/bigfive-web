<template>
  <v-card>
    <v-card-title>Compare people or teams</v-card-title>
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
          <v-list-item-avatar>
            <v-icon large>{{ mdiAccount }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="person.name"></v-list-item-title>
            <v-list-item-subtitle v-text="person.id"></v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            @click="delPerson(i)"
            icon
          >
          <v-icon>{{ mdiDelete }}</v-icon>
          </v-btn>

        </v-list-item>
        <v-list-item>

          <v-list-item-content>
            {{
              people.length === 0
                ? 'You need to add people to compare them'
                : 'Add another person'
            }}
          </v-list-item-content>

          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                small
                v-on="on"
              >
              <v-icon>{{ mdiPlus }}</v-icon>
                Add person
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Add Person
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="isFormValid">
                  <v-text-field
                    class="mt-5"
                    v-model="name"
                    label="Name"
                    :rules="[rules.uniqueName]"
                    autofocus
                    placeholder="Name of this person"
                  ></v-text-field>

                  <v-text-field
                    v-model="id"
                    label="ID"
                    :rules="[rules.validId]"
                    placeholder="URL or ID for comparison"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary"
                    fab
                    :disabled="!isFormValid"
                    @click="this.addPerson"
                  >
                  <v-icon>{{ mdiPlus }}</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card-text>

            </v-card>
          </v-dialog>

        </v-list-item>
      </v-list-item-group>

      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!(people.length > 1)"
          color="secondary"
          large
          @click="this.compare"
        >
          compare people
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDelete, mdiAccount, mdiPlus } from '@mdi/js'
import { validMongoId, formatId, base64url } from '../../lib/helpers.js'

export default {
  name: 'ResultForm',
  head: () => ({
    title: 'Compare yourself with others',
    meta: [
      { hid: 'description', name: 'description', content: 'Compare yourself with your partner, colleagues, friends or family' }
    ]
  }),
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
      this.dialog = false
      this.$refs.form.reset()
    },
    compare () {
      const id = base64url(JSON.stringify(this.people))
      this.$router.push(this.localePath({ path: `/compare/${id}` }))
    }
  },
  data: function () {
    return {
      mdiDelete,
      mdiAccount,
      mdiPlus,
      people: [],
      isFormValid: false,
      name: '',
      id: '',
      dialog: false,
      rules: {
        validId: value => validMongoId(formatId(value)) || 'Not a valid ID',
        uniqueName: name => !this.people.find(person => person.name === name) || 'Need to be a unique name'
      }
    }
  }
}
</script>
