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
 * @param {Object<string, string>} attachments Attachment paths
 * @returns {Attachment[]} Attachments
 */
module.exports = function (attachments) {
  return Object.keys(attachments)
    .map(name => ({
      filename: attachments[name],
      path: path.join('src/attachments', attachments[name]),
      cid: `${name}@example.com`
    }))
}
