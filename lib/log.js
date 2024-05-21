const util = require("util");

/**
 * Ensure text is a string
 * @param {Object|string} text Should be a string but maybe it's an object
 * @returns {string} This is definitely a string
 */
function convertText(text) {
	if (typeof text === "object") {
		return util.inspect(text, { colors: true, depth: null });
	}

	return text.trimStart();
}

/**
 * Log info text
 * @param {string} text Text to log
 */
exports.info = function (text) {
	console.log(`ℹ  ${convertText(text)}`);
};

/**
 * Log success text
 * @param {string} text Text to log
 */
exports.success = function (text) {
	console.log(`✅ ${convertText(text)}`);
};

/**
 * Log error text
 * @param {string} text Text to log
 */
exports.error = function error(text) {
	console.log(`❌ ${convertText(text)}`);
};
