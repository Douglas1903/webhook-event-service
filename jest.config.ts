import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: [
  '**/*.spec.ts',
  '**/*.e2e-spec.ts',
],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;