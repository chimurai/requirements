module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['src/*.ts'],
  coveragePathIgnorePatterns: ['index.ts'],
};
