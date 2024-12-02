const fs = require("fs");
const merge = require("deepmerge");
const path = require("path");

const log = require("./log.js");

/**
 * Generate absolute path to data file
 * @param {string} name Data specification name
 * @returns {string} Path to data file
 */
function generateDataPath(name) {
	return path.join(process.cwd(), `data/${name}.json`);
}

/**
 * Get email data
 * @param {string} [files='default'] Use data from these files
 * @returns {Object} Email data
 */
module.exports = function (files = "default") {
	const specPaths = files.split(",");

	if (specPaths[0] !== "default") {
		specPaths.unshift("default");
	}

	let data = {};

	for (const specPath of specPaths) {
		try {
			const specFile = fs.readFileSync(generateDataPath(specPath), {
				encoding: "utf8",
			});
			const specData = JSON.parse(specFile);

			data = merge(data, specData);
		} catch (error) {
			log.error(error);
			process.exit(1);
		}
	}

	return data;
};
