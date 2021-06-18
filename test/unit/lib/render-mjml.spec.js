const test = require('ava')
const path = require('path')
const renderMJML = require('../../../lib/render-mjml.js')

test('renders template', t => {
  const filePath = path.join(__dirname, '../fixtures/template.mjml')
  const result = renderMJML({ filePath })

  t.snapshot(result.html)
})
