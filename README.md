# Mailbox

Small wrapper around MJML and Nodemailer for (awesome) HTML emails.

## Table of contents

1. [Requirements](#requirements)
2. [Start a new project](#start-a-new-project)
3. [Configuration](#configuration)
4. [Project setup](#project-setup)
   1. [Layouts](#layouts)
   2. [Includes](#includes)
   3. [Attachments](#attachments)
   4. [Data](#data)
5. [Development server](#development-server)
6. [Send test email](#send-test-email)
   1. [SMTP](#smtp)
7. [Build for production](#build-for-production)

## Requirements

* [Node.js](https://nodejs.org)

## Start a new project

```bash
# In current folder
npx @mvsde/mailbox create

# In a sub-folder
npx @mvsde/mailbox create [folder]
cd folder

# With a different name
npx @mvsde/mailbox create --name <project-name>
```

The folder defaults to the current directory (`.`) and the name to `mailbox-project`.

If you created your project with the optional `folder` argument, don't forget to change to the new folder with `cd name-of-your-folder` before you continue.

## Configuration

Edit the optional `.mjmlconfig` in the project root to customize MJML settings:

```json
{
  "options": {
    "fonts": {
      "Font Name": "https://example.com/path/to/font/stylesheet.css"
    },
    "keepComments": true|false,
    "validationLevel": "strict"|"soft"|"skip"
  },
  "packages": []
}
```

The MJML documentation provides a short [description for the available options](https://mjml.io/documentation/#inside-node-js).

## Project setup

### Layouts

The file `src/layouts/default.mjml` serves as a base layout for an HTML email. It uses [MJML (Mailjet Markup Language)](https://mjml.io/documentation/) for simpler email markup.

### Includes

The `src/includes`-folder is optional, it can be renamed or removed altogether. The idea behind this folder is to have one location for reusable chunks of markup. With [`<mj-include>`](https://mjml.io/documentation/#mj-include) MJML files can be included in layouts or other includes.

### Attachments

Files in the folder `src/attachments` can be referenced in a data specification. Nodemailer attaches these to the mail and provides a `cid` so images can be loaded from the attachments. The contents of the attachment folder will be copied as-is to the output during build time.

### Data

The `data` folder has to contain at least a `default.json` file which serves as the base data specification. You can create more JSON data files, but they always need a `default.json` to extend.

The data file content is passed to Nunjucks as a context. This allows the use of [Nunjucks templating features](https://mozilla.github.io/nunjucks/templating.html) to enhance the development and testing phase.

The `attachments`-key in a data file will be transformed to allow static file linking during development and `cid`-attachment linking in test emails.

```json
{
  "attachments": {
    "name": "filename.ext"
  }
}
```

The attachment is available as `{{ attachments.name }}` within the email template. The value is the filename of the attachment relative to the `src/attachments` directory.

## Development server

You can start a development server with auto-reload using the following command:

```bash
npm run dev

# Optional alternative layout
npm run dev -- [layout]

# Optional email data
npm run dev -- --data <data-spec,...>
```

The layout defaults to `default` (the `src/layouts/default.mjml` file). The Nunjucks context isn't populated with data by default.

You can specifiy one or more data files with `--data file1,file2,...`. The list will always be prepended with the default data file. The files will be merged from right into left.

**NOTE:** You don't need to specify the full path for data files. The file name without extension is sufficient.

## Send test email

To send a test email use the following command:

```bash
npm run test -- --to <email-address>

# Optional alternative layout
npm run test -- [layout] --to <email-address>

# Optional sender address
npm run test -- --to <email-address> --from <email-address>

# Optional alternative email data
npm run test -- --to <email-address> --data <data-spec,...>
```

This uses the `sendmail` command of the operating system. See [SMTP](#smtp) on how to use a mail server.

Both layout and data default to `default` (the `src/layouts/default.mjml` and `data/default.json` files). A recipient email address has to be specified with `--to info@example.com`, the sender email is optional and defaults to `test@example.com`.

Email data other than default can be specified with `--data file1,file2,...`. The list will always be prepended with the default data file. The files will be merged from right into left.

**NOTE:** You don't need to specify the full path for data files. The file name without extension is sufficient.

### SMTP

Sending via SMTP is optional and can be enabled with:

```bash
npm run test -- --to <email-address> --smtp.host <smtp-host> --smtp.port <smtp-port>
```

The username and password prompt may be skipped if the mail server allows seding without credentials.

## Build for production

To generate production-ready HTML files use this command:

```bash
npm run build

# Optional alternative layout
npm run build -- [layout]

# Optional alternative output location
npm run build -- --output <path>

# Optional email data
npm run build -- --data <data-spec,...>
```

The layout defaults to `default` (the `src/layouts/default.mjml` file). The output path can be changed with `--output path/to/output.html`. The full filepath has to be specified.

You can specifiy one or more data files with `--data file1,file2,...`. The list will always be prepended with the default data file. The files will be merged from right into left.

**NOTE:** You don't need to specify the full path for data files. The file name without extension is sufficient.
