import { $, $$, expect } from '@wdio/globals';

class TalkToSalesPage {
  get contactSales() {
    return $('.hero_content-top > div:nth-child(1)');
  }

  get headline() {
    return $('h1.hero_title');
  }

  get paragraph() {
    return $('p.hero_para');
  }

  get heroPointers() {
    return $$('div.hero_content-bottom .hero_pointer');
  }

  get form() {
    return $('div.form_step.is-1');
  }

  get featureTitle() {
    return $('.feature_top h2');
  }

  get featureItems() {
    return $$('div.feature_item');
  }

  get featureItemImages() {
    return $$('div.feature_item_image');
  }

  get featureItemContentTitles() {
    return $$('h3.feature_item_content_title');
  }

  get featureItemContentTexts() {
    return $$('div.feature_item_content_richtext p');
  }

  get metricSectionTitle() {
    return $('h2.metric_title');
  }

  get metricTitles() {
    return $$('div.metric_stat_title');
  }

  get testimonialsSection() {
    return $('//*[contains(text(), "What our customers say about us")]');
  }

  get nextArrow() {
    return $('a.swiper-next');
  }

  get prevArrow() {
    return $('a.swiper-prev');
  }

  get dots() {
    return $$('button.swiper-bullet');
  }

  get activeSlide() {
    return $('div.swiper-slide.swiper-slide-active');
  }

  get faqSection() {
    return $('div.faqs_right');
  }

  get faqSectionTitle() {
    return $('h2.faq_title');
  }

  get faqQuestionTitles() {
    return $$('h3.faq_accordion-header_title');
  }

  get faqQuestionAnswers() {
    return $$('div.faq_accordion-rich_text p');
  }

  async verifyContactSalesText(text) {
    await this.contactSales.waitForDisplayed();
    await expect(this.contactSales).toHaveText(text);
  }

  async verifyHeadlineText(text) {
    await this.headline.waitForDisplayed();
    await expect(this.headline).toHaveText(text);
  }

  async verifyParagraphText(text) {
    await this.paragraph.waitForDisplayed();
    await expect(this.paragraph).toHaveText(text);
  }

  async verifyHeroPointersText(expectedText1, expectedText2) {
    const heroPointers = await this.heroPointers;

    if (heroPointers.length === 0) {
      console.log('No hero pointers found.');
      return;
    }

    for (let pointer of heroPointers) {
      const text = await pointer.$('.text-weight-medium').getText();

      if (text === expectedText1) {
        await expect(text).toEqual(expectedText1);
      } else if (text === expectedText2) {
        await expect(text).toEqual(expectedText2);
      } else {
        console.log(`Unexpected text found: ${text}`);
      }
    }
  }

  async verifyFormDisplayed() {
    await this.form.waitForDisplayed();
    await expect(this.form).toBeDisplayed();
  }

  async scrollIntoViewToFeatureTitle() {
    await this.featureTitle.scrollIntoView();
  }

  async getFeatureTitleText() {
    return await this.featureTitle.getText();
  }

  async allFeatureItemsShouldBeVisible() {
    const items = await this.featureItems;

    for (const item of items) {
      const isVisible = await item.isDisplayed();
      console.log('Visible:', isVisible);
      expect(isVisible).toBe(true);
    }
  }

  async allFeatureItemImagesShouldBeVisible() {
    const images = await this.featureItemImages;

    for (const img of images) {
      await img.scrollIntoView();
      const isVisible = await img.isDisplayed();
      expect(isVisible).toBe(true);
    }
  }

  async getFeatureTitles() {
    const elements = await this.featureItemContentTitles;
    const titles = [];
    for (const el of elements) {
      titles.push(await el.getText());
    }
    return titles;
  }

  async getFeatureTexts() {
    const elements = await this.featureItemContentTexts;
    const texts = [];
    for (const el of elements) {
      texts.push(await el.getText());
    }
    return texts;
  }

  async verifyFeatureContent(expectedTitles, expectedTexts) {
    const actualTitles = await this.getFeatureTitles();
    const actualTexts = await this.getFeatureTexts();

    console.log('Feature titles:', actualTitles);
    console.log('Feature texts:', actualTexts);

    expectedTitles.forEach((title) => {
      expect(actualTitles).toContain(title);
    });

    expectedTexts.forEach((text) => {
      expect(actualTexts).toContain(text);
    });
  }

  async scrollIntoViewToMetricSectionTitle() {
    await this.metricSectionTitle.scrollIntoView();
  }

