import { CustomChecks } from '../types';

export async function checkCustom(customChecks: CustomChecks = {}) {
  let results = [];

  for await (const [name, { fn, errorMessage }] of Object.entries(customChecks)) {
    const item = { name, errorMessage };

    try {
      await fn();
      results.push({ ...item, passed: true });
    } catch (error) {
      results.push({ ...item, passed: false, error });
    }
  }

  return results;
}
