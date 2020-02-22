const manifestJSON = require('./public/manifest.json')

module.exports = {
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
