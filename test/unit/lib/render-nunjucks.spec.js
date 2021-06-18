const test = require('ava')
const renderNunjucks = require('../../../lib/render-nunjucks.js')

test('renders template', t => {
  const template = '<h1>{{ title }}</h1>'
  const context = { title: 'Hello World' }

  const result = renderNunjucks({ template, context })

  t.snapshot(result)
})
