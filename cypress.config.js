const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    username: 'email3@domain.com',
    password: 'Qa123456!',
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // Підключення репортера для Mochawesome
      // тут можна додавати інші слухачі подій (якщо потрібно)
      return config;
    },
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space', // Вказуємо базову URL-адресу
  },
  reporter: 'cypress-mochawesome-reporter', // Вказуємо репортер
  reporterOptions: {
    reportDir: 'cypress/reports', // Вказуємо папку для збереження звітів
    overwrite: true,             // Перезаписувати звіти
    html: true,                   // Генерувати HTML звіт
    json: true,                   // Генерувати JSON звіт
  },
});
