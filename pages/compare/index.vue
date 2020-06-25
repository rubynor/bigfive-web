<template>
  <div>
    <h1>{{ $t('getCompare.title') }}</h1>
    <div class="body-text">
      <p>{{ $t('getCompare.description1') }}</p>
      <p>{{ $t('getCompare.description2') }} <span class="font-italic secondary--text">58a70606a835c400c8b38e84</span> {{ $t('getCompare.description3') }}</p>
      <br>

      <v-list-item-group>
        <v-list-item
          v-for="(person, i) in people"
          :key="i"
          two-line
        >
          <v-list-item-avatar>
            <v-icon large>
              {{ mdiAccount }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="person.name" />
            <v-list-item-subtitle v-text="person.id" />
          </v-list-item-content>
          <v-btn
            icon
            @click="delPerson(i)"
          >
            <v-icon>{{ mdiDelete }}</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            {{
              people.length === 0
                ? $t('getCompare.needToAddPeople')
                : $t('getCompare.addAnother')
            }}
          </v-list-item-content>

          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template #activator="{ on }">
              <v-btn
                color="primary"
                dark
                small
                v-on="on"
              >
                <v-icon>{{ mdiPlus }}</v-icon>
                {{ $t('getCompare.addPerson') }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                {{ $t('getCompare.addPerson') }}
              </v-card-title>

              <v-card-text>
                <v-form
                  ref="form"
                  v-model="isFormValid"
                >
                  <v-text-field
                    v-model="name"
                    class="mt-5"
                    :label="$t('getCompare.name')"
                    :rules="[rules.uniqueName]"
                    autofocus
                    :placeholder="$t('getCompare.nameOfPerson')"
                  />

                  <v-text-field
                    v-model="id"
                    label="ID"
                    :rules="[rules.validId]"
                    :placeholder="$t('getCompare.urlOrId')"
                  />
                </v-form>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="secondary"
                    fab
                    :disabled="!isFormValid"
                    @click="addPerson"
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
        <v-spacer />
        <v-btn
          :disabled="!(people.length > 1)"
          color="secondary"
          large
          @click="compare"
        >
          {{ $t('getCompare.comparePeople') }}
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import { mdiDelete, mdiAccount, mdiPlus } from '@mdi/js'
import { validMongoId, formatId, base64url } from '../../lib/helpers.js'

export default {
  name: 'ResultForm',
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
  },
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
  head: () => ({
    title: 'Compare yourself with others',
    meta: [
      { hid: 'description', name: 'description', content: 'Compare yourself with your partner, colleagues, friends or family' }
    ]
  })
}
</script>

<style scoped>
.body-text {
  font-size: 1.3rem;
  line-height: 1.9;
}
</style>
