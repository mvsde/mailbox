const nunjucks = require("nunjucks");

/**
 * Render Nunjucks with optional context
 * @param {Object} options
 * @param {string} options.template Nunjucks template
 * @param {string} [options.context] Optional context data
 * @returns {string} Rendered template
 */
module.exports = function ({ template, context }) {
	nunjucks.configure({ autoescape: false });
	return nunjucks.renderString(template, context);
};
