const consola = require('consola')
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
  consola.info('Rendering MJML…')

  const render = renderMJML({ path: options.templatePath })
  const attachmentPath = path.join(process.cwd(), 'src/attachments')

  if (render.errors.length) {
    consola.error(render.errors)
    process.exit(1)
  }

  consola.success('MJML rendered.')

  consola.info('Writing HTML file and copying attachments…')

  try {
    fs.ensureFileSync(options.outputPath)
    fs.writeFileSync(options.outputPath, render.html)

    if (fs.existsSync(attachmentPath)) {
      fs.copySync(attachmentPath, path.dirname(options.outputPath))
    }
  } catch (error) {
    consola.error(error.message)
    process.exit(1)
  }

  consola.success('HTML written and attachments copied.')
}

module.exports = build
