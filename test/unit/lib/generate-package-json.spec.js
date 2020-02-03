const test = require('ava')
const generatePackageJSON = require('../../../lib/generate-package-json.js')

test('generates attachments', t => {
  const result = generatePackageJSON({
    name: 'hello-world'
  })

  t.snapshot(result)
})
