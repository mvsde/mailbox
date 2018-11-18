/**
 * Generate .gitignore contents
 * @returns {String} .gitignore
 */
function generateGitignore () {
  return `# Ignored files and directories
node_modules
dist
`
}

module.exports = generateGitignore
