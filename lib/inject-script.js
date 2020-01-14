/**
 * Inject JavaScript into HTML file before closing </body>
 * @param {Object} options Function options
 * @param {String} options.html HTML file content
 * @param {String} options.script JavaScript to inject
 * @returns {String} HTML with injected JavaScript
 */
module.exports = function (options) {
  if (!options.html) {
    throw new Error('options.html is required')
  }

  if (typeof options.html !== 'string') {
    throw new TypeError('options.html must be of type string')
  }

  if (!options.script) {
    throw new Error('options.script is required')
  }

  if (typeof options.script !== 'string') {
    throw new TypeError('options.script must be of type string')
  }

  return options.html.replace(/(<\/body>)/i, `${options.script}$&`)
}
