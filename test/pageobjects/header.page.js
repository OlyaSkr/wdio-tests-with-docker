import { $, $$, expect } from '@wdio/globals';

class HeaderPage {
  get logo() {
    return $('div.uui-navbar03_container-3 a.w-nav-brand');
  }

  getHeaderSection(sectionName) {
    return $(
      `//div[contains(@class,"nav-link_dropdown-wrapper") and not(contains(@class,"hide")) and .//div[text()="${sectionName}"]]`
    );
  }

  async getLinksInHeaderSection(sectionName) {
    const section = await this.getHeaderSection(sectionName);
    await section.moveTo();
    await section.waitForDisplayed({ timeout: 10000 });
    const links = await section.$$(
      './/a[not(contains(normalize-space(.), "Coming Soon"))]'
    );
    const visibleLinks = [];
    for (const link of links) {
      if (await link.isDisplayed()) {
        visibleLinks.push(link);
      }
    }

    return visibleLinks;
  }

  async getCurrentPageTitle() {
    return await browser.getTitle();
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }

  async getAllVisibleHeaderLinks() {
    const allLinks = await $$('a.nav-link-4.w-nav-link');
    const visibleLinks = [];

    for (const link of allLinks) {
      if (
        (await link.isDisplayed()) &&
        !(await link.getAttribute('class')).includes('hide')
      ) {
        visibleLinks.push(link);
      }
    }

    return visibleLinks;
  }
}

export default new HeaderPage();
