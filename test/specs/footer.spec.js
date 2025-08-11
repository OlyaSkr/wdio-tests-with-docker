import { expect } from '@wdio/globals';
import footerPage from '../pageobjects/footer.page';
import footerData from '../../data/footerData.json';
import allureReporter from '@wdio/allure-reporter';

describe('Footer section', () => {
  beforeEach(async () => {
    await browser.url('/');
    await footerPage.footerScrollIntoView();
  });

  it('Verify section titles ', async () => {
    allureReporter.addDescription(
      'Verifies that the footer contains expected section titles like Products, Use Cases, etc.'
    );

    allureReporter.startStep('Get section titles');
    const sectionTitlesText = await footerPage.getSectionTitlesText();
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected titles from data');
    const expectedTitles = footerData.expectedFooterSectionTitles;
    expectedTitles.forEach((expected) => {
      expect(sectionTitlesText).toContain(expected);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Products section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Products section of the footer'
    );

    allureReporter.startStep('Get product items titles');
    const productItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[0]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected product items titles');
    const expectedProductItemsTitles = footerData.productsItemsTitles;
    expectedProductItemsTitles.forEach((title) => {
      expect(productItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Use Cases section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Use Cases section of the footer'
    );

    allureReporter.startStep('Get use cases items titles');
    const useCasesItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[1]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected use cases items titles');
    const expectedUseCasesItemsTitles = footerData.useCasesItemsTitles;
    expectedUseCasesItemsTitles.forEach((title) => {
      expect(useCasesItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Developers section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Developers section of the footer'
    );

    allureReporter.startStep('Get developers items titles');
    const developersItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[2]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected developers items titles');
    const expectedDevelopersItemsTitles = footerData.developersItemsTitles;
    expectedDevelopersItemsTitles.forEach((title) => {
      expect(developersItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Resources section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Resources section of the footer'
    );

    allureReporter.startStep('Get resources items titles');
    const resourcesItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[3]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected resources items titles');
    const expectedResourcesItemsTitles = footerData.resourcesItemsTitles;
    expectedResourcesItemsTitles.forEach((title) => {
      expect(resourcesItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Company section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Company section of the footer'
    );

    allureReporter.startStep('Get company items titles');
    const companyItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[4]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected company items titles');
    const expectedCompanyItemsTitles = footerData.companyItemsTitles;
    expectedCompanyItemsTitles.forEach((title) => {
      expect(companyItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Should open each link in Products section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Products section opens the expected page'
    );

    const section = footerData.expectedFooterSectionTitles[0];
    const expectedTitles = footerData.producstLinkTitles;
    const expectedUrls = footerData.producstLinkEndpoints;
    const productLinks = await footerPage.getLinksInFooterSection(section);

    for (let i = 0; i < productLinks.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Products section and verify`
      );
      await footerPage.clickLinkInFooterSection(section, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Should open each link in Use Cases section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Use Cases section opens the expected page'
    );

    const useCaseSection = footerData.expectedFooterSectionTitles[1];
    const expectedTitles = footerData.useCasesLinkTitles;
    const expectedUrls = footerData.useCasesLinkEndpoints;
    const useCasesLinks = await footerPage.getLinksInFooterSection(
      useCaseSection
    );

    for (let i = 0; i < useCasesLinks.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Use Cases section and verify`
      );
      await footerPage.clickLinkInFooterSection(useCaseSection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Should open each link in Developers section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Developers section opens the expected page'
    );

    const developersSection = footerData.expectedFooterSectionTitles[2];
    const expectedTitles = footerData.developersLinkTitles;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Developers section and verify`
      );
      const updatedLinks = await footerPage.getLinksInFooterSection(
        developersSection
      );

      await updatedLinks[i].waitForDisplayed({ timeout: 5000 });
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      await expect(actualTitle).toContain(expectedTitles[i]);

      await browser.url('/');
      allureReporter.endStep();
    }
  });

  it('Should open each link in Resources section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Resources section opens the expected page'
    );

    const resourcesSection = footerData.expectedFooterSectionTitles[3];
    const expectedTitles = footerData.resourcesLinkTitles;
    const expectedUrls = footerData.resourcesLinkEndpoints;
    const resourcesLinks = await footerPage.getLinksInFooterSection(
      resourcesSection
    );

    for (let i = 0; i < resourcesLinks.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Resources section and verify`
      );
      await footerPage.clickLinkInFooterSection(resourcesSection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Should open each link in Company section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Company section opens the expected page'
    );

    const companySection = footerData.expectedFooterSectionTitles[4];
    const expectedTitles = footerData.companyLinkTitles;
    const expectedUrls = footerData.companyLinkEndpoints;
    const companyLinks = await footerPage.getLinksInFooterSection(
      companySection
    );

    for (let i = 0; i < companyLinks.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Company section and verify`
      );
      await footerPage.clickLinkInFooterSection(companySection, i);

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Verify footer logo link', async () => {
    allureReporter.addDescription(
      'Verifies that the footer logo link opens the expected page'
    );

    allureReporter.startStep('Click on footer logo link');
    await footerPage.footerLogoLink.click();
    allureReporter.endStep();

    allureReporter.startStep(
      'Verify page title and URL after clicking logo link'
    );
    const actualTitle = await footerPage.getCurrentPageTitle();
    const currentUrl = await footerPage.getCurrentUrl();

    await expect(actualTitle).toContain(footerData.footerLogoLinkTitle);
    await expect(currentUrl).toContain(footerData.footerLogoLinkUrl);
    allureReporter.endStep();
  });

  it('Verify footer nav links', async () => {
    allureReporter.addDescription(
      'Verifies that footer navigation links open expected pages'
    );

    const expectedTitles = footerData.footerNavLinksTitle;
    const footerNavLinks = await footerPage.footerNavLinks;

    for (let i = 0; i < footerNavLinks.length; i++) {
      allureReporter.startStep(`Click footer nav link ${i + 1} and verify`);

      const updatedLinks = await footerPage.footerNavLinks;
      await updatedLinks[i].waitForDisplayed({ timeout: 5000 });
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      await expect(actualTitle).toContain(expectedTitles[i]);

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
