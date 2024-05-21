const { blue } = require("kleur");
const fs = require("fs");
const path = require("path");

const copyDir = require("../lib/copy-dir.js");
const formatMJMLError = require("../lib/format-mjml-error.js");
const getData = require("../lib/get-data.js");
const log = require("../lib/log.js");
const renderMJML = require("../lib/render-mjml.js");
const renderNunjucks = require("../lib/render-nunjucks.js");

/**
 * Build and write mail template
 * @param {Object} options
 * @param {string} options.templatePath Path of MJML template
 * @param {string} options.outputPath Path for HTML output
 * @param {string} [options.data] Optional email data
 */
module.exports = function ({ templatePath, outputPath, data }) {
	log.info("Rendering MJML…");

	const render = renderMJML({ filePath: templatePath });
	const attachmentPath = path.join(process.cwd(), "src/attachments");

	if (render.errors.length) {
		log.error(formatMJMLError(render.errors));
		process.exit(1);
	}

	let html = render.html;

	if (data) {
		html = renderNunjucks({
			template: html,
			context: getData(data),
		});
	}

	log.success("MJML rendered.\n");

	try {
		log.info("Writing HTML and copying attachments…");

		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, html);

		if (fs.existsSync(attachmentPath)) {
			copyDir(attachmentPath, path.dirname(outputPath));
		}

		log.success("HTML written and attachments copied.\n");
	} catch (error) {
		log.error(error.message);
		process.exit(1);
	}

	console.log(`Output to ${blue(path.join(process.cwd(), outputPath))}`);
};
