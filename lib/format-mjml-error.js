/**
 * MJML error type
 * @typedef {Object} MJMLError
 * @property {number} line
 * @property {string} message
 * @property {string} tagName
 * @property {string} formattedMessage
 */

/**
 * Format MJML error
 * @param {MJMLError[]} errors MJML errors
 */
module.exports = function (errors) {
  return errors.map(message => message.formattedMessage).join('\n  ')
}
