/**
 * Generate client script for WebSocket connection
 * @param {Object} options Function options
 * @param {Number} options.port WebSocket port
 * @returns {String} <script>…</script> block
 */
module.exports = function (options) {
  return `<script>
    const ws = new WebSocket('ws://localhost:${options.port}')

    ws.addEventListener('message', event => {
      if (event.data === 'window-reload') {
        window.location.reload()
      }
    })
  </script>
  `
}
