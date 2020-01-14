const formatMailSuccess = require('../lib/format-mail-success')
const generateAttachments = require('../lib/generate-attachments')
const getData = require('../lib/get-data')
const log = require('../lib/log')
const renderMJML = require('../lib/render-mjml')
const renderNunjucks = require('../lib/render-nunjucks')
const sendMail = require('../lib/send-mail')

/**
 * Send test email
 * @param {Object} options Function options
 * @param {String} options.templatePath Path of MJML template
 * @param {string} options.data Email data
 * @param {String} options.from Email sender
 * @param {String} options.to Email recipient
 * @param {{host:string, port:string}} [options.smtp] SMTP address
 */
module.exports = function (options) {
  log.info('Rendering MJML…')

  const data = getData({ data: options.data })
  const mjmlOutput = renderMJML({ path: options.templatePath })

  if (mjmlOutput.errors.length) {
    log.error(mjmlOutput.errors)
    process.exit(1)
  }

  log.success('MJML rendered.\n')

  const nunjucksAttachments = {}

  for (const attachment in data.attachments) {
    nunjucksAttachments[attachment] = `cid:${attachment}@example.com`
  }

  const nunjucksOutput = renderNunjucks({
    template: mjmlOutput.html,
    context: {
      ...data,
      attachments: nunjucksAttachments
    }
  })

  const mailAttachments = generateAttachments({
    attachments: data.attachments
  })

  log.info('Sending email…')

  sendMail({
    from: options.from,
    to: options.to,
    subject: data.subject,
    html: nunjucksOutput,
    attachments: mailAttachments,
    smtp: options.smtp
  }, (error, info) => {
    if (error) {
      log.error(error.message)
      process.exit(1)
    }

    log.success(formatMailSuccess({ info }))
  })
}
