const fs = require('fs-extra')
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
}

module.exports = build
