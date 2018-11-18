const fs = require('fs-extra')
const generateGitignore = require('../lib/generate-gitignore')
const generatePackageJSON = require('../lib/generate-package-json')
const path = require('path')

/**
 * Create new project
 * @param {Object} options Function options
 * @param {String} options.folder Create project in this folder
 * @param {String} options.name Project name
 */
function create (options) {
  const inputPath = path.join(__dirname, '../template')
  const outputPath = path.join(process.cwd(), options.folder)

  fs.copySync(inputPath, outputPath)

  const gitignore = generateGitignore()
  const packageJSON = generatePackageJSON({ name: options.name })

  fs.writeFileSync(path.join(outputPath, '.gitignore'), gitignore)
  fs.writeFileSync(path.join(outputPath, 'package.json'), packageJSON)
}

module.exports = create
