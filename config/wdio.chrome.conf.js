import { config as baseConfig } from './wdio.local.conf.js';

export const config = {
  ...baseConfig,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--disable-gpu', '--window-size=1920,1080'],
      },
    },
  ],
};
