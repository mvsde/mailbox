#!/usr/bin/env node

/**
 * Generate path to template
 * @param {String} layout Layout name
 * @returns {String} Path to template file
 */
function generateTemplatePath (layout) {
  return `src/layouts/${layout}.mjml`
}

/**
 * Generate path to output
 * @param {String} output Specific output path
 * @param {String} layout Layout name for fallback path
 * @returns {String} Path to output file
 */
function generateOutputPath (output, layout) {
  return output || `dist/${layout}.html`
}

const build = {
  command: 'build [layout]',
  desc: 'Render MJML template',
  builder (yargs) {
    yargs
      .positional('layout', {
        describe: 'Email layout',
        default: 'default',
        type: 'string'
      })
      .options('data', {
        describe: 'Email data',
        requiresArg: true,
        type: 'string'
      })
      .option('output', {
        alias: 'o',
        describe: 'Output path',
        requiresArg: true,
        type: 'string'
      })
  },
  handler (argv) {
    process.env.NODE_ENV = 'production'

    const templatePath = generateTemplatePath(argv.layout)
    const outputPath = generateOutputPath(argv.output, argv.layout)

    require('../commands/build')({
      templatePath,
      outputPath,
      data: argv.data
    })
  }
}

const create = {
  command: 'create [folder]',
  desc: 'Initialize a new project',
  builder (yargs) {
    yargs
      .positional('folder', {
        describe: 'Create project in this folder',
        default: '.',
        type: 'string'
      })
      .options('name', {
        alias: 'n',
        describe: 'Project name',
        default: 'mailbox-project',
        requiresArg: true,
        type: 'string'
      })
  },
  handler (argv) {
    require('../commands/create')({
      folder: argv.folder,
      name: argv.name
    })
  }
}

const dev = {
  command: 'dev [layout]',
  desc: 'Start dev server with auto-reload',
  builder (yargs) {
    yargs
      .positional('layout', {
        describe: 'Email layout',
        default: 'default',
        type: 'string'
      })
      .options('data', {
        describe: 'Email data',
        requiresArg: true,
        type: 'string'
      })
  },
  handler (argv) {
    process.env.NODE_ENV = 'development'

    const templatePath = generateTemplatePath(argv.layout)

    require('../commands/dev')({
      templatePath,
      data: argv.data
    })
  }
}

const test = {
  command: 'test [layout]',
  desc: 'Send test email',
  builder (yargs) {
    yargs
      .positional('layout', {
        describe: 'Email layout',
        default: 'default',
        type: 'string'
      })
      .options('data', {
        describe: 'Email data',
        default: 'default',
        requiresArg: true,
        type: 'string'
      })
      .options('from', {
        describe: 'Email sender',
        default: 'test@example.com',
        requiresArg: true,
        type: 'string'
      })
      .option('to', {
        describe: 'Email recipient',
        demandOption: true,
        requiresArg: true,
        type: 'string'
      })
      .option('smtp', {
        describe: 'SMTP config',
        requiresArg: true
      })
      .option('smtp.host', {
        describe: 'SMTP host',
        requiresArg: true,
        type: 'string'
      })
      .option('smtp.port', {
        describe: 'SMTP port',
        requiresArg: true,
        type: 'string'
      })
  },
  handler (argv) {
    process.env.NODE_ENV = 'development'

    const templatePath = generateTemplatePath(argv.layout)

    require('../commands/test')({
      templatePath,
      data: argv.data,
      from: argv.from,
      to: argv.to,
      smtp: argv.smtp
    })
  }
}

require('yargs')
  .command(create)
  .command(dev)
  .command(build)
  .command(test)
  .strict(true)
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(true)
  .parse()
