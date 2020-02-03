const path = require('path')

/**
 * Email attachment
 * @typedef {Object} Attachment
 * @property {string} filename Filename
 * @property {string} path Path
 * @property {string} cid Content-ID
 */

/**
 * Generate attachment array for Nodemailer
 * @param {Object} options Function options
 * @param {Object<string, string>} options.attachments Attachment paths
 * @returns {Attachment[]} Attachments
 */
module.exports = function (options) {
  const attachments = []

  for (const attachment in options.attachments) {
    attachments.push({
      filename: options.attachments[attachment],
      path: path.join(process.cwd(), 'src/attachments', options.attachments[attachment]),
      cid: `${attachment}@example.com`
    })
  }

  return attachments
}
