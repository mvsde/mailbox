const { blue } = require('kleur')
const fs = require('fs')
const path = require('path')

const copyDir = require('../lib/copy-dir')
const generateGitignore = require('../lib/generate-gitignore')
const generatePackageJSON = require('../lib/generate-package-json')
const log = require('../lib/log')

/**
 * Create new project
 * @param {Object} options Function options
 * @param {String} options.folder Create project in this folder
 * @param {String} options.name Project name
 */
module.exports = function (options) {
  const inputPath = path.join(__dirname, '../template')
  const outputPath = path.join(process.cwd(), options.folder)

  log.info('Copying template…')

  try {
    fs.mkdirSync(outputPath, { recursive: true })
    copyDir(inputPath, outputPath)
  } catch (error) {
    log.error(error.message)
    process.exit(1)
  }

  log.success('Template copied.\n')

  log.info('Generating .gitignore and package.json…')

  const gitignore = generateGitignore()
  const packageJSON = generatePackageJSON({ name: options.name })

  try {
    fs.writeFileSync(path.join(outputPath, '.gitignore'), gitignore)
    fs.writeFileSync(path.join(outputPath, 'package.json'), packageJSON)
  } catch (error) {
    log.error(error.message)
    process.exit(1)
  }

  log.success('.gitignore and package.json generated.\n')

  console.log('Next steps:\n')
  console.log(`  ${blue('cd')} "${outputPath}"`)
  console.log(`  ${blue('npm')} install`)
}
