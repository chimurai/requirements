const chalk = require('chalk');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

module.exports = {
  custom: {
    'Title Always Failure': {
      errorMessage: `Error message when failure occurs.`,
      fn: async () => {
        throw new Error('This example always fails.');
      },
    },
  },
};
