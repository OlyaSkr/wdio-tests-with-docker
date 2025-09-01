import { expect } from '@wdio/globals';
import headerPage from '../pageobjects/header.page.js';
import headerData from '../../data/headerData.json';
import allureReporter from '@wdio/allure-reporter';

describe('Header Navigation', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await browser.url('/');
  });

  it('Should display the header and logo', async () => {
    allureReporter.addStep('Wait for logo to be displayed');
    await headerPage.logo.waitForDisplayed({ timeout: 5000 });

    allureReporter.addStep('Verify that logo is displayed');
    await expect(headerPage.logo).toBeDisplayed();
  });

  it('Verify items in the Platform dropdown menu', async () => {
    const section = headerData.headerDropdownMenusTitle[0];
    const expectedTitles = headerData.platformExpectedTitles;
    const expectedUrls = headerData.platformExpectedUrls;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Platform section and verify`
      );

      const links = await headerPage.getLinksInHeaderSection(section);
      await links[i].scrollIntoView();
      await links[i].click();

      const actualTitle = await headerPage.getCurrentPageTitle();
      const currentUrl = await headerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      allureReporter.endStep();
    }
  });

  it('Verify items in the Channels dropdown menu', async () => {
    const section = headerData.headerDropdownMenusTitle[1];
    const expectedTitles = headerData.channelsExpectedTitles;
    const expectedUrls = headerData.channelsExpectedUrls;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Channels section and verify`
      );

      const links = await headerPage.getLinksInHeaderSection(section);
      await links[i].scrollIntoView();
      await links[i].click();

      const actualTitle = await headerPage.getCurrentPageTitle();
      const currentUrl = await headerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      allureReporter.endStep();
    }
  });

  it('Verify Documentation and Pricing header links', async () => {
    const expectedTitles = headerData.headerLinksExpectedTitles;
    const expectedUrls = headerData.headerLinksExpectedUrls;

    const visibleLinks = await headerPage.getAllVisibleHeaderLinks();

    for (let i = 0; i < visibleLinks.length; i++) {
      const link = visibleLinks[i];

      allureReporter.startStep(
        `Click header link ${i + 1} and verify title & URL`
      );

      await link.scrollIntoView();
      await link.click();

      const actualTitle = await headerPage.getCurrentPageTitle();
      const currentUrl = await headerPage.getCurrentUrl();

      console.log(`✅ Title: ${actualTitle} | URL: ${currentUrl}`);

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');

      allureReporter.endStep();
    }
  });

  afterEach(async () => {
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await browser.deleteCookies();
  });
});
