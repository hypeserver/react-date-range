
module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    setupFiles: ['<rootDir>/src/setupTests.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/demo/dist/'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
};
