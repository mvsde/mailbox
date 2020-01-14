const { blue, green, red } = require('kleur')

/**
 * Log info text
 * @param {string} text Text to log
 */
function info (text) {
  console.log(`${blue().bold('i')} ${text}`)
}

/**
 * Log success text
 * @param {string} text Text to log
 */
function success (text) {
  console.log(`${green('✔')} ${text}`)
}

/**
 * Log error text
 * @param {string} text Text to log
 */
function error (text) {
  console.log(`${red('✖')} ${text}`)
}

module.exports = {
  info,
  success,
  error
}
