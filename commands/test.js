const renderMJML = require('../lib/render-mjml')
const sendMail = require('../lib/send-mail')

/**
 * Send test email
 * @param {Object} options Function options
 * @param {String} options.templatePath Path of MJML template
 * @param {String} options.from Email sender
 * @param {String} options.to Email recipient
 */
function test (options) {
  const render = renderMJML({ path: options.templatePath })

  if (render.errors.length) {
    console.log(render.errors)
    process.exit(1)
  }

  sendMail({
    from: options.from,
    to: options.to,
    html: render.html
  })
}

module.exports = test
