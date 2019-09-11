import { SoftwareConfiguration } from '../types';
import { normalizeConfig, checkSoftware } from '../requirements';

describe('requirements', () => {
  describe('checkSoftware()', () => {
    it('should check for valid software', async () => {
      const softwareConfig: SoftwareConfiguration = { node: '*' };
      const result = await checkSoftware(softwareConfig);
      const [expected] = result;

      expect(expected.bin).toEqual('node');
      expect(expected.installed).toEqual(true);
      expect(expected.semver).toEqual('*');
      expect(expected.version).toBeDefined();
      expect(expected.satisfies).toEqual(true);
    });

    it('should check for valid software with flag', async () => {
      const softwareConfig: SoftwareConfiguration = {
        node: { semver: '*', flag: '--version' }
      };
      const result = await checkSoftware(softwareConfig);
      const [expected] = result;

      expect(expected.bin).toEqual('node');
      expect(expected.installed).toEqual(true);
      expect(expected.semver).toEqual('*');
      expect(expected.version).toBeDefined();
      expect(expected.satisfies).toEqual(true);
    });

    it('should check for not installed software', async () => {
      const softwareConfig: SoftwareConfiguration = { idontexist: '*' };
      const result = await checkSoftware(softwareConfig);
      const [expected] = result;

      expect(expected.bin).toEqual('idontexist');
      expect(expected.installed).toEqual(false);
      expect(expected.semver).toEqual('*');
      expect(expected.version).toBeUndefined();
      expect(expected.satisfies).toBeFalsy();
    });
  });

  describe('normalizeConfig()', () => {
    it('should normalize configuration with semver', () => {
      const softwareConfig: SoftwareConfiguration = {
        node: '*'
      };
      const expected = [{ bin: 'node', semver: '*' }];

      expect(normalizeConfig(softwareConfig)).toEqual(expected);
    });

    it('should normalize configuration with semver and custom flag', () => {
      const softwareConfig: SoftwareConfiguration = {
        httpd: { semver: '*', flag: '-v' }
      };
      const expected = [{ bin: 'httpd', semver: '*', flag: '-v' }];

      expect(normalizeConfig(softwareConfig)).toEqual(expected);
    });
  });
});
