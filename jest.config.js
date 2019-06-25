module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>./setupTests.ts'],
    moduleNameMapper: {
        '\\.scss?$': '<rootDir>/test/style-mock.js',
    },
};
