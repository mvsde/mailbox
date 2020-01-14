const nodemailer = require('nodemailer')

/**
 * Send a HTML email
 * @param {Object} options Function options
 * @param {String} options.from Sender email address
 * @param {String} options.to Email recipient
 * @param {String} options.subject Email subject
 * @param {String} options.text Raw text alternative
 * @param {String} options.html HTML email body
 * @param {String} options.attachments Email attachments
 */
module.exports = function (options, callback) {
  if (!options.from) {
    throw new Error('options.from is required')
  }

  if (typeof options.from !== 'string') {
    throw new TypeError('options.from must be of type string')
  }

  if (!options.to) {
    throw new Error('options.to is required')
  }

  if (typeof options.to !== 'string') {
    throw new TypeError('options.to must be of type string')
  }

  if (options.attachments.length && !Array.isArray(options.attachments)) {
    throw new TypeError('options.attachments must be of type array')
  }

  const transporter = nodemailer.createTransport({ sendmail: true })

  transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments
  }, callback)
}
