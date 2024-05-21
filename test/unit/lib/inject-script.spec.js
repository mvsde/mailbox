const test = require("ava");
const injectScript = require("../../../lib/inject-script.js");

test("injects script into HTML", (t) => {
	const result = injectScript({
		html: `
      <html>
        <head>
          <title>Hello World</title>
        </head>
        <body>
          <h1>Hello World</h1>
        </body>
      </html>
    `,
		script: '<script>alert("Hello World")</script>',
	});

	t.snapshot(result);
});
