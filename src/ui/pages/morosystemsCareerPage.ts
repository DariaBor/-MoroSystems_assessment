import { Page, Locator, expect } from "@playwright/test";

export class MorosystemsCareerPage {
  private readonly page: Page;
  private readonly positionsList: Locator;
  private readonly cityFilterTrigger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.positionsList = page.locator("#pozice");
    this.cityFilterTrigger = page.locator(
      'a[href="#"].inp-custom-select__select',
    );
  }

  async waitForPageReady(): Promise<void> {
    await expect(this.positionsList).toBeVisible();
  }

  async selectCity(city: string): Promise<void> {
    await expect(this.cityFilterTrigger).toBeVisible();
    await this.cityFilterTrigger.click();

    const cityOption: Locator = this.page.locator(
      `label.js-filter__link[data-filter="${city}"]`,
    );
    await expect(cityOption).toBeVisible();
    await cityOption.click();
    await expect
      .poll(async () => {
        const matchingCount = await this.page
          .locator(`.js-filter__item[data-filter*="${city}"]:visible`)
          .count();
        const emptyStateVisible = await this.page
          .locator(".c-positions__empty, .js-filter__empty")
          .isVisible();
        return matchingCount > 0 || emptyStateVisible;
      })
      .toBe(true);
  }

  async verifyResultsContainCity(city: string): Promise<void> {
    const visibleItems: Locator = this.page.locator(
      ".js-filter__item:visible, .c-positions__item",
    );

    const count = await visibleItems.count();
    for (let i = 0; i < count; i++) {
      const item = visibleItems.nth(i);
      const isVisible = await item.isVisible();
      if (!isVisible) continue;

      const dataFilter = await item.getAttribute("data-filter");
      expect(dataFilter).toContain(city);
    }
  }
}
