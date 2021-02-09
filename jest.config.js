module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts)$': '<rootDir>/node_modules/ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
