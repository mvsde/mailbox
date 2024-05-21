#!/usr/bin/env node

const { Command } = require("commander");
const { red, yellow } = require("kleur");
const { version } = require("../package.json");

/**
 * Generate path to template
 * @param {string} [layout='default'] Layout name
 * @returns {string} Path to template file
 */
function generateTemplatePath(layout = "default") {
	return `src/layouts/${layout}.mjml`;
}

const program = new Command();

program.version(version).usage("<command> [options]");

program
	.command("create [folder]")
	.description("Intialize a new project")
	.requiredOption(
		"--name <project-name>",
		"Package.json name field",
		"mailbox-project",
	)
	.action((folder, { name }) => {
		require("../commands/create")({
			folder,
			name,
		});
	});

program
	.command("build [layout]")
	.description("Render MJML template")
	.option("--data <spec,…>", "Email data")
	.option("--output <path>", "Output path")
	.action((layout, { output, data }) => {
		require("../commands/build")({
			templatePath: generateTemplatePath(layout),
			outputPath: output || "dist/default.html",
			data,
		});
	});

program
	.command("dev [layout]")
	.description("Start dev server with auto-reload")
	.option("--data <spec,…>", "Email data")
	.action((layout, { data }) => {
		require("../commands/dev")({
			templatePath: generateTemplatePath(layout),
			data,
		});
	});

program
	.command("test [layout]")
	.description("Send test email")
	.option("--data <spec,…>", "Email data")
	.option("--from <email>", "Email sender")
	.requiredOption("--to <email>", "Email recipient")
	.option("--smtp-host <hostname>", "SMTP host config")
	.option("--smtp-port <port>", "SMTP port config")
	.action((layout, { data, from, to, smtpHost, smtpPort }) => {
		require("../commands/test")({
			templatePath: generateTemplatePath(layout),
			data,
			from,
			to,
			smtp: {
				host: smtpHost,
				port: smtpPort,
			},
		});
	});

program.parse(process.argv);
