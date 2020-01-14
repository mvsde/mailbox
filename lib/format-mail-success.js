const kleur = require('kleur')

/**
 * Format Nodemailer success message
 * @param {Object} options Function options
 * @param {Object} options.info Nodemailer success info
 * @param {Object} options.info.envelope Nodemailer envelope info
 * @param {Array<String>} options.info.envelope.to Recipients
 * @param {String} options.info.messageId Nodemailer message ID
 * @param {String} options.info.response Nodemailer response
 * @returns {String} Formatted message
 */
function formatMailSuccess (options) {
  return `Email sent.

To: ${kleur.green(options.info.envelope.to)}
ID: ${kleur.green(options.info.messageId)}
Response: ${kleur.green(options.info.response)}`
}

module.exports = formatMailSuccess
