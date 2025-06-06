# requirements

[![npm](https://img.shields.io/npm/v/requirements?style=flat-square)](https://www.npmjs.com/package/requirements)
[![coveralls](https://img.shields.io/coveralls/chimurai/requirements.svg?style=flat-square)](https://coveralls.io/r/chimurai/requirements)
[![snyk](https://snyk.io/test/npm/requirements/badge.svg?style=flat-square)](https://snyk.io/test/npm/requirements)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Validate your project's software requirements.

![requirements-screenshot](https://raw.githubusercontent.com/chimurai/requirements/master/docs/requirements.gif)

## install

```bash
$ npm install -D requirements
```

```bash
$ yarn add --dev requirements
```

## setup

Scaffold a new `requirements.config.mjs` configuration file

```bash
$ npx requirements --init
```

## config

Configure the `requirements.config.mjs` file in your project root.

```js
export default {
  software: {
    node: '*',
    yarn: '~1.17.3',
    nginx: {
      semver: '>= 1.16.x',
      optional: true, // optional (won't fail)
      installMessage: '<install instruction>', // custom message when binary is not found
      updateMessage: '<update instruction>', // custom message when binary has wrong version
    },
    httpd: {
      semver: '^1.x',
      flag: '-v', // custom version flag
    },
  },
  // custom functions to verify requirements which are not related to software versions
  // see ./tests/custom-check-ssh.config.mjs for an example
  custom: {
    'Example title for custom requirements check', {
      fn: () => { throw new Error('throw Error when requirement not met.') },
      errorMessage: 'This error message is shown when the above function throws Error',
    }
  }
};
```

## check requirements

Run `requirements` command in the project root. By default it will try to find the `requirements.config.mjs` file.

```bash
npx requirements
```

Or use a custom path:

```bash
npx requirements --config <filepath>
```

## CLI options

```bash
npx requirements --help
```

```shell
Options:
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
  --init, -i     Create a requirements.config.mjs file
  --config, -c   Path to the configuration file
                                            [default: "requirements.config.mjs"]
  --force, -f    Succeeds even if not all requirements are satisfied
                                                      [boolean] [default: false]
  --quiet, -q    Only output when errors are present                   [boolean]
  --debug        Print raw data                                        [boolean]
```

## require('requirements')

```javascript
const { checkSoftware, renderTable } = require('requirements');

(async () => {
  const result = await checkSoftware({ node: '*' });
  console.log(renderTable(result));
})();
```

checkSoftware() returns an Array with results

```javascript
[
  {
    bin: 'node',
    semver: '*',
    installed: true,
    version: '12.8.1',
    satisfies: true,
  },
];
```

## testing

```bash
# test functionality
yarn build
node bin/requirements.js --config tests/requirements.config.mjs

# unit tests
yarn test
```

## license

The MIT License (MIT)

Copyright (c) 2017-2024 Steven Chim
