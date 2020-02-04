const test = require('ava')
const generateAttachments = require('../../../lib/generate-attachments.js')

test('generates attachments', t => {
  const result = generateAttachments({
    hello: 'world.png',
    foo: 'bar/baz.jpg'
  })

  t.snapshot(result)
})
