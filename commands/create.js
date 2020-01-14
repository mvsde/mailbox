const chalk = require('chalk')
const consola = require('consola')
const fs = require('fs')
const path = require('path')

const copyDir = require('../lib/copy-dir')
const generateGitignore = require('../lib/generate-gitignore')
const generatePackageJSON = require('../lib/generate-package-json')

/**
 * Create new project
 * @param {Object} options Function options
 * @param {String} options.folder Create project in this folder
 * @param {String} options.name Project name
 */
function create (options) {
  const inputPath = path.join(__dirname, '../template')
  const outputPath = path.join(process.cwd(), options.folder)

  consola.info('Copying template…')

  try {
    fs.mkdirSync(outputPath, { recursive: true })
    copyDir(inputPath, outputPath)
  } catch (error) {
    consola.error(error.message)
    process.exit(1)
  }

  consola.success('Template copied.')

  consola.info('Generating .gitignore and package.json…')

  const gitignore = generateGitignore()
  const packageJSON = generatePackageJSON({ name: options.name })

  try {
    fs.writeFileSync(path.join(outputPath, '.gitignore'), gitignore)
    fs.writeFileSync(path.join(outputPath, 'package.json'), packageJSON)
  } catch (error) {
    consola.error(error.message)
    process.exit(1)
  }

  consola.success('.gitignore and package.json generated.')

  console.log(chalk`\nPlease run {blue npm install} or {blue yarn install} within the project folder to download dependencies.\n`)
}

module.exports = create
