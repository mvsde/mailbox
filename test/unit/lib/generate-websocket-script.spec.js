const test = require('ava')
const generateWebSocketScript = require('../../../lib/generate-weboscket-script.js')

test('generates attachments', t => {
  const result = generateWebSocketScript({
    port: 1337
  })

  t.snapshot(result)
})
