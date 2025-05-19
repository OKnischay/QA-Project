const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pageObjects/search.po');

test.describe.serial("Search Functionality", () => {
  test("Search with a valid keyword", async ({ page }) => {
    await page.goto("https://edusanjal.com/");
    const search = new SearchPage(page);
    await search.search("engineering");

      const resultsLocator = page.locator('div.grid >> text=engineering');

    // Pause to view the result page
    await page.waitForTimeout(8000);
  });

  test("Search with an invalid keyword", async ({ page }) => {
    await page.goto("https://edusanjal.com/");
    const search = new SearchPage(page);
    await search.search("xyz123$$$");

    // Wait for 'No results found' message
      await expect(page.locator('text=No results found')).toBeVisible();

    // Pause to view the result page
    await page.waitForTimeout(5000);
  });
});
