const { blue, green, red } = require('kleur')
const util = require('util')

/**
 * Ensure text is a string
 * @param {any} text Should be a string but maybe it's an object
 * @returns {string} This is definitely a string
 */
const convertText = text => typeof text === 'object'
  ? util.inspect(text, { colors: true, depth: null })
  : text

/**
 * Log info text
 * @param {string} text Text to log
 */
function info (text) {
  console.log(`${blue().bold('i')} ${convertText(text)}`)
}

/**
 * Log success text
 * @param {string} text Text to log
 */
function success (text) {
  console.log(`${green('✔')} ${convertText(text)}`)
}

/**
 * Log error text
 * @param {string} text Text to log
 */
function error (text) {
  console.log(`${red('✖')} ${convertText(text)}`)
}

module.exports = {
  info,
  success,
  error
}
