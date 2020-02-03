const test = require('ava')
const generateAttachments = require('../../../lib/generate-attachments.js')

test('generates attachments', t => {
  const result = generateAttachments({
    attachments: {
      hello: 'world.png',
      foo: 'bar/baz.jpg'
    }
  })

  t.snapshot(result)
})
