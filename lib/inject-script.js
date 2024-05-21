/**
 * Inject JavaScript into HTML file before closing </body>
 * @param {Object} options
 * @param {string} options.html HTML file content
 * @param {string} options.script JavaScript to inject
 * @returns {string} HTML with injected JavaScript
 */
module.exports = function ({ html, script }) {
	return html.replace(/(<\/body>)/i, `${script}$&`);
};
