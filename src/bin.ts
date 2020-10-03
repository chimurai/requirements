import * as yargs from 'yargs';
import * as path from 'path';
import * as chalk from 'chalk';
import { checkSoftware } from './requirements';
import { renderTable, renderMessages } from './reporter';
import { Configuration } from './types';
import { scaffold } from './scaffold';
import { isAllOK, getMessages } from './results';

export async function exec(_debug_argv_?) {
  const argv = _debug_argv_ ?? getArgv();

  if (argv.init) {
    scaffold();
    return;
  }

  if (!argv.quiet) {
    console.log(`🔍  Checking software requirements...`);
  }

  const config = getConfiguration(argv);
  let rawResults = await checkSoftware(config.software);

  const ALL_OK = isAllOK(rawResults);

  if (argv.debug) {
    console.debug('👀  RAW data:\n', rawResults);
    console.debug('👀  yargs:\n', argv);
  }

  if (!ALL_OK && !argv.force) {
    const messages = getMessages(rawResults);
    console.error(renderTable(rawResults));
    console.log(renderMessages(messages));
    throw new Error(`❌  Not all requirements are satisfied`);
  }

  if (argv.quiet && ALL_OK) {
    // silent
  } else {
    console.log(renderTable(rawResults));
  }

  if (!argv.quiet && ALL_OK) {
    console.log(`✅  All is well!`);
  }

  if (argv.force && !ALL_OK) {
    console.log(`⚠️  Not all requirements are satisfied (--force)`);
  }
}

function getArgv() {
  return yargs
    .help('help')
    .alias('help', 'h')
    .version('version', require('../package.json').version)
    .alias('version', 'v')
    .options({
      init: {
        description: 'Create a requirements.config.js file',
        alias: 'i',
      },
      config: {
        description: 'Path to the configuration file',
        default: 'requirements.config.js',
        alias: 'c',
      },
      force: {
        description: 'Succeeds even if not all requirements are satisfied',
        default: false,
        boolean: true,
        alias: 'f',
      },
      quiet: {
        description: 'Only output when errors are present',
        boolean: true,
        alias: 'q',
      },
      debug: {
        description: 'Print raw data',
        boolean: true,
      },
    }).argv;
}

function getConfiguration(argv): Configuration {
  const cwd = process.cwd();
  const configPath = argv.config;
  let pathConfiguration;

  const isAbsoluteConfigPath = !!(configPath && /^[~/]/.exec(configPath as string));

  if (isAbsoluteConfigPath) {
    const homeDir = require('os').homedir();
    pathConfiguration =
      configPath[0] === '~' ? path.join(homeDir, configPath.slice(1)) : configPath;
  } else {
    pathConfiguration = path.join(cwd, configPath as string);
  }

  try {
    return require(pathConfiguration);
  } catch (err) {
    throw new Error(`❌  Unable to find configuration file: '${chalk.bold(pathConfiguration)}'`);
  }
}
