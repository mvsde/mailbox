const path = require("path");

/** @import { Attachment } from "nodemailer/lib/mailer" */

/**
 * Generate attachment array for Nodemailer
 * @param {Record<string, string>} [attachments] Attachment paths
 * @returns {Attachment[]} Attachments
 */
module.exports = function (attachments) {
	if (!attachments) {
		return [];
	}

	return Object.keys(attachments).map((name) => ({
		filename: attachments[name],
		path: path.join("src/attachments", attachments[name]),
		cid: `${name}@example.com`,
	}));
};
