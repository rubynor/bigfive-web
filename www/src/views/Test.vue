<template>
  <v-container v-resize="onResize">
    <Language v-if="!form.language" />
    <div v-else>
      <v-row>
        <v-col>
          <TestLanguageSwitcher />
        </v-col>
        <v-col col="12">
          <Timer />
        </v-col>
      </v-row>
      <v-progress-linear
        :value="GET_PROGRESS"
        height="25"
        reactive
        rounded
        background-opacity="0.1"
        class="mb-3"
        :style="GET_PROGRESS > 49 && { color: 'white' }"
      >
        {{ GET_PROGRESS }}%
      </v-progress-linear>
      <div v-for="question in GET_CURRENT_QUESTIONS" :key="question.id">
        <h2>{{ question.text }}</h2>
        <v-radio-group @change="answer => SET_ANSWER({ id: question.id, answer } )" :value="GET_CURRENT_ANSWER(question.id)">
          <v-radio
            v-for="(choice, i) in question.choices"
            :name="question.id"
            :key="i"
            color="secondary"
            :label="choice.text"
            ></v-radio>
        </v-radio-group>
      </div>

      <v-row class="justify-center pt-4">
        <div v-if="!test.done">
          <v-btn large color="primary" :disabled="BACK_BUTTON_STATE" class="mr-2" @click="PREVIOUS_QUESTIONS">
            {{ $t("test.back") }}
          </v-btn>

          <v-btn large color="primary" :disabled="NEXT_BUTTON_STATE" @click="NEXT_QUESTIONS">
            {{ $t("test.next") }}
          </v-btn>
          <v-btn v-if="development" large color="primary" class="ml-2" @click="SKIP_QUESTIONS">
            skip
          </v-btn>
        </div>

        <div v-else>
          <v-btn large color="secondary" @click="SUBMIT_TEST">
            see results
          </v-btn>
        </div>

      </v-row>

    </div>
  </v-container>
</template>

<script>
import Timer from '../components/Timer'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import { sleep } from '../lib/helpers'
import { Language } from '../components/form'
import TestLanguageSwitcher from '../components/TestLanguageSwitcher'

export default {
  name: 'test',
  mounted () {
    this.onResize()
  },
  methods: {
    ...mapMutations(['SET_INVENTORY', 'SET_ANSWER', 'NEXT_QUESTIONS', 'PREVIOUS_QUESTIONS', 'SET_ITEMS_PER_PAGE', 'SKIP_QUESTIONS']),
    ...mapActions(['SUBMIT_TEST']),
    onResize () {
      window.innerWidth < 600
        ? this.SET_ITEMS_PER_PAGE(1)
        : this.SET_ITEMS_PER_PAGE(3)
    }
  },
  computed: {
    ...mapState(['test', 'development', 'form']),
    ...mapGetters(['GET_CURRENT_QUESTIONS', 'GET_PROGRESS', 'NEXT_BUTTON_STATE', 'BACK_BUTTON_STATE', 'GET_CURRENT_ANSWER'])
  },
  created () {
    this.SET_INVENTORY()
  },
  components: {
    Timer,
    Language,
    TestLanguageSwitcher
  },
  watch: {
    'test.done': async function (testDone) {
      if (testDone) {
        this.$confetti.start({ particlesPerFrame: 0.25, particles: [{ type: 'heart' }] })
        await sleep(4000)
        this.$confetti.stop()
      }
    }
  }
}
</script>
