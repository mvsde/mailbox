const path = require('path')

/**
 * Generate attachment array for Nodemailer
 * @param {Object} options Function options
 * @param {Object<string, string>} options.attachments Attachment object
 * @returns {Array<{filename: String, path: String, cid: String}>} Attachment array
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
