import * as binVersion from 'bin-version';
import * as semver from 'semver';
import { RawResult, SoftwareConfiguration } from './types';

export async function checkSoftware(software: SoftwareConfiguration = {}): Promise<RawResult[]> {
  const softwareList = normalizeConfig(software);
  const softwareData = await getVersionData(softwareList);
  const softwareSatisfies = satisifies(softwareData);

  const results: RawResult[] = softwareSatisfies;
  return results;
}

export function satisifies(entries = []): RawResult[] {
  return entries.map((item) => {
    if (item.installed) {
      const satisfies = semver.satisfies(item.version, item.semver);
      return { ...item, satisfies };
    } else {
      return { ...item, satisfies: undefined };
    }
  });
}

export async function getVersionData(softwareList: RawResult[] = []): Promise<RawResult[]> {
  const results: RawResult[] = [];

  for (const software of softwareList) {
    let result: RawResult = { ...software };

    try {
      const maybeBinVersionArgs = software.flag ? { args: [software.flag] } : undefined;
      const version = await binVersion(software.bin, maybeBinVersionArgs);
      result = { ...result, installed: true, version };
    } catch (err) {
      result = { ...result, installed: false, version: undefined };
    }

    results.push(result);
  }

  return results;
}

export function normalizeConfig(software: SoftwareConfiguration): RawResult[] {
  const results: RawResult[] = [];

  for (const [bin, semver] of Object.entries(software)) {
    const item = typeof semver === 'string' ? { bin, semver } : { bin, ...semver };
    results.push(item as RawResult);
  }

  return results;
}
