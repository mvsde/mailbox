const chalk = require('chalk')
const chokidar = require('chokidar')
const consola = require('consola')
const express = require('express')
const generateWebSocketScript = require('../lib/generate-weboscket-script')
const getData = require('../lib/get-data')
const getPort = require('../lib/get-port')
const injectScript = require('../lib/inject-script')
const renderMJML = require('../lib/render-mjml')
const renderNunjucks = require('../lib/render-nunjucks')
const WebSocket = require('ws')

/**
 * Start dev server with auto-reload
 * @param {Object} options Function options
 * @param {Number} [options.port=3000] Server port
 * @param {String} options.templatePath Path of MJML template
 * @param {String} [options.data] Optional email data
 */
async function dev (options) {
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

  const server = express()
  const socket = new WebSocket.Server({ port: socketPort })

  const socketScript = generateWebSocketScript({ port: socketPort })

  server.use(express.static('src/attachments'))

  server.get('/', (request, response) => {
    const mjmlOutput = renderMJML({ path: options.templatePath })

    if (mjmlOutput.errors.length) {
      consola.error(mjmlOutput.errors)
      response.status(500).end()
      return
    }

    const injectOutput = injectScript({
      html: mjmlOutput.html,
      script: socketScript
    })

    if (!options.data) {
      return response.send(injectOutput)
    }

    const data = getData({ data: options.data })
    const nunjucksOutput = renderNunjucks({
      template: injectOutput,
      context: data
    })

    response.send(nunjucksOutput)
  })

  server.listen(serverPort)

  consola.info(chalk`Development server running at {blue http://localhost:${serverPort}}`)

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

module.exports = dev
