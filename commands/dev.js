const { blue } = require("kleur");
const chokidar = require("chokidar");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

const formatMJMLError = require("../lib/format-mjml-error.js");
const generateWebSocketScript = require("../lib/generate-weboscket-script.js");
const getData = require("../lib/get-data.js");
const getPort = require("../lib/get-port.js");
const injectScript = require("../lib/inject-script.js");
const log = require("../lib/log.js");
const renderMJML = require("../lib/render-mjml.js");
const renderNunjucks = require("../lib/render-nunjucks.js");

/**
 * Start dev server with auto-reload
 * @param {Object} options
 * @param {number} [options.port=3000] Server port
 * @param {string} options.templatePath Path of MJML template
 * @param {string} [options.data] Optional email data
 */
module.exports = async function ({ port = 3000, templatePath, data }) {
	const serverPort = await getPort(port);
	const socketPort = await getPort(serverPort + 1);
	const socket = new WebSocket.Server({ port: socketPort });
	const socketScript = generateWebSocketScript({ port: socketPort });

	const requestHandler = (request, response) => {
		// Handle file requests
		if (request.url !== "/") {
			const file = `${process.cwd()}/src/attachments${request.url}`;

			try {
				const data = fs.readFileSync(file);
				response.end(data);
			} catch (error) {
				if (error) {
					response.statusCode = 404;
					response.end();
				}
			}

			return;
		}

		// Handle HTML request
		const mjmlOutput = renderMJML({ filePath: templatePath });

		if (mjmlOutput.errors.length) {
			log.error(formatMJMLError(mjmlOutput.errors));
			response.statusCode = 500;
			response.end();
			return;
		}

		const injectOutput = injectScript({
			html: mjmlOutput.html,
			script: socketScript,
		});

		if (!data) {
			response.end(injectOutput);
			return;
		}

		const nunjucksOutput = renderNunjucks({
			template: injectOutput,
			context: getData(data),
		});

		response.end(nunjucksOutput);
	};

	const server = http.createServer(requestHandler);

	server.listen(serverPort, (error) => {
		if (error) {
			log.error(error);
			return;
		}

		log.info(
			`Development server running at ${blue("http://localhost:" + serverPort)}`,
		);
	});

	const watcher = chokidar.watch(["./src", "./data"], { ignoreInitial: true });

	watcher.on("all", () => {
		for (const client of socket.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send("window-reload");
			}
		}
	});
};
