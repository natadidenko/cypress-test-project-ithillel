const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false,
  viewportWidth: 1280,
  viewportheight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
