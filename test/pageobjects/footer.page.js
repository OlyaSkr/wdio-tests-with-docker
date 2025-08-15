import { $, $$, expect } from '@wdio/globals';

class FooterPage {
  get footer() {
    return $('.footer_v2');
  }
 
  get sectionTitles() {
    return $$('div.uui-footer06_link-list-3>div:not(.hide)');
  }

  get footerItems() {
    return $$('.uui-footer06_link-list-3');
  }

  get footerLogoLink() {
    return $('div.uui-footer_bottom-wrapper a.w-nav-brand');
  }

  get footerNavLinks() {
    return $$('div.footer_copyright-nav a');
  }

  footerScrollIntoView() {
    this.footer.scrollIntoView();
  }

  async getSectionTitlesText() {
    const elements = await this.sectionTitles;
    const sectionTitlesText = [];
    for (const el of elements) {
      sectionTitlesText.push(await el.getText());
    }
    return sectionTitlesText;
  }

  async getTitlesInFooterItems(text) {
    const linkLists = await this.footerItems;
    for (const list of linkLists) {
      const headerElement = await list.$(
        'div.text-size-regular-2._600.text-color-white.mb-1'
      );
      if (!headerElement) continue;

      const headerText = await headerElement.getText();
      if (headerText === text) {
        const sectionLinks = await list.$$('a.footer-link.w-inline-block');
        const sectionItemTitles = [];
        for (const link of sectionLinks) {
          sectionItemTitles.push(await link.getText());
        }
        return sectionItemTitles;
      }
    }
    return [];
  }
  
  async getFooterSection(sectionName) {
    for (const section of await this.footerItems) {
      const heading = await section.$(
        '.text-size-regular-2.text-color-white.mb-1' 
      );

      if (heading && (await heading.isExisting())) {
        const text = await heading.getText();
        console.log('Found footer section:', text.trim());

        if (text.trim() === sectionName) {
          return section;
        }
      } else {
        console.log('No heading found in this section');
      }
    }

    throw new Error(`Section "${sectionName}" not found in footer`);
  }

  async getLinksInFooterSection(sectionName) {
    const section = await this.getFooterSection(sectionName);
    await section.waitForDisplayed({ timeout: 10000 });
    return await section.$$(
      './/a[not(contains(@class, "hide"))]' 
    );
  }

  async getCurrentPageTitle() {
    return await browser.getTitle();
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }
}

export default new FooterPage();
