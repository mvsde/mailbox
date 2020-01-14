const path = require('path')

/**
 * Get MJML config file
 * @returns {Object} MJML options
 */
module.exports = function () {
  try {
    return require(path.join(process.cwd(), 'mjml.config.js'))
  } catch (error) {
    return {}
  }
}
