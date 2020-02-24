const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const manifestJSON = require('./public/manifest.json')
const routerPaths = require('./src/router/paths').default.map(r => r.path).filter(p => !p.match(/\*/))

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin('https://www.bigfive-test.com', routerPaths, {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'weekly'
      }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
          path.join(__dirname, './public/index.html'),
          path.join(__dirname, './node_modules/vuetify/src/**/*.ts')
        ])
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
