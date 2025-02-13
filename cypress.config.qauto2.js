const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    username: 'email4@domain.com',
    password: '!Qa123456',
  },
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
  }
});
