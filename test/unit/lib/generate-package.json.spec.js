const test = require('ava')
const generatePackageJSON = require('../../../lib/generate-package-json.js')

test('generates package.json', t => {
  const result = generatePackageJSON({ name: 'test' })

  t.snapshot(result)
})
