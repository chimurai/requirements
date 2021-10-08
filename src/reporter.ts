import { table, getBorderCharacters } from 'table';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import type { RawResult, Message } from './types';

export function renderMessages(messages: Message[] = []): string {
  const result = messages.map(({ bin, message }) => {
    return `${chalk.keyword('orange')(`${bin}`)}:\n${message}\n`;
  });

  return result.join('\n');
}

export function renderTable(rawResults: RawResult[] = []) {
  let results = rawResults.map((item) => {
    const { bin, semver, installed, version, satisfies, optional } = item;

    const pass = satisfies
      ? `${logSymbols.success} ${chalk.dim('OK')}`
      : optional
      ? `${logSymbols.warning} ${chalk.dim('NOK (optional)')}`
      : `${logSymbols.error} ${chalk.dim('NOK')}`;

    return {
      bin: optional ? chalk.dim(`${bin}`) : bin,
      version: installed ? chalk.dim(version) : chalk.dim('not installed'),
      pass,
      semver: chalk.dim(semver),
    };
  });

  const tableHeaders = [['software', 'installed', 'passes', 'required']];

  const tableRows = results.map((item) => {
    const { bin, version, pass, semver } = item;
    return [bin, version, pass, semver];
  });

  const tableConfig = {
    border: getColouredBorderCharacters('norc', 'dim'),
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
