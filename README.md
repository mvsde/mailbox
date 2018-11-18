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
mailbox create <folder>
```


## Configuration

Create the file `mjml.config.js` in the project root to customize MJML options.

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
