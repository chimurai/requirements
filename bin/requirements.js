#! /usr/bin/env node

import chalk from 'chalk';
import { exec } from '../dist/bin.js';

(async () => {
  try {
    await exec();
  } catch (err) {
    console.error(`${chalk.red('error')} ${chalk.reset(err.message)}`);
    process.exitCode = 1;
  }
})();
