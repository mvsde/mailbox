const { blue } = require('kleur')
const fs = require('fs')
const path = require('path')

const copyDir = require('../lib/copy-dir')
const formatMJMLError = require('../lib/format-mjml-error')
const getData = require('../lib/get-data')
const log = require('../lib/log')
const renderMJML = require('../lib/render-mjml')
const renderNunjucks = require('../lib/render-nunjucks')

/**
 * Build and write mail template
 * @param {Object} options Function options
 * @param {string} options.templatePath Path of MJML template
 * @param {string} options.outputPath Path for HTML output
 * @param {string} [options.data] Optional email data
 */
module.exports = function (options) {
  log.info('Rendering MJML…')

  const render = renderMJML({ path: options.templatePath })
  const attachmentPath = path.join(process.cwd(), 'src/attachments')

  if (render.errors.length) {
    log.error(formatMJMLError(render.errors))
    process.exit(1)
  }

  let html = render.html

  if (options.data) {
    html = renderNunjucks({
      template: html,
      context: getData(options.data)
    })
  }

  log.success('MJML rendered.\n')

  log.info('Writing HTML file and copying attachments…')

  try {
    fs.mkdirSync(path.dirname(options.outputPath), { recursive: true })
    fs.writeFileSync(options.outputPath, html)

    if (fs.existsSync(attachmentPath)) {
      copyDir(attachmentPath, path.dirname(options.outputPath))
    }
  } catch (error) {
    log.error(error.message)
    process.exit(1)
  }

  log.success('HTML written and attachments copied.\n')
  log.info(`Output to ${blue(path.join(process.cwd(), options.outputPath))}`)
}
