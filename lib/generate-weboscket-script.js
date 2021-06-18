/**
 * Generate client script for WebSocket connection
 * @param {Object} options
 * @param {number} options.port WebSocket port
 * @returns {string} <script>…</script> block
 */
module.exports = function ({ port }) {
  return `<script>
  const ws = new WebSocket('ws://localhost:${port}')

  ws.addEventListener('message', event => {
    if (event.data === 'window-reload') {
      window.location.reload()
    }
  })
</script>`
}
