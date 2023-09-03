import type { RawResult, Message } from './types';

export function isAllOK(rawResults: RawResult[]) {
  return rawResults
    .filter((result) => !result.optional)
    .every((result) => result.satisfies === true);
}

export function getMessages(rawResults: RawResult[]): Message[] {
  const notInstalledItems = rawResults.filter((item) => !item.installed && item.installMessage);
  const unsatisfiedInstalledItems = rawResults.filter(
    (item) => !item.satisfies && item.updateMessage,
  );

  const messages = [...notInstalledItems, ...unsatisfiedInstalledItems].map((item) => {
    const bin: string = item.bin;
    const message: string = item.installMessage || item.updateMessage;
    return { bin, message };
  });

  return messages;
}
