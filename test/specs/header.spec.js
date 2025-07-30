import { expect } from '@wdio/globals';
import HeaderPage from '../pageobjects/header.page.js';
import headerData from '../../data/headerData.json';

describe('Header Navigation', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await browser.url('/');
  });

  it('Should display the header and logo', async () => {
    await HeaderPage.logo.waitForDisplayed({ timeout: 5000 });
    await expect(HeaderPage.logo).toBeDisplayed();
  });

  it('Verify Channels items in the Platform dropdown menu', async () => {
    const dropdownItems = headerData.platformChannelsDropdownItems;

    const menuType = headerData.dropdownMenuTypes.platform;

    for (const item of dropdownItems) {
      await HeaderPage.hoverAndClickDropdownItem(
        headerData.dropdownIndexes.platform,
        item,
        menuType
      );
    }
  });

  it('Verify Use Cases items in the Use Cases dropdown menu', async () => {
    const dropdownItems = headerData.useCasesDropdownItems;

    const menuType = headerData.dropdownMenuTypes.useCases;

    for (const item of dropdownItems) {
      await HeaderPage.hoverAndClickDropdownItem(
        headerData.dropdownIndexes.useCases,
        item,
        menuType
      );
    }
  });

  it('Verify Industries items in the Use Cases dropdown menu', async () => {
    const dropdownItems = headerData.industriesDropdownItems;
    const menuType = headerData.dropdownMenuTypes.useCases;

    for (const item of dropdownItems) {
      await HeaderPage.hoverAndClickDropdownItem(
        headerData.dropdownIndexes.useCases,
        item,
        menuType
      );
    }
  });

  it('Verify items in the Resources dropdown menu', async () => {
    const dropdownItems = headerData.resourcesDropdownItems;
    const menuType = headerData.dropdownMenuTypes.resources;

    for (const item of dropdownItems) {
      await HeaderPage.hoverAndClickDropdownItem(
        headerData.dropdownIndexes.resources,
        item,
        menuType
      );
    }
  });

  it('Verify Business Types items in the Use Cases dropdown menu', async () => {
    const dropdownItems = headerData.businessTypesDropdownItems;
    const menuType = headerData.dropdownMenuTypes.businessTypes;

    for (const item of dropdownItems) {
      await HeaderPage.hoverAndClickDropdownItem(
        headerData.dropdownIndexes.useCases,
        item,
        menuType
      );
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
