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
      'Verifies that the footer contains expected section titles'
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

  it('Verify item titles in AI Agent Platform section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the AI Agent Platform section of the footer'
    );

    allureReporter.startStep('Get ai agent platform items titles');
    const aiAgentPlatformItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[0]
    );
    allureReporter.endStep();

    allureReporter.startStep(
      'Compare with expected AI Agent Platform items titles'
    );
    const expectedAiAgentPlatform = footerData.aiAgentPlatformItemsTitles;
    expectedAiAgentPlatform.forEach((title) => {
      expect(aiAgentPlatformItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in Channels section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the Channels section of the footer'
    );

    allureReporter.startStep('Get channels items titles');
    const channelsItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[1]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected channels items titles');
    const expectedChannelsItemsTitles = footerData.channelsItemsTitles;
    expectedChannelsItemsTitles.forEach((title) => {
      expect(channelsItemsTitles).toContain(title);
    });
    allureReporter.endStep();
  });

  it('Verify item titles in API Platform section ', async () => {
    allureReporter.addDescription(
      'Verifies item titles in the API Platform section of the footer'
    );

    allureReporter.startStep('Get API platform items titles');
    const apiPlatformItemsTitles = await footerPage.getTitlesInFooterItems(
      footerData.expectedFooterSectionTitles[2]
    );
    allureReporter.endStep();

    allureReporter.startStep('Compare with expected API platform items titles');
    const expectedApiPlatformItemsTitles = footerData.apiPlatformItemsTitles;
    expectedApiPlatformItemsTitles.forEach((title) => {
      expect(apiPlatformItemsTitles).toContain(title);
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

  it('Should open each link in Ai Agent Platform section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Ai Agent Platform section opens the expected page'
    );

    const aiAgentPlatformsection = footerData.expectedFooterSectionTitles[0];
    const expectedTitles = footerData.aiAgentPlatformLinkTitles;
    const expectedUrls = footerData.aiAgentPlatformLinkEndpoints;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Ai Agent Platform section and verify`
      );

      const updatedLinks = await footerPage.getLinksInFooterSection(
        aiAgentPlatformsection
      );

      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Should open each link in Channels section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the Channels section opens the expected page'
    );

    const channelsSection = footerData.expectedFooterSectionTitles[1];
    const expectedTitles = footerData.channelsLinkTitles;
    const expectedUrls = footerData.channelsLinkEndpoints;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Channels section and verify`
      );
      const updatedLinks = await footerPage.getLinksInFooterSection(
        channelsSection
      );

      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Should open each link in API Platform section', async () => {
    allureReporter.addDescription(
      'Verifies that each link in the API Platform section opens the expected page'
    );

    const apiPlatformSection = footerData.expectedFooterSectionTitles[2];
    const expectedTitles = footerData.apiPlatformLinkTitles;
    const expectedUrls = footerData.apiPlatformLinkEndpoints;

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in API Platform section and verify`
      );
      const updatedLinks = await footerPage.getLinksInFooterSection(
        apiPlatformSection
      );

      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      await footerPage.footerScrollIntoView();
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

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Resources section and verify`
      );
      const updatedLinks = await footerPage.getLinksInFooterSection(
        resourcesSection
      );

      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
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

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(
        `Click link ${i + 1} in Company section and verify`
      );
      const updatedLinks = await footerPage.getLinksInFooterSection(
        companySection
      );

      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      const currentUrl = await footerPage.getCurrentUrl();

      await expect(actualTitle).toContain(expectedTitles[i]);
      await expect(currentUrl).toContain(expectedUrls[i]);

      await browser.url('/');
      await footerPage.footerScrollIntoView();
      allureReporter.endStep();
    }
  });

  it('Verify footer logo link', async () => {
    allureReporter.addDescription(
      'Verifies that the footer logo link opens the expected page'
    );

    allureReporter.startStep('Click on footer logo link');
    await footerPage.footerScrollIntoView();
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

  it('Verify footer nav links in About page', async () => {
    allureReporter.addDescription(
      'Verifies that footer navigation links open expected pages'
    );

    const expectedTitles = footerData.footerNavLinksTitle;

    await browser.url('about/');

    for (let i = 0; i < expectedTitles.length; i++) {
      allureReporter.startStep(`Click footer nav link ${i + 1} and verify`);

      const updatedLinks = await footerPage.footerNavLinks;
      await updatedLinks[i].scrollIntoView();
      await updatedLinks[i].click();

      const actualTitle = await footerPage.getCurrentPageTitle();
      await expect(actualTitle).toContain(expectedTitles[i]);

      await browser.url('about/');
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
