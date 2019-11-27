import * as fs from 'fs';
import * as semver from 'semver';

const FILENAME = 'requirements.config.js';

const TEMPLATE = `module.exports = {
  software: {
    node: '^${semver.clean(process.version)}',
    nginx: {
      semver: '^666.x',
      optional: true      // won't fail if missing or wrong version
    },
    // httpd: {
    //   semver: '^2.x',
    //   flag: '-v'       // custom flag to print version
    // },
  }
};`;

export function scaffold() {
  if (hasExistingConfig()) {
    throw new Error(`init failed. Found existing 'requirements.config.js'`);
  }

  fs.writeFileSync(FILENAME, TEMPLATE);
}

function hasExistingConfig() {
  try {
    fs.readFileSync(FILENAME);
    return true;
  } catch (err) {
    return false;
  }
}
