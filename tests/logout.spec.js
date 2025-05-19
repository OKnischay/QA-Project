const { test, expect } = require('@playwright/test');

test.describe('Edusanjal Logout', () => {
  const credentials = {
    email: 'nischayabasi147@gmail.com',
    password: 'admin@123'
  };

  test.beforeEach(async ({ page }) => {
    // Login sequence with clear verification
    await page.goto('https://edusanjal.com/account/login');
    await page.fill('input[name="email"]', credentials.email);
    await page.fill('input[name="password"]', credentials.password);
    await page.click('button[type="submit"]:has-text("Sign In")');
    
    // Explicit verification of successful login
    await expect(page.locator('div.relative.z-40.inline-block.group')).toBeVisible({ timeout: 10000 }); // User menu button
    
    // Add a delay to allow observation
    await page.waitForTimeout(2000); // Wait for 2 seconds
  });

  test('Successful logout flow', async ({ page }) => {

    const userMenuDropdown = page.locator('div.relative.z-40.inline-block.group ul'); // User menu dropdown (visible when hovering over the user menu)
    await expect(userMenuDropdown).toBeHidden({ timeout: 5000 });

    const userMenuButton = page.locator('div.relative.z-40.inline-block.group button');
    await userMenuButton.hover();

    await page.waitForTimeout(2000); // Wait for 2 seconds

    await expect(userMenuDropdown).toBeVisible({ timeout: 5000 });

    const logoutOption = userMenuDropdown.locator('text=Logout');
    await expect(logoutOption).toBeVisible({ timeout: 5000 });

    await page.waitForTimeout(2000); // Wait for 2 seconds before clicking

    await logoutOption.click();

    await page.waitForTimeout(3000); 

    await expect(page.locator('text=Sign In')).toBeVisible({ timeout: 10000 });


    await expect(page.locator('div.relative.z-40.inline-block.group')).toBeHidden({ timeout: 5000 });
  });
});
