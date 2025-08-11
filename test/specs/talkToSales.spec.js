import { expect } from '@wdio/globals';
import talkToSalesPage from '../pageobjects/talkToSales.page';
import talkToSalesData from '../../data/talkToSalesData.json';
import allureReporter from '@wdio/allure-reporter';

describe('Talk to sales page', () => {
  beforeEach(async () => {
    await browser.url('/contact/sales/');
  });

  it('Verify Get started section display', async () => {
    allureReporter.addStep('Verify contact sales text is correct');
    await talkToSalesPage.verifyContactSalesText(
      talkToSalesData.contacSalesText
    );

    allureReporter.addStep('Verify headline text is correct');
    await talkToSalesPage.verifyHeadlineText(talkToSalesData.title);

    allureReporter.addStep('Verify paragraph text is correct');
    await talkToSalesPage.verifyParagraphText(talkToSalesData.paragraphText);

    allureReporter.addStep('Verify hero pointers text is correct');
    await talkToSalesPage.verifyHeroPointersText(
      talkToSalesData.firstHeroPointer,
      talkToSalesData.secondHeroPointer
    );

    allureReporter.addStep('Verify form is displayed');
    await talkToSalesPage.verifyFormDisplayed();
  });

  it('Verify marquee logos and movement', async () => {
    const logoClasses = [
      { className: '.is-ibm', title: 'IBM' },
      { className: '.is-deckers', title: 'Deckers' },
      { className: '.is-zomato', title: 'Zomato' },
      { className: '.is-ninjavan', title: 'Ninja Van' },
      { className: '.is-splunk', title: 'Splunk' },
      { className: '.is-nutanix', title: 'Nutanix' },
    ];

    for (const { className, title } of logoClasses) {
      allureReporter.addStep(`Verify ${title} logo is present in the DOM`);
      const logo = await $(`.marquee_item${className}`);
      expect(await logo.isExisting()).toBe(true);
    }

    allureReporter.addStep(
      'Verify marquee is moving by checking transform changes'
    );
    const track = await $('.marquee_track');
    const initialTransform = await track.getCSSProperty('transform');
    await browser.pause(1000);
    const newTransform = await track.getCSSProperty('transform');

    expect(initialTransform.value).not.toEqual(newTransform.value);
  });

  it('Verify feature section', async () => {
    allureReporter.addStep('Scroll into view to feature section title');
    await talkToSalesPage.scrollIntoViewToFeatureTitle();

    allureReporter.addStep('Verify feature section title');
    const actualFeatureTitle = await talkToSalesPage.getFeatureTitleText();
    expect(actualFeatureTitle).toBe(talkToSalesData.featureTitle);

    allureReporter.addStep('Verify all feature items are visible');
    await talkToSalesPage.allFeatureItemsShouldBeVisible();

    allureReporter.addStep('Verify all feature item images are visible');
    await talkToSalesPage.allFeatureItemImagesShouldBeVisible();

    allureReporter.addStep('Verify feature content titles and descriptions');
    await talkToSalesPage.verifyFeatureContent(
      [
        talkToSalesData.expectedTitles.first,
        talkToSalesData.expectedTitles.second,
      ],
      [
        talkToSalesData.expectedFeatureTexts.first,
        talkToSalesData.expectedFeatureTexts.second,
      ]
    );
  });

  it('Verify metric section', async () => {
    allureReporter.addStep('Scroll into view to metric section title');
    await talkToSalesPage.scrollIntoViewToMetricSectionTitle();

    allureReporter.addStep('Verify metric section title');
    const metricTextTitle = await talkToSalesPage.getMetricSectionTitleText();
    expect(metricTextTitle).toHaveText(talkToSalesData.metricsSectionTitle);

    allureReporter.addStep('Verify metric values');
    await talkToSalesPage.verifyMetricValues(
      talkToSalesData.expectedMetricValues
    );
  });

  it('Verify What our customers say about us section', async () => {
    allureReporter.addStep('Cycle through customer slides forward');
    await talkToSalesPage.cycleSlidesNextUntilRepeat();

    allureReporter.addStep('Cycle through customer slides backward');
    await talkToSalesPage.cycleSlidesPrevUntilRepeat();

    allureReporter.addStep('Validate dots behavior in testimonial slider');
    await talkToSalesPage.validateDotsBehavior();
  });

  it('Verify FAQ section', async () => {
    allureReporter.addStep('Scroll into FAQ section');
    await talkToSalesPage.faqSection.scrollIntoView();

    allureReporter.addStep('Verify FAQ section title');
    const titleText = await talkToSalesPage.faqSectionTitle.getText();
    expect(titleText).toBe(talkToSalesData.faqSection.faqTitle);

    allureReporter.addStep('Verify FAQ questions text');
    const questionTexts = await talkToSalesPage.getFaqQuestionTitlesText();
    talkToSalesData.faqSection.expectedQuestions.forEach((expected) => {
      expect(questionTexts).toContain(expected);
    });

    allureReporter.addStep('Verify FAQ answers text');
    const answerTexts = await talkToSalesPage.getFaqQuestionAnswersText();
    talkToSalesData.faqSection.expectedAnswers.forEach((expected) => {
      expect(answerTexts).toContain(expected);
    });
  });
});
