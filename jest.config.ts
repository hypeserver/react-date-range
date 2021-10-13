const config = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/setupTests.ts'],
  maxWorkers: 100,
  roots: ['<rootDir>/src'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testEnvironment: "jsdom",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  moduleFileExtensions: ['ts', 'tsx', 'js'], //...defaults.moduleFileExtensions,
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/demo/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
export default config;