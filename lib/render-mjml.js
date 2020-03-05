const fs = require('fs')
const mjml = require('mjml')

const log = require('./log')

/**
 * Render MJML string to HTML
 * @param {Object} options Function options
 * @param {string} options.path MJML template path
 */
module.exports = function (options) {
  try {
    const template = fs.readFileSync(options.path).toString()

    const mjmlOptions = {
      filePath: options.path,
      useMjmlConfigOptions: true
    }

    return mjml(template, mjmlOptions)
  } catch (error) {
    log.error(error)
    process.exit(1)
  }
}
