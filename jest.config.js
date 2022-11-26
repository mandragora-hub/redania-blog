// const nextJest = require('next/jest')

// const createJestConfig = nextJest({
//   dir: './',
// })

// const customJestConfig = {
// }

module.exports = async () => ({
  // ...(await createJestConfig(customJestConfig)),
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!(remark-gfm)/)', '^.+\\.module\\.(css|sass|scss)$'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/data/(.*)$': '<rootDir>/data/$1',
    '^@/layouts/(.*)$': '<rootDir>/layouts/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/css/(.*)$': '<rootDir>/css/$1',
    '^@/common/(.*)$': '<rootDir>/common/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  },
})
