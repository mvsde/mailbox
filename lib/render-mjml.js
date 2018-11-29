const fs = require('fs-extra')
const getConfig = require('./get-config')
const mjml = require('mjml')

/**
 * Render MJML string to HTML
 * @param {Object} options Function options
 * @param {String} options.path MJML template path
 */
function renderMJML (options) {
  if (!options.path) {
    throw new Error('options.path is required')
  }

  if (typeof options.path !== 'string') {
    throw new TypeError('options.path must be of type string')
  }

  const template = fs.readFileSync(options.path).toString()
  const mjmlOptions = getConfig()

  mjmlOptions.filePath = options.path

  return mjml(template, mjmlOptions)
}

module.exports = renderMJML
