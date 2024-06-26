const path = require("path");

/**
 * Generate attachment array for Nodemailer
 * @param {Object<string, string>} attachments Attachment paths
 * @returns {import("nodemailer/lib/mailer").Attachment[]} Attachments
 */
module.exports = function (attachments) {
	return Object.keys(attachments).map((name) => ({
		filename: attachments[name],
		path: path.join("src/attachments", attachments[name]),
		cid: `${name}@example.com`,
	}));
};
