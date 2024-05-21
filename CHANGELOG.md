# [0.10.0](https://github.com/mvsde/mailbox/compare/v0.9.0...v0.10.0) (2024-05-21)



# [0.9.0](https://github.com/mvsde/mailbox/compare/v0.8.6...v0.9.0) (2021-06-18)


### Code Refactoring

* Move MJML to peer dependencies ([5569308](https://github.com/mvsde/mailbox/commit/5569308568286c12976508edb1a17cf8adc72bf9))


### BREAKING CHANGES

* MJML is no longer a direct dependency of Mailbox.

Run `npm install mjml` once to add MJML as a dependency to your project. This enables updating MJML independent from new Mailbox versions.



## [0.8.6](https://github.com/mvsde/mailbox/compare/v0.8.5...v0.8.6) (2021-04-07)



## [0.8.5](https://github.com/mvsde/mailbox/compare/v0.8.4...v0.8.5) (2021-02-05)



## [0.8.4](https://github.com/mvsde/mailbox/compare/v0.8.3...v0.8.4) (2021-01-04)



## [0.8.3](https://github.com/mvsde/mailbox/compare/v0.8.2...v0.8.3) (2020-10-05)



## [0.8.2](https://github.com/mvsde/mailbox/compare/v0.8.1...v0.8.2) (2020-09-21)



## [0.8.1](https://github.com/mvsde/mailbox/compare/v0.8.0...v0.8.1) (2020-09-14)



# [0.8.0](https://github.com/mvsde/mailbox/compare/v0.7.2...v0.8.0) (2020-08-12)


### Features

* Switch to The Hippocratic License ([efdb7fd](https://github.com/mvsde/mailbox/commit/efdb7fdcfd2e2696c0fbfd9e825b56cc3ffb7cd4))



## [0.7.2](https://github.com/mvsde/mailbox/compare/v0.7.1...v0.7.2) (2020-06-03)



## [0.7.1](https://github.com/mvsde/mailbox/compare/v0.7.0...v0.7.1) (2020-04-14)



# [0.7.0](https://github.com/mvsde/mailbox/compare/v0.6.1...v0.7.0) (2020-03-05)


### Features

* Use MJML's own config file ([5b4306a](https://github.com/mvsde/mailbox/commit/5b4306a884f16c19769b1ded8e0e0f12fde53d1e))


### BREAKING CHANGES

* The custom `mjml.config.js` will no longer be used. Please use the `.mjmlconfig` instead.



## [0.6.1](https://github.com/mvsde/mailbox/compare/v0.6.0...v0.6.1) (2020-01-16)


### Bug Fixes

* Make error reporting great again (Fix [#2](https://github.com/mvsde/mailbox/issues/2)) ([9c15f1a](https://github.com/mvsde/mailbox/commit/9c15f1aa2af4982e50e66906c6a7ad24df99c22b))
* Remove `sendmail` requirement from readme ([aa43959](https://github.com/mvsde/mailbox/commit/aa43959aa609502f58e9a809f311f4319116f201))



# [0.6.0](https://github.com/mvsde/mailbox/compare/v0.5.3...v0.6.0) (2020-01-14)


### Features

* Add SMTP option to test command ([b0f795b](https://github.com/mvsde/mailbox/commit/b0f795b7cc66b5187f493ecc2c914e35e8c7f224))



## [0.5.3](https://github.com/mvsde/mailbox/compare/v0.5.2...v0.5.3) (2020-01-14)



## [0.5.2](https://github.com/mvsde/mailbox/compare/v0.5.1...v0.5.2) (2019-12-09)


### Bug Fixes

* **template:** Compress readme ([8a96ddc](https://github.com/mvsde/mailbox/commit/8a96ddc6cddf41fc25732070283b7dccfc58551e))



## [0.5.1](https://github.com/mvsde/mailbox/compare/v0.5.0...v0.5.1) (2019-09-17)



# [0.5.0](https://github.com/mvsde/mailbox/compare/v0.4.2...v0.5.0) (2019-08-19)


### Bug Fixes

* **docs:** Add `--` to npm commands ([2668fd5](https://github.com/mvsde/mailbox/commit/2668fd5d33a77333bf02086c07e67dc3e1a96044))


### Features

* Add data flag to build command ([b036bb8](https://github.com/mvsde/mailbox/commit/b036bb8132ae549b5f2425285cb26adb5a516361))



## [0.4.2](https://github.com/mvsde/mailbox/compare/v0.4.1...v0.4.2) (2019-08-07)


### Bug Fixes

* Dependency security issues by updating them ([b7667bb](https://github.com/mvsde/mailbox/commit/b7667bbe68e1325086f2d3b7dac0f24ef991265f))



## [0.4.1](https://github.com/mvsde/mailbox/compare/v0.4.0...v0.4.1) (2019-07-05)



# [0.4.0](https://github.com/mvsde/mailbox/compare/v0.3.4...v0.4.0) (2019-06-14)


### chore

* Update dependencies ([ce288cf](https://github.com/mvsde/mailbox/commit/ce288cf269b25a0b923fc782a23c2242228c2524))


### BREAKING CHANGES

* Node.js v6 is no longer supported.



## [0.3.4](https://github.com/mvsde/mailbox/compare/v0.3.3...v0.3.4) (2019-04-26)



## [0.3.3](https://github.com/mvsde/mailbox/compare/v0.3.2...v0.3.3) (2019-03-21)


### Bug Fixes

* Remove npm shrinkwrap ([0c93fed](https://github.com/mvsde/mailbox/commit/0c93fedd657c55615170c6cce82ba32a8951343b))



## [0.3.2](https://github.com/mvsde/mailbox/compare/v0.3.1...v0.3.2) (2019-01-04)



## [0.3.1](https://github.com/mvsde/mailbox/compare/v0.3.0...v0.3.1) (2018-12-11)


### Bug Fixes

* **build:** Make attachments folder optional ([e29582a](https://github.com/mvsde/mailbox/commit/e29582a139ba9ef651ee8be2e026372e27f33b09))



# [0.3.0](https://github.com/mvsde/mailbox/compare/v0.2.2...v0.3.0) (2018-12-02)


### Bug Fixes

* Improve error logging ([ae535c5](https://github.com/mvsde/mailbox/commit/ae535c5b95dbfffeebda37595a5c7b5e06a187a0))


### Features

* Implement more dynamic email data system ([118443a](https://github.com/mvsde/mailbox/commit/118443a890fbdf57dd4484327fdfbb041753b3df))


### BREAKING CHANGES

* This replaces the previous `--test` flag with `--data`. This accepts not only a single value, but also a comma-separated list.



## [0.2.2](https://github.com/mvsde/mailbox/compare/v0.2.1...v0.2.2) (2018-11-29)


### Bug Fixes

* **license:** Add missing license file ([e8ef7d6](https://github.com/mvsde/mailbox/commit/e8ef7d6284780c3b80161138381714205fe040d1))
* **MJML:** Import correct render function (again) ([280c16f](https://github.com/mvsde/mailbox/commit/280c16f2920a423423230f77e87e3f3e09460f46))



## [0.2.1](https://github.com/mvsde/mailbox/compare/v0.2.0...v0.2.1) (2018-11-19)


### Bug Fixes

* **create:** Install correct dependency in new projects ([d806546](https://github.com/mvsde/mailbox/commit/d806546e674bf29553789901400e470844ce90f7))



# [0.2.0](https://github.com/mvsde/mailbox/compare/v0.1.0...v0.2.0) (2018-11-19)


### Bug Fixes

* **template:** Use correct npm link in footer template ([0df6eef](https://github.com/mvsde/mailbox/commit/0df6eef20a0cda682048b79eebb42f5f899fa37e))


### Features

* Attachment support ([815f995](https://github.com/mvsde/mailbox/commit/815f99591338b176935bad9f45c75fe4a0543b35))
* Improve console logging ([5673789](https://github.com/mvsde/mailbox/commit/56737893750fa578c08346e0cd1ce3b166c5e428))
* Run template through Nunjucks ([71a31aa](https://github.com/mvsde/mailbox/commit/71a31aa118e5f0becc3385f3e35d89bb06e65656))



# [0.1.0](https://github.com/mvsde/mailbox/compare/06c76a6fd95923c4a601ff1a428e564ac3af9bed...v0.1.0) (2018-11-18)


### Features

* Setup ([06c76a6](https://github.com/mvsde/mailbox/commit/06c76a6fd95923c4a601ff1a428e564ac3af9bed))



