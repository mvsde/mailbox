const { version } = require('../package.json')

/**
 * Generate package.json contents
 * @param {Object} options Function options
 * @returns {String} package.json
 */
function generatePackageJSON (options) {
  return JSON.stringify({
    name: options.name,
    description: 'Generate HTML templates with MJML and Nunjucks.',
    version: '0.1.0',
    scripts: {
      dev: 'mailbox dev',
      build: 'mailbox build',
      test: 'mailbox test'
    },
    dependencies: {
      '@mvsde/mailbox': `^${version}`
    }
  }, null, 2)
}

module.exports = generatePackageJSON
