import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { languages, getItems, sleep, getInfo } from '../lib/helpers'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      itemsPerPage: 3,
      answers: [],
      inventory: [],
      position: 0,
      done: false,
      invalid: false
    }
  },
  getters: {
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
      const currentQuestions = test.inventory.slice(test.position, test.position + test.itemsPerPage)
      if (test.itemsPerPage === 1) return true
      return currentQuestions.filter(item => !test.answers[item.id]).length !== 0
    },
    BACK_BUTTON_STATE: ({ test }) => {
      return test.position < test.itemsPerPage
    }
  },
  mutations: {
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
    },
    SET_ANSWER: async ({ test }, { id, answer }) => {
      const { domain, facet } = test.inventory.find(q => q.id === id)
      Vue.set(test.answers, id, { score: parseInt(answer), domain, facet })

      if (test.itemsPerPage === 1) {
        await sleep(700)
        test.position += test.itemsPerPage
      }

      if (Object.keys(test.answers).length === test.inventory.length) {
        test.done = true
      }
    },
    NEXT_QUESTIONS: ({ test }) => {
      test.position += test.itemsPerPage
    },
    PREVIOUS_QUESTIONS: ({ test }) => {
      test.position -= test.itemsPerPage
    },
    SKIP_QUESTIONS: ({ test }) => {
      test.inventory.forEach(question => {
        Vue.set(test.answers, question.id, { score: Math.floor(Math.random() * 5) + 1, domain: question.domain, facet: question.facet })
      })
      test.position = test.inventory.length
      test.done = true
      test.invalid = false
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
  },
  actions: {
    SUBMIT_TEST: async context => {
      try {
        context.commit('SET_LOADING', true)

        const answers = context.state.test.answers
        const choices = Object.keys(answers).reduce((prev, current) => {
          const choice = answers[current]
          prev.push({
            domain: choice.domain,
            facet: choice.facet,
            score: choice.score
          })
          return prev
        }, [])

        const result = {
          ...getInfo,
          lang: context.state.form.language,
          invalid: context.state.invalid,
          answers: choices,
          timeElapsed: Math.round((Date.now() - context.state.now) / 1000),
          dateStamp: Date.now()
        }
        console.log(result)

        const url = context.state.development
          ? 'https://b5.rubynor.xyz/api/save'
          : '/api/save'

        const { data: { id } } = await axios.post(url, result)

        context.commit('SET_LOADING', false)
        router.push({ path: `/result/${id}` })
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_RESULT: async (context, id) => {
      try {
        context.commit('SET_LOADING', true)
        const url = context.state.development
          ? `https://b5.rubynor.xyz/api/result/${id}`
          : `/api/result/${id}`
        const { data } = await axios.get(url)
        context.commit('SET_RESULT', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_COMPARE_RESULT: async (context, id) => {
      try {
        context.commit('SET_LOADING', true)
        const url = context.state.development
          ? `https://b5.rubynor.xyz/api/compare/${id}`
          : `/api/compare/${id}`
        const { data } = await axios.get(url)
        context.commit('SET_COMPARE_RESULT', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    }
  },
  modules: {
  }
})
