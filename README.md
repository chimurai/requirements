# requirements

[![npm](https://img.shields.io/npm/v/requirements?style=flat-square)](https://www.npmjs.com/package/requirements)
[![coveralls](https://img.shields.io/coveralls/chimurai/requirements.svg?style=flat-square)](https://coveralls.io/r/chimurai/requirements)
[![dependency Status](https://img.shields.io/david/chimurai/requirements.svg?style=flat-square)](https://david-dm.org/chimurai/requirements#info=dependencies)
[![snyk](https://snyk.io/test/npm/requirements/badge.svg?style=flat-square)](https://snyk.io/test/npm/requirements)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Validate your project's software requirements.

![requirements-screenshot](https://github.com/chimurai/requirements/blob/master/docs/screenshot.png)

# install

```bash
$ npm install -D requirements
```

```bash
$ yarn add --dev requirements
```

# config

Create a `requirements.config.js` file with the configuration in your project root.

```js
module.exports = {
  software: {
    node: '*',
    yarn: '~1.17.3',
    nginx: {
      semver: '>= 1.16.x',
      optional: true // optional (won't fail)
    },
    httpd: {
      semver: '^1.x',
      flag: '-v' // custom version flag
    }
  }
};
```

# check requirements

Run `requirements` command in the project root. By default it will try to find the `requirements.config.js` file.

```bash
$ npx requirements
```

Or use a custom path:

```bash
$ npx requirements --config=<filepath>
```

# CLI options

```bash
$ npx requirements --help
```

```
Options:
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
  --config, -c   Path to the configuration file
                                             [default: "requirements.config.js"]
  --force, -f    Succeeds even if not all requirements are satisfied
                                                      [boolean] [default: false]
  --quiet, -q    Only output when errors are present                   [boolean]
  --debug        Print raw data                                        [boolean]
```

# require('requirements')

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
    satisfies: true
  }
];
```

# license

The MIT License (MIT)

Copyright (c) 2017-2019 Steven Chim
