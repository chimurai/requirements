import chalk from 'chalk';

export default {
  software: {
    // java: '>= 1.8.x',
    git: '~1.9.4 || 2.0.0 - 2.53.0',
    node: '^22.0.0 || >= 24.0.0',
    npm: '>= 11.x',
    yarn: {
      semver: '1.16.x',
      updateMessage: `Outdated 'yarn' found.\nRun '${chalk.cyan('brew upgrade yarn')}' to update.`,
    },
    mvn: '^3.x',
    nginx: {
      semver: '^6.x',
      optional: true,
      installMessage: `This project is configured for NGINX, but 'nginx' was not found on your path.\nRun '${chalk.cyan(
        'brew install nginx'
      )}' to install.`,
    },
    httpd: {
      semver: '^2.x',
      flag: '-v',
    },
  },
};
