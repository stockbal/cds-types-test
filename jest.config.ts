import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testTimeout: 20000,
  rootDir: "./srv",
  globalSetup: "../jest.setup.ts",
  collectCoverageFrom: ["<rootDir>/**/*.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/../@cds-models/"],
  coverageDirectory: "../coverage",
  verbose: true,
  collectCoverage: true,
  silent: true,
};

export default config;
