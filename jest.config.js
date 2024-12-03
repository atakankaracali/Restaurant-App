module.exports = {
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
      "\\.(css|scss|less)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  };
  