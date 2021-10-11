import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/setupTests.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/src/', '/demo/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
export default config;