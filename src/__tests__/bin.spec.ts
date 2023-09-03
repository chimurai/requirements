import fs from 'fs';
import { jest } from '@jest/globals';
import { exec } from '../bin';

describe('bin', () => {
  let logSpy;
  let debugSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    debugSpy = jest.spyOn(console, 'debug');
    jest.resetAllMocks();
  });

  it('should execute ok tests', async () => {
    await exec({ config: './tests/ok_every.config.mjs' });
    expect(logSpy).toHaveBeenNthCalledWith(1, '🔍  Checking software requirements...');
    expect(logSpy).toHaveBeenNthCalledWith(3, '✅  All is well!');
  });

  it('should execute nok tests', async () => {
    try {
      await exec({ config: './tests/ok_some.config.mjs' });
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[Error: ❌  Not all requirements are satisfied]`);
    }
  });

  it('should execute nok --force tests', async () => {
    await exec({ config: './tests/ok_some.config.mjs', force: true });
    expect(logSpy).toHaveBeenNthCalledWith(3, '⚠️  Not all requirements are satisfied (--force)');
  });

  it('should print debug data with --debug', async () => {
    await exec({ config: './tests/ok_every.config.mjs', debug: true });
    expect(debugSpy).toHaveBeenCalled();
  });

  it('should scaffold with --init', async () => {
    const filePath = './requirements.config.mjs';

    await exec({ init: true });
    expect(fs.existsSync(filePath)).toBe(true);

    // clean up
    fs.unlinkSync(filePath);
  });
});
