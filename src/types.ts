export interface Configuration {
  software: SoftwareConfiguration;
}

export interface SoftwareConfiguration {
  [bin: string]: ConfigurationValue;
}

export type ConfigurationValue = ConfigurationStringValue | ConfigurationObjectValue;

export type ConfigurationStringValue = string;

export type ConfigurationObjectValue = {
  semver: string;
  flag: string;
  optional?: boolean;
};

export interface RawResult {
  bin: string;
  semver: string;
  flag: string;
  installed: boolean;
  version?: string;
  satisfies?: boolean;
  optional?: boolean;
}
