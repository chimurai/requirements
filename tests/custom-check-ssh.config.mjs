import chalk from 'chalk';
import fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

export default {
  software: {
    npm: {
      semver: '>= 16.x',
      updateMessage: `Outdated 'npm' found.\nRun '${chalk.cyan('npm i -g npm')}' to update.`,
    },
  },
  custom: {
    'Git SSH Check': {
      errorMessage: `HTTPS usage in Git is not allowed.\nFollow '${chalk.cyan(
        'https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh'
      )}' to fix this.`,
      fn: async () => {
        const file = await readFile('./.git/config', 'utf-8');
        const reAllowedProtocols = /(ssh:|git@)/;
        if (reAllowedProtocols.test(file) === false) {
          throw new Error('.git/config: ssh or git protocol not found');
        }
      },
    },
  },
};
