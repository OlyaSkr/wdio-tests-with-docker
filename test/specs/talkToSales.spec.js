import { expect } from '@wdio/globals';
import talkToSalesPage from '../pageobjects/talkToSales.page';
import talkToSalesData from '../../data/talkToSalesData.json';

describe('Talk to sales page', () => {
  beforeEach(async () => {
    //  await browser.reloadSession();
    await browser.url('/contact/sales/');
  });

  it('Verify Get started section display', async () => {
    await talkToSalesPage.verifyContactSalesText(
      talkToSalesData.contacSalesText
    );

    await talkToSalesPage.verifyHeadlineText(talkToSalesData.title);

    await talkToSalesPage.verifyParagraphText(talkToSalesData.paragraphText);

    await talkToSalesPage.verifyHeroPointersText(
      talkToSalesData.firstHeroPointer,
      talkToSalesData.secondHeroPointer
    );

    await talkToSalesPage.verifyFormDisplayed();
  });

  it('Verify presence of expected logos in DOM', async () => {
    const logoClasses = [
      '.is-ibm',
      '.is-deckers',
      '.is-zomato',
      '.is-ninjavan',
      '.is-splunk',
      '.is-nutanix',
    ];

    for (const className of logoClasses) {
      const logo = await $(`.marquee_item${className}`);
      expect(await logo.isExisting()).toBe(true);
    }
  });

  it('Verify feature section', async () => {
    await talkToSalesPage.scrollIntoViewToFeatureTitle();

    const actualFeatureTitle = await talkToSalesPage.getFeatureTitleText();
    const expectedFeatureTitle = talkToSalesData.featureTitle;
    expect(actualFeatureTitle).toBe(expectedFeatureTitle);

    await talkToSalesPage.allFeatureItemsShouldBeVisible();

    await talkToSalesPage.allFeatureItemImagesShouldBeVisible();

    const expectedTitles = [
      talkToSalesData.expectedTitles.first,
      talkToSalesData.expectedTitles.second,
    ];

    const expectedFeatureTexts = [
      talkToSalesData.expectedFeatureTexts.first,
      talkToSalesData.expectedFeatureTexts.second,
    ];

    await talkToSalesPage.verifyFeatureContent(
      expectedTitles,
      expectedFeatureTexts
    );
  });

  it('Verify metric section', async () => {
    await talkToSalesPage.scrollIntoViewToMetricSectionTitle();
    const metricTextTitle = await talkToSalesPage.getMetricSectionTitleText();
    const expectedMetricTextTile = talkToSalesData.metricsSectionTitle;

    expect(metricTextTitle).toHaveText(expectedMetricTextTile);

    const expectedMetricValues = talkToSalesData.expectedMetricValues;
    await talkToSalesPage.verifyMetricValues(expectedMetricValues);
  });

  it('Verify What our customers say about us section', async () => {
    await talkToSalesPage.scrollToSection();
    await talkToSalesPage.cycleSlidesNextUntilRepeat();
    await talkToSalesPage.cycleSlidesPrevUntilRepeat();
    await talkToSalesPage.validateDotsBehavior();
  });

  it('Verify FAQ section', async () => {
    await talkToSalesPage.faqSection.scrollIntoView();

    const titleText = await talkToSalesPage.faqSectionTitle.getText();
    expect(titleText).toBe(talkToSalesData.faqSection.faqTitle);

    const questionTexts = await talkToSalesPage.getFaqQuestionTitlesText();
    console.log('Found FAQ questions:', questionTexts);
    const expectedQuestions = talkToSalesData.faqSection.expectedQuestions;
    expectedQuestions.forEach((expected) => {
      expect(questionTexts).toContain(expected);
    });

    const answerTexts = await talkToSalesPage.getFaqQuestionAnswersText();
    console.log('Found answers:', answerTexts);
    const expectedAnswers = talkToSalesData.faqSection.expectedAnswers;
    expectedAnswers.forEach((expected) => {
      expect(answerTexts).toContain(expected);
    });
  });
});
