module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Untuk mendukung JSX
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock file CSS
      "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/_mocks_/fileMock.js", // Mock file gambar
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup tambahan jika ada
  };