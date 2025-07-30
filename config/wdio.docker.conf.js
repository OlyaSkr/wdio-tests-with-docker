import { config as baseConfig } from './wdio.shared.conf.js';

export const config = {
  ...baseConfig,
  hostname: 'selenium-hub',
  port: 4444,
  path: '/wd/hub',
  services: [],
};
