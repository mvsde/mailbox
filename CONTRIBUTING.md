# Contributing

## Getting started

Optionally choose the correct Node.js version with [nvm](https://nvm.sh/) installed:

```sh
nvm use
```

Install dependencies with:

```sh
npm install
```

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, so an automatic changelog can be generated.

## Run linter

```sh
npm run lint
```

## Run test

The tests are written with the [AVA test runner](https://github.com/avajs/ava).

```sh
npm run test
```

## Format code

```sh
npm run format
```

## Create release

Bump the package version and generate a changelog:

```sh
npm version …
```

See [npm version docs](https://docs.npmjs.com/cli/commands/npm-version) for all available arguments.

Publish the new version with:

```sh
npm publish
```
