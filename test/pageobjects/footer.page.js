import { $, $$, expect } from '@wdio/globals';

class FooterPage {
  get footer() {
    return $('.footer_v2');
  }

  get sectionTitles() {
    return $$('.footer_item-heading-wrapper div');
  }

  get footerItems() {
    return $$('div.footer-item');
  }

  get footerLogoLink() {
    return $('div.footer_logo_wrap a');
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
    const footerItems = await this.footerItems;

    for (const item of footerItems) {
      const headerElement = await item.$('.footer_item-heading-wrapper div');
      const headerText = await headerElement.getText();

      if (headerText === text) {
        const sectionLinks = await item.$$(
          'div.footer_nav-wrapper a.footer_nav-link_v2'
        );

        const sectionItemTitles = [];
        for (const link of sectionLinks) {
          sectionItemTitles.push(await link.getText());
        }

        return sectionItemTitles;
      }
    }
    return [];
  }
  /*
  async getFooterSection(sectionName) {
    for (const section of await this.footerItems) {
      const heading = await section.$(
        '.footer_item-heading-wrapper .text-weight-semibold'
      );
      const text = await heading.getText();
      if (text.trim() === sectionName) {
        return section;
      }
    }
    throw new Error(`Section "${sectionName}" not found in footer`);
  }
    */
  async getFooterSection(sectionName) {
    for (const section of await this.footerItems) {
      const heading = await section.$(
        '.footer_item-heading-wrapper .text-weight-semibold'
      );

      if (heading && (await heading.isExisting())) {
        const text = await heading.getText();
        console.log('Found footer section:', text.trim()); // отладка

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
    return await section.$$(
      './/a[not(ancestor::div[contains(@class, "hide")])]'
    );
  }

  async clickLinkInFooterSection(sectionName, index) {
    const links = await this.getLinksInFooterSection(sectionName);
    await links[index].click();
  }

  async getCurrentPageTitle() {
    return await browser.getTitle();
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }
}

export default new FooterPage();
