const test = require('ava')
const generateGitignore = require('../../../lib/generate-gitignore.js')

test('generates attachments', t => {
  const result = generateGitignore()

  t.snapshot(result)
})
