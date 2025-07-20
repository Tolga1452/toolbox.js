export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['.'],
    moduleNameMapper: {
        '^@/(.*)$': './$1',
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            useESM: true,
            diagnostics: false,
            tsconfig: './jest.tsconfig.json'
        }]
    }
};
