const chokidar = require('chokidar')
const express = require('express')
const generateWebSocketScript = require('../lib/generate-weboscket-script')
const getPort = require('../lib/get-port')
const injectScript = require('../lib/inject-script')
const renderMJML = require('../lib/render-mjml')
const WebSocket = require('ws')

/**
 * Start dev server with hot reload
 * @param {Object} options Function options
 * @param {Number} [options.port=3000] Server port
 * @param {String} options.templatePath Path of MJML template
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

  const serverPort = await getPort(options.port || 3000)
  const socketPort = await getPort(serverPort + 1)

  const server = express()
  const socket = new WebSocket.Server({ port: socketPort })

  const socketScript = generateWebSocketScript({ port: socketPort })

  server.get('/', (request, response) => {
    const render = renderMJML({ path: options.templatePath })

    if (render.errors.length) {
      console.log(render.errors)
      response.status(500).end()
      return
    }

    const html = injectScript({ html: render.html, script: socketScript })

    response.send(html)
  })

  server.listen(serverPort)

  console.log(`Server running at http://localhost:${serverPort}`)

  chokidar
    .watch(`src/**/*.mjml`, { ignoreInitial: true })
    .on('all', () => {
      socket.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('window-reload')
        }
      })
    })
}

module.exports = dev
