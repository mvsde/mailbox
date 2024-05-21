const { createTransport } = require("nodemailer");
const prompts = require("prompts");

/**
 * Send a HTML email
 * @param {Object} options
 * @param {string} options.from Sender email address
 * @param {string} options.to Email recipient
 * @param {string} options.subject Email subject
 * @param {string} options.text Raw text alternative
 * @param {string} options.html HTML email body
 * @param {import("nodemailer/lib/mailer").Attachment[]} options.attachments Email attachments
 * @param {{host?: string, port?: string}} options.smtp SMTP address
 */
module.exports = async function (
	{ from, to, subject, text, html, attachments, smtp },
	callback,
) {
	const transporterOptions = {};

	if (smtp.host && smtp.port) {
		const response = await prompts([
			{
				type: "text",
				name: "username",
				message: "SMTP username",
			},
			{
				type: "password",
				name: "password",
				message: "SMTP password",
			},
		]);

		transporterOptions.host = smtp.host;
		transporterOptions.port = smtp.port;

		// Allow sending without username or password.
		if (response.username && response.password) {
			transporterOptions.auth = {
				user: response.username,
				pass: response.password,
			};
		}
	} else {
		transporterOptions.sendmail = true;
	}

	const transporter = createTransport(transporterOptions);
	transporter.sendMail(
		{ from, to, subject, text, html, attachments },
		callback,
	);
};
