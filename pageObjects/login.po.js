class LoginPage {
  constructor(page) {
    this.page = page;
    // XPath selectors for login elements
    this.emailInput = 'xpath=//input[@name="email" or @id="email"]';
    this.passwordInput = 'xpath=//input[@type="password" and (@name="password" or @id="password")]';
    this.submitButton = 'xpath=//button[normalize-space()="Sign In" and @type="submit"]';
  }

  async login(email, password) {
    await this.page.locator(this.emailInput).type(email);
    await this.page.locator(this.passwordInput).type(password);
    await this.page.locator(this.submitButton).click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };