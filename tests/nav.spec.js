const { test, expect } = require('@playwright/test');

test.describe.serial("Edusanjal Automated Navigation Tests", () => {
  // Configuration for navigation
  const navigationConfig = {
    baseUrl: "https://edusanjal.com/",
    navigationDelay: 4000, // 5 seconds between navigations
    navigations: [
        { 
          linkText: "Courses", 
          urlPattern: /.*course/, 
          expectedHeadings: ['Courses'] 
        },
      { 
        linkText: "Colleges", 
        urlPattern: /.*college/, 
        expectedHeadings: ['Colleges'] 
      },
      { 
          linkText: "Exams", 
          urlPattern: /.*exam/, 
          expectedHeadings: ['Exams'] 
        },
        { 
            linkText: "Degree", 
            urlPattern: /.*degree/, 
            expectedHeadings: ['Degree'] 
        },
        { 
          linkText: "News", 
          urlPattern: /.*news/, 
          expectedHeadings: ['News'] 
        },
        { 
            linkText: "Blogs", 
        urlPattern: /.*blog/, 
        expectedHeadings: ['Blogs'] 
      }
    ]
  };

  test("Automated Navigation Sequence", async ({ page }) => {
    test.setTimeout(60000);
    // Go to base URL
    await page.goto(navigationConfig.baseUrl);

    // Iterate through navigation sequence
    for (const navigation of navigationConfig.navigations) {
      // Click on the specified navigation link
      await page.click(`a:has-text("${navigation.linkText}")`);

      // Verify URL
      await expect(page).toHaveURL(navigation.urlPattern);

      // Verify page headings
      await expect(page.locator('h1, h2')).toContainText(navigation.expectedHeadings);

      // Log the navigation
      console.log(`Navigated to ${navigation.linkText} page`);

      // Wait for specified delay before next navigation
      console.log(`Waiting ${navigationConfig.navigationDelay}ms before next navigation...`);
      await page.waitForTimeout(navigationConfig.navigationDelay);
    }
  });
});