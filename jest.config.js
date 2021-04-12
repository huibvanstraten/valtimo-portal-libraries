module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@cases/(.*)': '<rootDir>/src/app/modules/cases/$1',
    '@home/(.*)': '<rootDir>/src/app/modules/home/$1',
    '@notifications/(.*)': '<rootDir>/src/app/modules/notifications/$1',
    '@tasks/(.*)': '<rootDir>/src/app/modules/tasks/$1',
    '@new-case/(.*)': '<rootDir>/src/app/modules/new-case/$1',
    "@valtimo-portal/shared": "<rootDir>/projects/valtimo-portal/shared/src/lib",
    "@valtimo-portal/authentication": "<rootDir>/projects/valtimo-portal/authentication/src/lib",
    "@valtimo-portal/case": "<rootDir>/projects/valtimo-portal/case/src/lib",
    "@valtimo-portal/form": "<rootDir>/projects/valtimo-portal/form/src/lib",
    "@valtimo-portal/graphql": "<rootDir>/projects/valtimo-portal/graphql/src/lib",
    "@valtimo-portal/nl-material": "<rootDir>/projects/valtimo-portal/nl-material/src/lib"
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
