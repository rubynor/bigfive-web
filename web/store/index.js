import Vue from 'vue'
import { languages, getItems, sleep, getInfo, elapsedTimeInSeconds } from '../lib/helpers'

export const strict = false

export const state = () => ({
  development: process.env.NODE_ENV === 'development',
  slide: 0,
  loading: false,
  result: false,
  compareResult: false,
  snackbar: {
    active: false,
    message: false,
    type: false
  },
  form: {
    age: 0,
    language: '',
    gender: '',
    accepted: false
  },
  languages,
  test: {
    testStart: 0,
    itemsPerPage: 3,
    answers: [],
    inventory: [],
    position: 0,
    done: false,
    invalid: false,
    inProgress: false
  }
})

export const getters = {
  FORM_IS_VALID: state => {
    return !!(state.form.gender && state.form.language && state.form.age && state.form.age > 15)
  },
  GET_SELECTED_LANGUAGE: state => {
    const { text } = state.languages.find(({ value }) => value === state.form.language) || {}
    return text
  },
  GET_CURRENT_QUESTIONS: ({ test }) => {
    return test.inventory.slice(test.position, test.position + test.itemsPerPage)
  },
  GET_CURRENT_ANSWER: ({ test }) => id => {
    return test.answers[id] ? test.answers[id].score : ''
  },
  GET_PROGRESS: state => {
    return Math.round(Object.keys(state.test.answers).length / state.test.inventory.length * 100)
  },
  NEXT_BUTTON_STATE: ({ test }) => {
    if (test.inProgress) return true
    const currentQuestions = test.inventory.slice(test.position, test.position + test.itemsPerPage)
    return currentQuestions.filter(item => !test.answers[item.id]).length !== 0
  },
  BACK_BUTTON_STATE: ({ test }) => {
    return test.position < test.itemsPerPage
  }
}

export const mutations = {
  SET_SNACKBAR: (state, { msg, type = 'info' }) => {
    state.snackbar = {
      message: msg,
      type,
      active: true
    }
  },
  SET_SLIDE: (state, slide) => {
    state.slide = slide
  },
  NEXT_SLIDE: state => {
    state.slide++
  },
  PREV_SLIDE: state => {
    state.slide--
  },
  SET_LANGUAGE: (state, language) => {
    state.form.language = language
    state.slide++
  },
  SET_GENDER: (state, gender) => {
    state.form.gender = gender
    state.slide++
  },
  SET_AGE: (state, age) => {
    state.form.age = age
    if (age > 15) {
      state.slide++
    }
  },
  SET_ITEMS_PER_PAGE: (state, itemsPerPage) => {
    state.test.itemsPerPage = itemsPerPage
  },
  SET_INVENTORY: state => {
    state.test.inventory = getItems(state.form.language || 'en')
    state.test.testStart = Date.now()
  },
  SET_ANSWER: async (state, { id, answer }) => {
    const { domain, facet } = state.test.inventory.find(q => q.id === id)

    const lastAnswerId = Object.keys(state.test.answers).slice(-1)[0]

    Vue.set(state.test.answers, id, { score: parseInt(answer), domain, facet })

    if (state.test.itemsPerPage === 1) {
      // Avoids skipping question if user changes answer within 700 ms on
      // 1 itemsPerPage
      if (lastAnswerId !== id && state.test.position <= Object.keys(state.test.answers).length) {
        state.test.inProgress = true
        await sleep(700)
        state.test.position += state.test.itemsPerPage
        state.test.inProgress = false
      }

      window.scrollTo(0, 0)
    }

    if (Object.keys(state.test.answers).length >= state.test.inventory.length) {
      state.test.done = true
    }
  },
  NEXT_QUESTIONS: ({ test }) => {
    if (test.position + test.itemsPerPage <= Object.keys(test.answers).length) {
      test.position += test.itemsPerPage
    }
  },
  PREVIOUS_QUESTIONS: ({ test }) => {
    test.position -= test.itemsPerPage
  },
  SKIP_QUESTIONS: ({ test }) => {
    test.inventory.forEach(question => {
      Vue.set(
        test.answers,
        question.id,
        {
          score: Math.floor(Math.random() * 5) + 1,
          domain: question.domain,
          facet: question.facet
        }
      )
    })
    test.position = test.inventory.length
    test.done = true
    test.invalid = true
  },
  SET_RESULT: (state, payload) => {
    state.result = payload
  },
  SET_COMPARE_RESULT: (state, payload) => {
    state.compareResult = payload
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  CHANGE_LANGUAGE: (state, language) => {
    state.test.inventory = getItems(language)
    state.form.language = language
  }
}

export const actions = {
  async SUBMIT_TEST (context) {
    try {
      context.commit('SET_LOADING', true)

      const answers = context.state.test.answers

      const result = {
        testId: getInfo.shortId,
        lang: context.state.form.language,
        invalid: context.state.test.invalid,
        answers: Object.keys(answers).map(key => answers[key]),
        timeElapsed: elapsedTimeInSeconds(context.state.test.testStart),
        dateStamp: Date.now()
      }

      const { id } = await this.$axios.$post(process.env.API_URL + 'save', result)

      context.commit('SET_LOADING', false)
      $nuxt.$router.push({ path: `/result/${id}` })
    } catch (error) {
      context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
      context.commit('SET_LOADING', false)
    }
  }
}
