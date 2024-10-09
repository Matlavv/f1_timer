module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/src/tests/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};
