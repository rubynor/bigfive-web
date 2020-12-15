<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ mdiAccountOutline }}
      </v-icon>
      Personal Info
      <v-spacer />
    </v-card-title>
    <v-form
      ref="form"
      @submit="checkForm"
    >
      <v-card-text>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li
              v-for="error in errors"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
        </p>
        <v-text-field
          v-model="name"
          class="mt-5"
          autofocus
          :rules="[rules.required]"
          :placeholder="$t('getCompare.nameOfPerson')"
          @input="SET_NAME"
        />
        <v-text-field
          v-model="twitterUsername"
          class="mt-5"
          :rules="[rules.required]"
          :placeholder="$t('form.twitterUsername') || 'twitter username'"
          @input="SET_TWITTER_USERNAME"
        />
        <p>{{ $t("form.iam") }} <b>{{ form.age }}</b> {{ $t("form.yearsOld") }}</p>
        <v-slider
          v-model="age"
          color="secondary"
          :hint="form.age < 15 ? $t('form.ageWarning') : ''"
          min="0"
          max="100"
          persistent-hint
          thumb-label
          @change="SET_AGE"
        />
        <v-text-field
          v-model="country"
          class="mt-5"
          :rules="[rules.required]"
          :placeholder="$t('form.yourcountry') || 'Where is your country ?'"
          @input="SET_COUNTRY"
        />
        <v-text-field
          v-model="city"
          class="mt-5"
          :rules="[rules.required]"
          :placeholder="$t('form.yourcity') || 'Where is your city ?'"
          @input="SET_CITY"
        />
        <v-text-field
          v-model="occupation"
          class="mt-5"
          :rules="[rules.required]"
          :placeholder="$t('form.youroccupation') || 'What is your occupation ?'"
          @input="SET_OCCUPATION"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary"
          type="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PersonalInfo',
  data: () => ({
    mdiAccountOutline,
    mdiRadioboxBlank,
    mdiRadioboxMarked,
    name: '',
    age: 0,
    twitterUsername: '',
    city: '',
    occupation: '',
    country: '',
    isFormValid: false,
    errors: [],
    rules: {
      required: name => !name ? 'The field is required' : ''
    }
  }),
  computed: mapState(['form']),
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.form', { part: 'personal' })
  },
  methods: {
    ...mapMutations(['SET_AGE', 'SUBMIT_FORM', 'SET_NAME', 'SET_TWITTER_USERNAME', 'SET_CITY', 'SET_OCCUPATION', 'SET_COUNTRY']),
    checkForm: function (e) {
      this.errors = []
      if (!this.name) {
        this.errors.push('Name is required.')
      }
      if (!this.twitterUsername) {
        this.errors.push('Twitter username is required.')
      }
      if (this.age < 15) {
        this.errors.push('You must be 16 or older')
      }
      if (!this.country) {
        this.errors.push('Country is required')
      }
      if (!this.city) {
        this.errors.push('City is required')
      }
      if (!this.occupation) {
        this.errors.push('Occupation is required')
      }

      if (!this.errors.length) {
        this.SET_AGE(this.age)
        this.SET_NAME(this.name)
        this.SET_TWITTER_USERNAME(this.twitterUsername)
        this.SET_CITY(this.city)
        this.SET_COUNTRY(this.country)
        this.SET_OCCUPATION(this.occupation)
        this.SUBMIT_FORM()
      }

      e.preventDefault()
    }
  }
}
</script>
