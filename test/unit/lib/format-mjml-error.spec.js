const test = require("ava");
const formatMJMLError = require("../../../lib/format-mjml-error.js");

test("formats error", (t) => {
	const result = formatMJMLError([
		{ formattedMessage: "Error 1" },
		{ formattedMessage: "Error 2" },
	]);

	t.snapshot(result);
});
