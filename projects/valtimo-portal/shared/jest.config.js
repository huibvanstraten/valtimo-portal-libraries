const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  "roots": [
    "<rootDir>/src/lib/"
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/valtimo-portal/shared/tsconfig.spec.json',
    },
  },
};
