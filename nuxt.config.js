export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Big Five',
    title: 'Free open-source BigFive personality traits test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' },
      { name: 'keywords', content: 'big five personality test, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free, jordan peterson' },
      { name: 'og:title', content: 'Free open-source BigFive personality traits test' },
      { name: 'og:description', content: 'Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://bigfive-test.com' },
      { name: 'og:image', content: 'https://bigfive-test.com/icon.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@maccyber' },
      { name: 'twitter:title', content: 'Free open-source BigFive personality traits test' },
      { name: 'twitter:description', content: 'Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' },
      { name: 'twitter:image', content: 'https://bigfive-test.com/icon.png' },
      { name: 'twitter:image:alt', content: 'BigFive logo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  optimizeCSS: true,
  pwa: {
    manifest: {
      name: 'bigfive',
      short_name: 'b5'
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/apexcharts', mode: 'client' },
    { src: '~/plugins/confetti', mode: 'client' }
  ],
  // router: {
  //   middleware: ['18n']
  // },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-92177881-2'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  optimizedImages: {
    optimizeImages: true
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    '@aceforth/nuxt-optimized-images',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Norsk',
            code: 'no',
            iso: 'nb-NO',
            file: 'nb-NO.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        seo: true,
        baseUrl: 'https://bigfive-test.com',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        lazy: true,
        langDir: 'translations/',
        detectBrowserLanguage: false
      }
    ],
    '@nuxtjs/sitemap',
    [
      'nuxt-amplitude', {
        apiKey: '2ceb7de83dc2b9a3f73bbece2eaf0d94',
        config: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
          trackingOptions: {
            country: true,
            city: true,
            ip_address: false
          }
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  sitemap: {
    hostname: 'https://bigfive-test.com'
  },
  webfontloader: {
    google: {
      families: ['Passion One']
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Krub',
        size: '1.125rem'
      },
      icons: false
    },
    lang: {
      current: 'en'
    },
    theme: {
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
  },
  env: {
    API_URL: process.env.BASE_URL ? process.env.BASE_URL + '/api/' : 'https://b5.rubynor.xyz/api/'
  },
  build: {}
}
