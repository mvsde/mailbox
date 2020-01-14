/**
 * Inject JavaScript into HTML file before closing </body>
 * @param {Object} options Function options
 * @param {String} options.html HTML file content
 * @param {String} options.script JavaScript to inject
 * @returns {String} HTML with injected JavaScript
 */
module.exports = function (options) {
  return options.html.replace(/(<\/body>)/i, `${options.script}$&`)
}
