/**
 * Generate package.json contents
 * @param {Object} options
 * @param {string} options.name Package.json name field
 * @returns {string} package.json
 */
module.exports = function ({ name }) {
	return JSON.stringify(
		{
			name,
			version: "0.1.0",
			scripts: {
				dev: "mailbox dev",
				build: "mailbox build",
				test: "mailbox test",
			},
		},
		null,
		2,
	);
};
