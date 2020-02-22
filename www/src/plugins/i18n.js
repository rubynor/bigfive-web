import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../translations'

Vue.use(VueI18n)

const browserLanguage = () => {
  const langCode = navigator.language.split('-')[0]
  if (Object.keys(messages).includes(langCode)) {
    return langCode
  }
}

const getLanguage = () => {
  return window.localStorage.getItem('language') || browserLanguage()
}

export default new VueI18n({
  locale: getLanguage() || 'en',
  messages
})
