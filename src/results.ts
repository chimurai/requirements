import { RawResult } from './types';

export function isAllOK(rawResults: RawResult[]) {
  return rawResults
    .filter((result) => !result.optional)
    .every((result) => result.satisfies === true);
}

export function getMessages(rawResults: RawResult[]) {
  const notInstalledItems = rawResults.filter((item) => !item.installed && item.installMessage);
  const unsatisfiedInstalledItems = rawResults.filter(
    (item) => !item.satisfies && item.updateMessage
  );

  const messages = [...notInstalledItems, ...unsatisfiedInstalledItems].map((item) => {
    return item.installMessage || item.updateMessage;
  });

  return messages;
}
