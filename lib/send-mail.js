const nodemailer = require('nodemailer')
const prompts = require('prompts')

/**
 * Send a HTML email
 * @param {Object} options Function options
 * @param {string} options.from Sender email address
 * @param {string} options.to Email recipient
 * @param {string} options.subject Email subject
 * @param {string} options.text Raw text alternative
 * @param {string} options.html HTML email body
 * @param {string} options.attachments Email attachments
 * @param {{host:string, port:string}} [options.smtp] SMTP address
 */
module.exports = async function (options, callback) {
  const response = await prompts([
    {
      type: options.smtp && 'text',
      name: 'username',
      message: 'SMTP username'
    },
    {
      type: options.smtp && 'password',
      name: 'password',
      message: 'SMTP password'
    }
  ])

  const transporterOptions = {}

  if (options.smtp) {
    transporterOptions.host = options.smtp.host
    transporterOptions.port = options.smtp.port

    // Allow sending without username or password.
    if (response.username && response.password) {
      transporterOptions.auth = {
        user: response.username,
        pass: response.password
      }
    }
  } else {
    transporterOptions.sendmail = true
  }

  const transporter = nodemailer.createTransport(transporterOptions)

  transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments
  }, callback)
}
