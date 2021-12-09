/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  setupFiles: [
    '<rootDir>src/config/auth.ts',
    '<rootDir>src/config/mail.ts',
    '<rootDir>src/config/aws.ts',
    '<rootDir>src/config/upload.ts',
    '<rootDir>src/config/appAPI.ts'
  ],
  // collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov']
}
