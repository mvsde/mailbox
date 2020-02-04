#!/usr/bin/env node

const { red, yellow } = require('kleur')
const { version } = require('../package.json')
const program = require('commander')

/**
 * Generate path to template
 * @param {string} [layout='default'] Layout name
 * @returns {string} Path to template file
 */
function generateTemplatePath (layout = 'default') {
  return `src/layouts/${layout}.mjml`
}

program
  .version(version)
  .usage('<command> [options]')
  .arguments('*')
  .action(cmd => {
    program.outputHelp()
    console.log(red(`\nUnknown command <${yellow(cmd.args)}>.`))
  })

program
  .command('create [folder]')
  .description('Intialize a new project')
  .requiredOption('--name <project-name>', 'Package.json name field', 'mailbox-project')
  .action((folder, options) => {
    require('../commands/create')({
      folder,
      name: options.name
    })
  })

program
  .command('build [layout]')
  .description('Render MJML template')
  .option('--data <spec,…>', 'Email data')
  .option('--output <path>', 'Output path')
  .action((layout, options) => {
    require('../commands/build')({
      templatePath: generateTemplatePath(layout),
      outputPath: options.output || 'dist/default.html',
      data: options.data
    })
  })

program
  .command('dev [layout]')
  .description('Start dev server with auto-reload')
  .option('--data <spec,…>', 'Email data')
  .action((layout, options) => {
    require('../commands/dev')({
      templatePath: generateTemplatePath(layout),
      data: options.data
    })
  })

program
  .command('test [layout]')
  .description('Send test email')
  .option('--data <spec,…>', 'Email data')
  .option('--from <email>', 'Email sender')
  .requiredOption('--to <email>', 'Email recipient')
  .option('--smtp-host <hostname>', 'SMTP host config')
  .option('--smtp-port <port>', 'SMTP port config')
  .action((layout, options) => {
    require('../commands/test')({
      templatePath: generateTemplatePath(layout),
      data: options.data,
      from: options.from,
      to: options.to,
      smtp: {
        host: options.smtpHost,
        port: options.smtpPort
      }
    })
  })

program.parse(process.argv)

if (program.rawArgs.length < 3) {
  program.help()
}
