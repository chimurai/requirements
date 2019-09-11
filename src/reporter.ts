import { table, getBorderCharacters } from 'table';
import * as logSymbols from 'log-symbols';
import chalk from 'chalk';
import * as sortBy from 'lodash/sortBy';
import { RawResult } from './types';

export function renderTable(rawResults: RawResult[]) {
  let results = sortBy(rawResults, ['installed', 'satisfies']).map(item => {
    const { bin, semver, installed, version, satisfies } = item;

    return {
      bin,
      semver: chalk.dim(semver),
      version: installed ? chalk.dim(version) : chalk.dim('not installed'),
      pass: satisfies
        ? `${logSymbols.success} ${chalk.dim('OK')}`
        : `${logSymbols.error} ${chalk.dim('NOK')}`
    };
  });

  const tableHeaders = [['software', 'required', 'installed', 'passes']];

  const tableRows = results.map(item => {
    const { bin, semver, version, pass } = item;
    return [bin, semver, version, pass];
  });

  const tableConfig = {
    border: getColouredBorderCharacters('norc', 'dim')
  };

  return table([...tableHeaders, ...tableRows], tableConfig);
}

function getColouredBorderCharacters(name, colour) {
  const result = {};
  const borderChars = getBorderCharacters(name);

  Object.entries(borderChars)
    .map(([key, val]) => [key, chalk[colour](val as string)])
    .forEach(([key, val]) => (result[key] = val));
  return result;
}
