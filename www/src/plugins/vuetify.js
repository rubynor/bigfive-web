import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import en from 'vuetify/es5/locale/en'
import no from 'vuetify/es5/locale/no'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { en, no },
    current: 'en'
  },
  theme: {
    options: {
      customProperties: true
    },
    light: true,
    themes: {
      light: {
        primary: '#000000',
        secondary: '#ff0080',
        accent: '#607d8b',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#7dde76',
        anchor: '#ff0080'
      }
    }
  }
})
