import { expect } from '@wdio/globals';
import footerPage from '../pageobjects/footer.page';
import footerData from '../../data/footerData.json';

describe('Footer section', () => {
  beforeEach(async () => {
    await browser.url('/');
    await footerPage.footerScrollIntoView();
  });

  it('Verify section titles ', async () => {
    const sectionTitlesText = await footerPage.getSectionTitlesText();
    const expectedTitles = footerData.expectedFooterSectionTitles;

    expectedTitles.forEach((expected) => {
      expect(sectionTitlesText).toContain(expected);
    });
  });

  it('Verify item titles in Products section ', async () => {
    const productItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[0]
    );

    const expectedProductItemsTitles = footerData.productsItemsTitles;
    expectedProductItemsTitles.forEach((title) => {
      expect(productItemsTitles).toContain(title);
    });
  });

  it('Verify item titles in Use Cases section ', async () => {
    const useCasesItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[1]
    );

    const expectedUseCasesItemsTitles = footerData.useCasesItemsTitles;
    expectedUseCasesItemsTitles.forEach((title) => {
      expect(useCasesItemsTitles).toContain(title);
    });
  });

  it('Verify item titles in Developers section ', async () => {
    const developersItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[2]
    );

    const expectedDevelopersItemsTitles = footerData.developersItemsTitles;
    expectedDevelopersItemsTitles.forEach((title) => {
      expect(developersItemsTitles).toContain(title);
    });
  });

  it('Verify item titles in Resources section ', async () => {
    const resourcesItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[3]
    );

    const expectedResourcesItemsTitles = footerData.resourcesItemsTitles;
    expectedResourcesItemsTitles.forEach((title) => {
      expect(resourcesItemsTitles).toContain(title);
    });
  });

  it('Verify item titles in Company section ', async () => {
    const companyItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[4]
    );

    const expectedCompanyItemsTitles = footerData.companyItemsTitles;
    expectedCompanyItemsTitles.forEach((title) => {
      expect(companyItemsTitles).toContain(title);
    });
  });

  it('Should open each link in Products section', async () => {
    const section = footerData.expectedFooterSectionTitles[0];
    const expectedTitles = footerData.producstLinkTitles;
    const expectedUrls = footerData.producstLinkEndpoints;
    const productLinks = await footerPage.getLinksInFooterSection(section);

    for (let i = 0; i < productLinks.length; i++) {
      await footerPage.clickLinkInFooterSection(section, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
    }
  });

  it('Should open each link in Use Cases section', async () => {
    const useCaseSection = footerData.expectedFooterSectionTitles[1];
    const expectedTitles = footerData.useCasesLinkTitles;
    const expectedUrls = footerData.useCasesLinkEndpoints;
    const useCasesLinks = await footerPage.getLinksInFooterSection(
      useCaseSection
    );

    for (let i = 0; i < useCasesLinks.length; i++) {
      await footerPage.clickLinkInFooterSection(useCaseSection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
    }
  });

  it('Should open each link in Developers section', async () => {
    const developersSection = footerData.expectedFooterSectionTitles[2];
    const expectedTitles = footerData.developersLinkTitles;
    const expectedUrls = footerData.developersLinkEndpoints;
    const developersLinks = await footerPage.getLinksInFooterSection(
      developersSection
    );

    for (let i = 0; i < developersLinks.length; i++) {
      const updatedLinks = await footerPage.getLinksInFooterSection(
        developersSection
      );

      await updatedLinks[i].waitForDisplayed({ timeout: 5000 });
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      await expect(actualTitle).toContain(expectedTitles[i]);

      await browser.url('/');
    }
  });

  it('Should open each link in Resources section', async () => {
    const resourcesSection = footerData.expectedFooterSectionTitles[3];
    const expectedTitles = footerData.resourcesLinkTitles;
    const expectedUrls = footerData.resourcesLinkEndpoints;
    const resourcesLinks = await footerPage.getLinksInFooterSection(
      resourcesSection
    );

    for (let i = 0; i < resourcesLinks.length; i++) {
      await footerPage.clickLinkInFooterSection(resourcesSection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
    }
  });

  it('Should open each link in Company section', async () => {
    const companySection = footerData.expectedFooterSectionTitles[4];
    const expectedTitles = footerData.companyLinkTitles;
    const expectedUrls = footerData.companyLinkEndpoints;
    const companyLinks = await footerPage.getLinksInFooterSection(
      companySection
    );

    for (let i = 0; i < companyLinks.length; i++) {
      await footerPage.clickLinkInFooterSection(companySection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
    }
  });

  it('Verify footer logo link', async () => {
    const expectedTitle = footerData.footerLogoLinkTitle;
    const expectedUrl = footerData.footerLogoLinkUrl;
    await footerPage.footerLogoLink.click();

    const actualTitle = await footerPage.getCurrentPageTitle();
    const currentUrl = await footerPage.getCurrentUrl();

    await expect(actualTitle).toContain(expectedTitle);
    await expect(currentUrl).toContain(expectedUrl);
  });

  it('Verify footer nav links', async () => {
    const expectedTitles = footerData.footerNavLinksTitle;
    const footerNavLinks = await footerPage.footerNavLinks;

    for (let i = 0; i < footerNavLinks.length; i++) {
      const updatedLinks = await footerPage.footerNavLinks;

      await updatedLinks[i].waitForDisplayed({ timeout: 5000 });
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      await expect(actualTitle).toContain(expectedTitles[i]);

      await browser.url('/');
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
