import * as fs from 'fs';
import { exec } from '../bin';

describe('bin', () => {
  let logSpy;
  let debugSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    debugSpy = jest.spyOn(console, 'debug');
    errorSpy = jest.spyOn(console, 'error');
    jest.resetAllMocks();
  });

  describe('Configuration scaffold', () => {
    it('should scaffold with --init', async () => {
      const filePath = './requirements.config.js';

      await exec({ init: true });
      expect(fs.existsSync(filePath)).toBe(true);

      // clean up
      fs.unlinkSync(filePath);
    });
  });

  describe('Software Checks', () => {
    it('should execute ok tests', async () => {
      await exec({ config: './tests/ok_every.config.js' });
      expect(logSpy).toHaveBeenNthCalledWith(1, '🔍  Checking software requirements...');
      expect(logSpy).toHaveBeenNthCalledWith(3, '✅  All is well!');
    });

    it('should execute nok tests', async () => {
      await expect(exec({ config: './tests/ok_some.config.js' })).rejects.toMatchInlineSnapshot(
        `[Error: ❌  Not all requirements are satisfied]`
      );
    });

    it('should execute nok --force tests', async () => {
      await exec({ config: './tests/ok_some.config.js', force: true });
      expect(logSpy).toHaveBeenNthCalledWith(3, '⚠️  Not all requirements are satisfied (--force)');
    });

    it('should print debug data with --debug', async () => {
      await exec({ config: './tests/ok_every.config.js', debug: true });
      expect(debugSpy).toHaveBeenCalled();
    });
  });

  describe('Custom Checks', () => {
    it('should execute nok tests', async () => {
      await expect(
        exec({ config: './tests/custom-check-always_fail.js' })
      ).rejects.toMatchInlineSnapshot(`[Error: ❌  Not all custom requirements are satisfied]`);
    });

    it('should not reject with --force', async () => {
      await expect(
        exec({ config: './tests/custom-check-always_fail.js', force: true })
      ).resolves.toBe(undefined);
    });
  });
});
