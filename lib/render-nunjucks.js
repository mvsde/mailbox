const nunjucks = require('nunjucks')

/**
 * Render Nunjucks with optional context
 * @param {Object} options Function options
 * @param {String} options.template Nunjucks template
 * @param {String} [options.context] Optional context data
 * @returns {String} Rendered template
 */
module.exports = function (options) {
  if (!options.template) {
    throw new Error('options.template is required')
  }

  if (typeof options.template !== 'string') {
    throw new TypeError('options.template must be of type string')
  }

  nunjucks.configure({ autoescape: false })
  return nunjucks.renderString(options.template, options.context)
}
