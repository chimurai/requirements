export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['src/*.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '#ansi-styles': 'ansi-styles/index.js',
    '#supports-color': 'supports-color/index.js',
  },
};
