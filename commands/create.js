const { blue } = require("kleur");
const fs = require("fs");
const path = require("path");

const copyDir = require("../lib/copy-dir.js");
const generateGitignore = require("../lib/generate-gitignore.js");
const generatePackageJSON = require("../lib/generate-package-json.js");
const installDependencies = require("../lib/install-dependencies.js");
const log = require("../lib/log.js");

/**
 * Create new project
 * @param {Object} options
 * @param {string} options.folder Create project in this folder
 * @param {string} options.name Project name
 */
module.exports = function ({ folder, name }) {
	const workingDirectory = process.cwd();
	const inputPath = path.join(__dirname, "../template");
	const outputPath = path.join(workingDirectory, folder || ".");

	try {
		log.info("Copying template…");

		fs.mkdirSync(outputPath, { recursive: true });
		copyDir(inputPath, outputPath);

		log.success("Template copied.\n");
	} catch (error) {
		log.error(error.message);
		process.exit(1);
	}

	try {
		log.info("Generating .gitignore and package.json…");

		const gitignore = generateGitignore();
		const packageJSON = generatePackageJSON({ name });

		fs.writeFileSync(path.join(outputPath, ".gitignore"), gitignore);
		fs.writeFileSync(path.join(outputPath, "package.json"), packageJSON);

		log.success(".gitignore and package.json generated.\n");
	} catch (error) {
		log.error(error.message);
		process.exit(1);
	}

	try {
		log.info("Installing dependencies…");

		installDependencies({ directory: outputPath });

		console.log();
		log.success("Dependencies installed.\n");
	} catch {
		console.log();
		log.error("Dependency installation failed.");
		process.exit(1);
	}

	console.log("Next steps:\n");

	if (workingDirectory !== outputPath) {
		console.log(
			`  Go to project folder:  ${blue("cd")} ${path.relative(workingDirectory, outputPath)}`,
		);
	}

	console.log(`  Start dev server:      ${blue("npm")} run dev`);
	console.log(`  Build for production:  ${blue("npm")} run build`);
};
