const manifestJSON = require('./public/manifest.json')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const routerPaths = require('./src/router/paths').default.map(r => r.path).filter(p => !p.match(/\*/))

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin('https://www.bigfive-test.com', routerPaths, {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'weekly'
      })
    ]
  },
  pwa: {
    themeColor: manifestJSON.theme_color,
    workboxOptions: {
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 30
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
