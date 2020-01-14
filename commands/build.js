const chalk = require('chalk')
const consola = require('consola')
const fs = require('fs')
const path = require('path')

const copyDir = require('../lib/copy-dir')
const getData = require('../lib/get-data')
const renderMJML = require('../lib/render-mjml')
const renderNunjucks = require('../lib/render-nunjucks')

/**
 * Build and write mail template
 * @param {Object} options Function options
 * @param {String} options.templatePath Path of MJML template
 * @param {String} options.outputPath Path for HTML output
 * @param {String} [options.data] Optional email data
 */
function build (options) {
  consola.info('Rendering MJML…')

  const render = renderMJML({ path: options.templatePath })
  const attachmentPath = path.join(process.cwd(), 'src/attachments')

  if (render.errors.length) {
    consola.error(render.errors)
    process.exit(1)
  }

  let html = render.html

  if (options.data) {
    const data = getData({ data: options.data })
    html = renderNunjucks({
      template: html,
      context: data
    })
  }

  consola.success('MJML rendered.')

  consola.info('Writing HTML file and copying attachments…')

  try {
    fs.mkdirSync(path.dirname(options.outputPath), { recursive: true })
    fs.writeFileSync(options.outputPath, html)

    if (fs.existsSync(attachmentPath)) {
      copyDir(attachmentPath, path.dirname(options.outputPath))
    }
  } catch (error) {
    consola.error(error.message)
    process.exit(1)
  }

  consola.success('HTML written and attachments copied.\n')
  consola.info(chalk`Output to {blue ${path.join(process.cwd(), options.outputPath)}}`)
}

module.exports = build
