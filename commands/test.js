const formatMailSuccess = require("../lib/format-mail-success.js");
const generateAttachments = require("../lib/generate-attachments.js");
const getData = require("../lib/get-data.js");
const log = require("../lib/log.js");
const renderMJML = require("../lib/render-mjml.js");
const renderNunjucks = require("../lib/render-nunjucks.js");
const sendMail = require("../lib/send-mail.js");

/**
 * Send test email
 * @param {Object} options
 * @param {string} options.templatePath Path of MJML template
 * @param {string} options.data Email data
 * @param {string} options.from Email sender
 * @param {string} options.to Email recipient
 * @param {{host:string, port:string}} [options.smtp] SMTP address
 */
module.exports = function ({ templatePath, data, from, to, smtp }) {
	log.info("Rendering MJML…");

	const dataSpec = getData(data);
	const mjmlOutput = renderMJML({ filePath: templatePath });

	if (mjmlOutput.errors.length) {
		log.error(mjmlOutput.errors);
		process.exit(1);
	}

	log.success("MJML rendered.\n");

	const nunjucksAttachments = {};

	for (const attachment in dataSpec.attachments) {
		nunjucksAttachments[attachment] = `cid:${attachment}@example.com`;
	}

	const nunjucksOutput = renderNunjucks({
		template: mjmlOutput.html,
		context: { ...dataSpec, attachments: nunjucksAttachments },
	});

	log.info("Sending email…");

	sendMail(
		{
			from,
			to,
			subject: dataSpec.subject,
			html: nunjucksOutput,
			attachments: generateAttachments(dataSpec.attachments),
			smtp,
		},
		(error, info) => {
			if (error) {
				log.error(error.message);
				process.exit(1);
			}

			log.success(formatMailSuccess(info));
		},
	);
};
