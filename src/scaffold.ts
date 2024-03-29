import fs from 'fs';
import semver from 'semver';
import chalk from 'chalk';

const FILENAME = 'requirements.config.mjs';

const TEMPLATE = `export default {
  software: {
    node: '^${semver.clean(process.version)}',
    nginx: {
      semver: '^666.x',
      optional: true       // won't fail if missing or wrong version
    },
    // httpd: {
    //   semver: '^2.x',
    //   flag: '-v',       // custom flag to print version
    //   installMessage: '<install instruction>',     // custom message when binary is not found
    //   updateMessage: '<update instruction>',       // custom message when binary has wrong version
    // },
  }
};`;

export function scaffold() {
  if (hasExistingConfig()) {
    throw new Error(`init failed. Found existing 'requirements.config.mjs'`);
  }

  fs.writeFileSync(FILENAME, TEMPLATE);

  const filepath = `${process.cwd()}/${FILENAME}`;
  console.log(chalk.dim(`Created config: ${filepath}`));
}

function hasExistingConfig() {
  try {
    fs.readFileSync(FILENAME);
    return true;
  } catch (err) {
    return false;
  }
}
