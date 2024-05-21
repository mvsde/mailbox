const fs = require("fs");
const path = require("path");

/**
 * Copy directory (similar to `cp -r`)
 * @param {string} src Source path
 * @param {string} dest Destination path
 */
module.exports = function copyDir(src, dest) {
	fs.readdirSync(src).forEach((file) => {
		const filePath = path.join(src, file);
		const fileDest = path.join(dest, file);

		const fileStats = fs.lstatSync(filePath);

		if (fileStats.isDirectory()) {
			fs.mkdirSync(fileDest, { recursive: true });
			copyDir(filePath, fileDest);
		} else {
			fs.copyFileSync(filePath, fileDest);
		}
	});
};
