module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/no-v-html': 'off'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  globals: {
    $nuxt: true
  },
  plugins: [
    'vue'
  ]
}
