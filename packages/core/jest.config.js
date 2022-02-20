module.exports = {
  name: 'core',
  displayName: 'core',
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/.jest/transform.js',
  },
  setupFiles: ['<rootDir>/.jest/polyfill.js'],
  testMatch: ['<rootDir>/**/?(*.)(spec|test).(ts|js)?(x)'],
  testEnvironmentOptions: { resources: 'usable' },
};
