const fs = require('fs')
const mjml = require('mjml')

const getConfig = require('./get-config')
const log = require('./log')

/**
 * Render MJML string to HTML
 * @param {Object} options Function options
 * @param {String} options.path MJML template path
 */
module.exports = function (options) {
  if (!options.path) {
    throw new Error('options.path is required')
  }

  if (typeof options.path !== 'string') {
    throw new TypeError('options.path must be of type string')
  }

  try {
    const template = fs.readFileSync(options.path).toString()
    const mjmlOptions = getConfig()

    mjmlOptions.filePath = options.path

    return mjml(template, mjmlOptions)
  } catch (error) {
    log.error(error)
    process.exit(1)
  }
}
