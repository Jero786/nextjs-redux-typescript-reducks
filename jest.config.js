module.exports = {
    preset: 'ts-jest',
    globalSetup: './test/setup',
    globalTeardown: './test/teardown.js',
    testEnvironment: './test/mongo-environment.js',
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>./setupTests.ts'],
    moduleNameMapper: {
        '\\.scss?$': '<rootDir>/test/style-mock.js',
    },
};
