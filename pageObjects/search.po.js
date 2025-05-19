class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator("//input[@placeholder='Search colleges, courses, schools ...']");
  }

  async search(keyword) {
    await this.searchInput.type(keyword);
    await this.searchInput.press('Enter');
  }
}

module.exports = { SearchPage };
