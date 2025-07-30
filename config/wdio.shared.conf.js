export const config = {
  runner: 'local',
  specs: ['../test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--window-size=1920,1080'],
      },
      acceptInsecureCerts: true,
    },
    {
      maxInstances: 1,
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless', '--window-size=1920,1080'],
      },
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'info',
  baseUrl: 'https://www.plivo.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  before: async function () {
    await browser.setWindowSize(1920, 1080);
  },
};
