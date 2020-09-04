// TODO: Not working
const { resolve } = require('path')
const test = require('ava')
const { Nuxt, Builder } = require('nuxt')

// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async (t) => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  const nuxt = new Nuxt(config)
  t.context.nuxt = nuxt // We keep a reference to Nuxt so we can close the server at the end of the test
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Example of testing only generated html
test('Route / exists and render HTML', async (t) => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1>Big Five Personality Test</h1>'))
})

// Example of testing via DOM checking
test('Route / exists and renders HTML with CSS applied', async (t) => {
  const { nuxt } = t.context
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Close the Nuxt server
test.after('Closing server', (t) => {
  const { nuxt } = t.context
  nuxt.close()
})
