import * as yargs from 'yargs';
import * as path from 'path';
import * as chalk from 'chalk';
import { checkSoftware } from './requirements';
import { renderTable } from './reporter';
import { Configuration } from './types';

export async function exec() {
  const argv = getArgv();

  if (!argv.quiet) {
    console.log(`🔍  Checking software requirements...`);
  }

  const config = getConfiguration(argv);
  let rawResults = await checkSoftware(config.software);

  const ALL_OK = rawResults
    .filter(result => !result.optional)
    .every(result => result.satisfies === true);

  if (argv.debug) {
    console.debug('👀  RAW data:\n', rawResults);
    console.debug('👀  yargs:\n', argv);
  }

  if (!ALL_OK && !argv.force) {
    console.error(renderTable(rawResults));
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
      config: {
        description: 'Path to the configuration file',
        default: 'requirements.config.js',
        alias: 'c'
      },
      force: {
        description: 'Succeeds even if not all requirements are satisfied',
        default: false,
        boolean: true,
        alias: 'f'
      },
      quiet: {
        description: 'Only output when errors are present',
        boolean: true,
        alias: 'q'
      },
      debug: {
        description: 'Print raw data',
        boolean: true
      }
    }).argv;
}

function getConfiguration(argv): Configuration {
  const cwd = process.cwd();
  const configPath = argv.config;
  let pathConfiguration;

  const isAbsoluteConfigPath = configPath && /^[~/]/.exec(configPath as string) ? true : false;

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
