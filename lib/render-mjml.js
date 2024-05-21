const fs = require("fs");
const mjml = require("mjml");

const log = require("./log.js");

/**
 * Render MJML string to HTML
 * @param {Object} options
 * @param {string} options.filePath MJML template path
 */
module.exports = function ({ filePath }) {
	try {
		const template = fs.readFileSync(filePath).toString();
		const mjmlOptions = { filePath, useMjmlConfigOptions: true };

		return mjml(template, mjmlOptions);
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};
