const baseConfig = require('../../../jest.config');

module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/valtimo-portal/case/tsconfig.spec.json',
    },
  },
};
