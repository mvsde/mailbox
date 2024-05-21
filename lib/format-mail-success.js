const { green } = require("kleur");

/**
 * Sent message info
 *
 * The type annotations provided by `@types/nodemailer` are useless ATM.
 * @todo Use `import('nodemailer').SentMessageInfo` once it has substance.
 *
 * @typedef {Object} MJMLSentMessageInfo
 * @property {Object} envelope Nodemailer envelope info
 * @property {string[]} envelope.to Recipients
 * @property {string} messageId Nodemailer message ID
 * @property {string} response Nodemailer response
 */

/**
 * Format Nodemailer success message
 * @param {MJMLSentMessageInfo} info
 * @returns {string} Formatted message
 */
module.exports = function (info) {
	return `Email sent.

To: ${green(info.envelope.to.join(", "))}
ID: ${green(info.messageId)}
Response: ${green(info.response)}`;
};
