module.exports = {
    testEnvironment: "node",
    verbose: true,
    transform: {
      "^.+\\.jsx?$": "babel-jest", // If you need to transpile JavaScript files with Babel
    },
    moduleFileExtensions: ["js"],
    testMatch: ["**/*.test.js"], // Match the test files with the pattern "*.test.js"
  };
  