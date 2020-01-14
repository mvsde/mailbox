const chokidar = require('chokidar')
const fs = require('fs')
const http = require('http')
const kleur = require('kleur')
const WebSocket = require('ws')

const generateWebSocketScript = require('../lib/generate-weboscket-script')
const getData = require('../lib/get-data')
const getPort = require('../lib/get-port')
const injectScript = require('../lib/inject-script')
const log = require('../lib/log')
const renderMJML = require('../lib/render-mjml')
const renderNunjucks = require('../lib/render-nunjucks')

/**
 * Start dev server with auto-reload
 * @param {Object} options Function options
 * @param {Number} [options.port=3000] Server port
 * @param {String} options.templatePath Path of MJML template
 * @param {String} [options.data] Optional email data
 */
module.exports = async function (options) {
  if (!options.templatePath) {
    throw new Error('options.templatePath is required')
  }

  if (typeof options.templatePath !== 'string') {
    throw new TypeError('options.templatePath must be of type string')
  }

  if (options.port && typeof options.port !== 'number') {
    throw new TypeError('options.port must be of type number')
  }

  if (options.data && typeof options.data !== 'string') {
    throw new TypeError('options.data must be of type string')
  }

  const serverPort = await getPort(options.port || 3000)
  const socketPort = await getPort(serverPort + 1)

  const socket = new WebSocket.Server({ port: socketPort })

  const socketScript = generateWebSocketScript({ port: socketPort })

  const requestHandler = (request, response) => {
    // Handle file requests
    if (request.url !== '/') {
      const file = `${process.cwd()}/src/attachments${request.url}`

      try {
        const data = fs.readFileSync(file)
        response.end(data)
      } catch (error) {
        if (error) {
          response.statusCode = 404
          response.end()
        }
      }

      return
    }

    // Handle HTML request
    const mjmlOutput = renderMJML({ path: options.templatePath })

    if (mjmlOutput.errors.length) {
      log.error(mjmlOutput.errors)
      response.statusCode = 500
      response.end()
      return
    }

    const injectOutput = injectScript({
      html: mjmlOutput.html,
      script: socketScript
    })

    if (!options.data) {
      return response.end(injectOutput)
    }

    const data = getData({ data: options.data })
    const nunjucksOutput = renderNunjucks({
      template: injectOutput,
      context: data
    })

    response.end(nunjucksOutput)
  }

  const server = http.createServer(requestHandler)

  server.listen(serverPort, error => {
    if (error) {
      return log.error(error)
    }

    log.info(`Development server running at ${kleur.blue('http://localhost:' + serverPort)}`)
  })

  chokidar
    .watch(['src/**/*.mjml', 'data/*.json'], { ignoreInitial: true })
    .on('all', () => {
      socket.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('window-reload')
        }
      })
    })
}
