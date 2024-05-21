const test = require("ava");
const getPort = require("../../../lib/get-port.js");

test("finds unused port", async (t) => {
	const expected = 1337;
	const result = await getPort(expected);

	t.is(result, expected);
});
