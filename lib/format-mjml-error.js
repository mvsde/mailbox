/**
 * MJML error
 * @typedef {Object} MJMLError
 * @property {number} line Code line
 * @property {string} message Error message
 * @property {string} tagName MJML tag with error
 * @property {string} formattedMessage Formatted error message
 */

/**
 * Format MJML error
 * @param {MJMLError[]} errors MJML errors
 */
module.exports = function (errors) {
  return errors
    .map(message => message.formattedMessage)
    .join('\n  ')
}
