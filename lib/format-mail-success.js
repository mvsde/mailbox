const { green } = require('kleur')

/**
 * Sent message info
 *
 * The type annotations provided by `@types/nodemailer` are useless ATM.
 * @todo Use `import('nodemailer').SentMessageInfo` once it has substance.
 *
 * @typedef {Object} MJMLSentMessageInfo
 * @property {Object} envelope Nodemailer envelope info
 * @property {string[]} envelope.to Recipients
 * @property {string} messageId Nodemailer message ID
 * @property {string} response Nodemailer response
 */

/**
 * Format Nodemailer success message
 * @param {MJMLSentMessageInfo} options
 * @returns {string} Formatted message
 */
module.exports = function (options) {
  return `Email sent.

To: ${green(options.envelope.to)}
ID: ${green(options.messageId)}
Response: ${green(options.response)}`
}
