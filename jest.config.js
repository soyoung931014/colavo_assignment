module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@type/(.*)$': '<rootDir>/src/type/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest-setup.js'],
};
