const fs = require('fs-extra')
const path = require('path')
const renderMJML = require('../lib/render-mjml')

/**
 * Build and write mail template
 * @param {Object} options Function options
 * @param {String} options.templatePath Path of MJML template
 * @param {String} options.outputPath Path for HTML output
 */
function build (options) {
  const render = renderMJML({ path: options.templatePath })

  if (render.errors.length) {
    console.log(render.errors)
    process.exit(1)
  }

  fs.ensureFileSync(options.outputPath)
  fs.writeFileSync(options.outputPath, render.html)
  fs.copySync(path.join(process.cwd(), 'src/attachments'), path.dirname(options.outputPath))
}

module.exports = build
