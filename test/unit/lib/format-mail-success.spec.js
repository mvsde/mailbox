const test = require('ava')
const formatMailSuccess = require('../../../lib/format-mail-success.js')

test('formats success', t => {
  const result = formatMailSuccess({
    envelope: {
      to: 'test@example.com'
    },
    messageId: '1337',
    response: 'Everything fine!'
  })

  t.snapshot(result)
})
