/**
 * Log info text
 * @param {string} text Text to log
 */
function info (text) {
  console.log(`ℹ️  ${text}`)
}

/**
 * Log success text
 * @param {string} text Text to log
 */
function success (text) {
  console.log(`✅ ${text}`)
}

/**
 * Log error text
 * @param {string} text Text to log
 */
function error (text) {
  console.log(`❌ ${text}`)
}

module.exports = {
  info,
  success,
  error
}