  async getMetricSectionTitleText() {
    return await this.metricSectionTitle.getText();
  }

  async getMetricValues() {
    const elements = await this.metricTitles;
    const values = [];
    for (const el of elements) {
      const text = await el.getText();
      values.push(text.trim());
    }
    return values;
  }

  async waitForStableMetricValues(timeout = 5000, interval = 200) {
    const endTime = Date.now() + timeout;
    let previousValues = [];
    let stableCounter = 0;

    while (Date.now() < endTime) {
      const elements = await this.metricTitles;
      const currentValues = [];
      for (const el of elements) {
        const text = await el.getText();
        currentValues.push(text.trim());
      }

      if (JSON.stringify(currentValues) === JSON.stringify(previousValues)) {
        stableCounter++;
        if (stableCounter >= 2) {
          return currentValues;
        }
      } else {
        stableCounter = 0;
      }

      previousValues = currentValues;
      await browser.pause(interval);
    }
    return previousValues;
  }

  async verifyMetricValues(expectedValues) {
    const actualValues = await this.waitForStableMetricValues();
    console.log('Metric values:', actualValues);

    expectedValues.forEach((expected) => {
      expect(actualValues).toContain(expected);
    });
  }

  async scrollToSection() {
    await this.testimonialsSection.scrollIntoView();
    await expect(this.testimonialsSection).toBeDisplayed();
  }

  async getActiveSlideText() {
    return await this.activeSlide.getText();
  }

  async cycleSlidesNextUntilRepeat(maxAttempts = 10) {
    const firstSlideText = await this.getActiveSlideText();
    let currentSlideText;
    let attempts = 0;

    do {
      await this.nextArrow.click();
      await browser.pause(2000);
      currentSlideText = await this.getActiveSlideText();
      console.log(`Slide ${attempts + 1}:`, currentSlideText);
      attempts++;
    } while (currentSlideText !== firstSlideText && attempts < maxAttempts);

    expect(currentSlideText).toBe(firstSlideText);
  }

  async cycleSlidesPrevUntilRepeat(maxAttempts = 10) {
    const firstSlideText = await this.getActiveSlideText();
    let currentSlideTextPrev;
    let attemptsPrev = 0;

    do {
      await this.prevArrow.click();
      await browser.pause(2000);
      currentSlideTextPrev = await this.getActiveSlideText();
      console.log(`Return slide ${attemptsPrev + 1}:`, currentSlideTextPrev);
      attemptsPrev++;
    } while (
      currentSlideTextPrev !== firstSlideText &&
      attemptsPrev < maxAttempts
    );

    expect(currentSlideTextPrev).toBe(firstSlideText);
  }

  async validateDotsBehavior() {
    const dots = await this.dots;

    for (let i = 0; i < dots.length; i++) {
      await dots[i].click();

      await browser.waitUntil(
        async () => {
          const text = await this.getActiveSlideText();
          return text.trim().length > 0;
        },
        {
          timeout: 5000,
          timeoutMsg: `Slide text did not load after clicking dot ${i + 1}`,
        }
      );

      const slideText = await this.getActiveSlideText();
      console.log(`Forward slide ${i + 1}:`, slideText);
      expect(slideText.trim().length).toBeGreaterThan(0);
    }

    for (let i = dots.length - 1; i >= 0; i--) {
      await dots[i].click();

      await browser.waitUntil(
        async () => {
          const text = await this.getActiveSlideText();
          return text.trim().length > 0;
        },
        {
          timeout: 5000,
          timeoutMsg: `Slide text did not load after clicking dot ${i + 1}`,
        }
      );

      const slideText = await this.getActiveSlideText();
      console.log(`Backward slide ${i + 1}:`, slideText);
      expect(slideText.trim().length).toBeGreaterThan(0);
    }
  }

  async scrollToFaqSection() {
    await this.faqSection.scrollIntoView();
  }

  async getFaqTitleText() {
    return await this.faqSectionTitle.getText();
  }

  async getFaqQuestionTitlesText() {
    const elements = await this.faqQuestionTitles;
    const titles = [];
    for (const el of elements) {
      titles.push(await el.getText());
    }
    return titles;
  }

  async getFaqQuestionAnswersText() {
    const elements = await this.faqQuestionAnswers;
    const answers = [];
    for (const el of elements) {
      answers.push(await el.getText());
    }
    return answers;
  }
}

export default new TalkToSalesPage();
