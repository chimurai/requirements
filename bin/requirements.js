#! /usr/bin/env node

const chalk = require('chalk');
const { exec } = require('../dist/bin');

(async () => {
  try {
    await exec();
  } catch (err) {
    console.error(`${chalk.red(err.toString())}`);
  }
})();
