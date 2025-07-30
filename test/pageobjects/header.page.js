import { $, $$, expect } from '@wdio/globals';
import headerData from '../../data/headerData.json';

const REGION_TO_COUNTRY = {
  ua: 'Ukraine',
  us: 'United States',
  gb: 'United Kingdom',
  ca: 'Canada',
  in: 'India',
  au: 'Australia',
  de: 'Germany',
  fr: 'France',
  it: 'Italy',
  es: 'Spain',
  pl: 'Poland',
  nl: 'Netherlands',
  se: 'Sweden',
  no: 'Norway',
  jp: 'Japan',
  kr: 'South Korea',
  za: 'South Africa',
  mx: 'Mexico',
  ar: 'Argentina',
  ch: 'Switzerland',
  be: 'Belgium',
  at: 'Austria',
};

class HeaderPage {
  get logo() {
    return $('a[href="/"]');
  }

  dropdownMenus(index) {
    return $(`#w-dropdown-toggle-${index}`);
  }

  async hoverAndClickDropdownItem(index, item, type = 'default') {
    const dropdown = await this.dropdownMenus(index);
    await dropdown.waitForClickable({ timeout: 5000 });
    await dropdown.moveTo();

    await browser.pause(500);

    let menuItem;
    switch (type) {
      case 'useCases':
        menuItem = await this.useCasesDropdownMenuItemByText(item.text);
        break;
      case 'resources':
        menuItem = await this.resourcesDropdownMenuItemByText(item.text);
        break;
      case 'pricing':
        menuItem = await this.pricingDropdownMenuItemByText(item.text);
        break;
      case 'platform':
        menuItem = await this.platformMenuItemByText(item.text);
        break;
      case 'businessTypes':
        menuItem = await this.businessTypesDropdownMenuItemByText(item.text);
        break;
    }

    await menuItem.waitForDisplayed({ timeout: 5000 });
    await menuItem.click();

    const expectedUrlPart =
      type === 'pricing'
        ? item.expectedUrlPart.replace('{region}', process.env.REGION || 'ua')
        : item.expectedUrlPart;

    const expectedTitle =
      type === 'pricing'
        ? item.expectedTitle.replace(
            '{country}',
            REGION_TO_COUNTRY[process.env.REGION] || 'Ukraine'
          )
        : item.expectedTitle;

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(expectedUrlPart),
      {
        timeout: 5000,
        timeoutMsg: `URL did not include ${expectedUrlPart}`,
      }
    );

    const title = await browser.getTitle();
    expect(title).toBe(expectedTitle);
    await browser.url('/');
  }

  platformMenuItemByText(text) {
    return $(
      `//div[contains(@class, "dropdown_link_title") and contains(text(), "${text}")]`
    );
  }

  useCasesDropdownMenuItemByText(text) {
    return $(
      `//div[@class="dropdown_links is-usecase"]//a[div[text()="${text}"]]`
    );
  }

  resourcesDropdownMenuItemByText(text) {
    return $(
      `//div[@class="dropdown_links is-col-1-abs"]//a[div[text()="${text}"]]`
    );
  }

  pricingDropdownMenuItemByText(text) {
    return $(
      `//div[contains(@class, 'dropdown_link_title') and normalize-space(text())='${text}']`
    );
  }

  businessTypesDropdownMenuItemByText(text) {
    return $(
      `//div[@class="dropdown_links is-usecase is-1-col"]//a[div[text()='${text}']]`
    );
  }
}

export default new HeaderPage();
