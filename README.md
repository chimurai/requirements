# requirements

Keep your software requirements in sync.

Simple way to see if installed software meet the requirements for a project or team.

![requirements-screenshot](https://github.com/chimurai/requirements/blob/master/docs/screenshot.png)

# install

```bash
$ npm install -g requirements
```

# config

Create a `.requirementsrc` file with the configuration in your project root.

```json
{
  "software": {

    "java": ">= 1.7.x",

    // Apache Maven - https://maven.apache.org/install.html
    "mvn": "^4.x",
    "node": ">= 5.x",
    "npm": ">= 3.x",
    "eslint": "^3.x",
    "yarn": "^0.x"
  }
}

```

# check requirements

Run `requirements` command in the project root. By default it will try to find the `.requirementsrc` file. ([more info](https://www.npmjs.com/package/rc#standards))

```bash
$ requirements
```

Or use a custom path:

```bash
$ requirements --config=<filepath>
```

# license

The MIT License (MIT)

Copyright (c) 2017 Steven Chim