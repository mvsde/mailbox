const path = require('path')

/**
 * Get MJML config file
 * @returns {Object} MJML options
 */
function getConfig () {
  try {
    return require(path.join(process.cwd(), 'mjml.config.js'))
  } catch (error) {
    return {}
  }
}

module.exports = getConfig
