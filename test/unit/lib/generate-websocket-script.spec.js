const test = require("ava");
const generateWebSocketScript = require("../../../lib/generate-weboscket-script.js");

test("generates script", (t) => {
	const result = generateWebSocketScript({
		port: 1337,
	});

	t.snapshot(result);
});
