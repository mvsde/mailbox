const path = require('path')

/**
 * Generate attachment array for Nodemailer
 * @param {Object} options Function options
 * @param {Object<string, string>} options.attachments Attachment object
 * @returns {Array<{filename: String, path: String, cid: String}>} Attachment array
 */
function generateAttachments (options) {
  const attachments = []

  for (let attachment in options.attachments) {
    attachments.push({
      filename: options.attachments[attachment],
      path: path.join(process.cwd(), 'src/attachments', options.attachments[attachment]),
      cid: `${attachment}@example.com`
    })
  }

  return attachments
}

module.exports = generateAttachments
