const { test, expect } = require('@playwright/test');
const testData = require('../fixtures/loginFixture.json');
const { LoginPage } = require('../pageObjects/login.po');

test.describe.configure({ timeout: 60000 });

test.describe.serial("Edusanjal Authentication Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://edusanjal.com/account/login");
    await page.locator('xpath=//button[normalize-space()="Sign In"]').click();
    await page.waitForLoadState('networkidle');
  });

  test("Invalid login with malformed email format", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidEmail.email, testData.invalidEmail.password);

    // Check for browser's built-in email validation
    const isValid = await page.locator('input[type="email"]').evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);

    // Optionally log the validation message for debugging
    const msg = await page.locator('input[type="email"]').evaluate(el => el.validationMessage);
    console.log("Browser validation message:", msg);
    await page.waitForTimeout(5000);
  });

  test("Login with valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.email, testData.validUser.password);

    // Wait for Dashboard or avatar to appear indicating successful login
    await expect(
      page.locator('xpath=//*[contains(@class, "user-avatar") or contains(text(), "Dashboard")]').first()
    ).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
