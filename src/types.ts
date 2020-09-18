export interface Configuration {
  software: SoftwareConfiguration;
}

export interface SoftwareConfiguration {
  [bin: string]: ConfigurationValue;
}

export type ConfigurationValue = ConfigurationStringValue | ConfigurationObjectValue;

export type ConfigurationStringValue = string;

export interface ConfigurationObjectValue {
  semver: string;
  flag: string;
  optional?: boolean;
  installMessage?: string;
  updateMessage?: string;
}

export interface RawResult extends ConfigurationObjectValue {
  bin: string;
  installed: boolean;
  version?: string;
  satisfies?: boolean;
}

export interface Message {
  bin: string;
  message: string;
}
