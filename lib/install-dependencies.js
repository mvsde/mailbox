const { execSync } = require('child_process')

module.exports = function ({ directory }) {
  const previousDirectory = process.cwd()
  process.chdir(directory)

  execSync('npm install @mvsde/mailbox mjml', { stdio: 'inherit' })

  process.chdir(previousDirectory)
}
