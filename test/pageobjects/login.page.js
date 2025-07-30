import { $ } from '@wdio/globals';
import Page from './page.js';

class LoginPage extends Page {
  get workEmail() {
    return $('#id_username');
  }

  get inputPassword() {
    return $('#id_password');
  }

  get loginButton() {
    return $('button#login-submit');
  }

  get errorMessages() {
    return $$('div.invalid-feedback');
  }

  async login(username, password) {
    await this.workEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.loginButton.click();
  }

  async getErrorMessagesText() {
    const errorMessages = await this.errorMessages;
    if (errorMessages.length === 0) {
      return [];
    }

    const errorTexts = [];
    for (const message of errorMessages) {
      const text = await message.getText();
      errorTexts.push(text);
    }

    return errorTexts;
  }

  async checkErrorMessage(expectedMessage) {
    const errorMessagesText = await this.getErrorMessagesText();
    console.log('Captured Error Messages:', errorMessagesText);

    return errorMessagesText.some((message) => message === expectedMessage);
  }

  async waitForErrorMessages() {
    const errorMessages = await this.errorMessages;

    // Если сообщений об ошибке несколько, ждем появления всех
    if (errorMessages.length > 0) {
      for (const error of errorMessages) {
        await error.waitForDisplayed({ timeout: 5000 });
      }
    } else {
      throw new Error('No error messages found');
    }
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }

  async waitForPageToLoad() {
    await this.workEmail.waitForDisplayed({ timeout: 5000 });
  }
}

export default new LoginPage();
