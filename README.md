# Mail Box

Small wrapper around MJML and Nodemailer for (awesome) HTML emails.


## Installation

1. Install [Node.js](https://nodejs.org)
2. Install Mail Box CLI:

```bash
# npm
npm install -g @mvsde/mailbox

# Yarn
yarn global add @mvsde/mailbox
```


## New Project

```bash
mailbox create

# Optional sub-folder
mailbox create [folder]
cd folder

# Optional name
mailbox create --name <project-name>
```

The folder defaults to the current directory (`.`) and the name to `mailbox-project`.

If you created your project with the optional `folder` argument, don't forget to change to the new folder with `cd folder` before you continue.


## Configuration

Create the optional file `mjml.config.js` in the project root to customize MJML settings.

```js
module.exports = {
  fonts: { /* … */ },
  keepComments: true,
  beautify: false,
  minify: false,
  validationLevel: 'soft'
}
```

The MJML documentation provides a short [description for all available options](https://mjml.io/documentation/#inside-node-js).


## Project Setup

### Layouts

The file `src/layouts/default.mjml` serves as a base layout for an HTML email. It uses [MJML (Mailjet Markup Language)](https://mjml.io/documentation/) for simpler email markup.

### Includes

The `src/includes`-folder is optional, it can be renamed or removed altogether. The idea behind this folder is to have one location for reusable chunks of markup. With [`<mj-include>`](https://mjml.io/documentation/#mj-include) MJML files can be included in layouts or other includes.

### Attachments

Files in the folder `src/attachments` can be referenced in a data specification. Nodemailer attaches these to the mail and provides a `cid` so images can be loaded from the attachments. The contents of the attachment folder will be copied as-is to the output during build time.

### Data

The `data` folder has to contain at least a `default.json` file which serves as the base data specification. You can create more JSON data files, but they always need a `default.json` to extend.

The data file content is passed to Nunjucks as a context. This allows the use of [Nunjucks templating features](https://mozilla.github.io/nunjucks/templating.html) to enhance the development and testing phase.

The special `attachments`-key in a data file will be transformed to allow static file linking during development and `cid`-attachment linking in test emails.

```json
{
  "attachments": {
    "name": "filename.ext"
  }
}
```

The attachment is available as `{{ attachments.name }}` within the email template. The value is the filename of the attachment relative to the `src/attachments` directory.


## Development

You can start a development server with auto-reload using the following command:

```bash
mailbox dev

# Optional alternative layout
mailbox dev [layout]

# Optional email data
mailbox dev --data <data-spec,...>
```

The layout defaults to `default` (the `src/layouts/default.mjml` file). The Nunjucks context isn't populated with data by default.

You can specifiy one or more data files with `--data file1,file2,...`. The list will always be prepended with the default data file. The files will be merged from right into left.

**NOTE:** You don't need to specify the full path for data files. The file name without extension is sufficient.


## Test

To send a test email use the following command:

```bash
mailbox test --to <email-address>

# Optional alternative layout
mailbox test [layout] --to <email-address>

# Optional sender address
mailbox test --to <email-address> --from <email-address>

# Optional alternative email data
mailbox test --to <email-address> --data <data-spec,...>
```

Both layout and data default to `default` (the `src/layouts/default.mjml` and `data/default.json` files). A recipient email address has to be specified with `--to info@example.com`, the sender email is optional and defaults to `test@example.com`.

Email data other than default can be specified with `--data file1,file2,...`. The list will always be prepended with the default data file. The files will be merged from right into left.

**NOTE:** You don't need to specify the full path for data files. The file name without extension is sufficient.

**NOTE:** For now, `sendmail` is required for the tests to work. In the future the Nodemailer transporter will be configurable. This will enable sending via SMTP.


## Build

To generate production ready files use this command:

```bash
mailbox build

# Optional alternative layout
mailbox build [layout]

# Optional alternative output location
mailbox build --output <path>
```

The layout defaults to `default` (the `src/layouts/default.mjml` file). The output path can be changed with `--output path/to/output.html`. The full filepath has to be specified.
