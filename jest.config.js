/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: 'node',
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testMatch: ["**/tests/**/*.[jt]s?(x)"],
    roots: ['<rootDir>/src/tests'],
    // transform: {
    //     "^.+\\.(ts|tsx)$": "ts-jest",
    // }
};