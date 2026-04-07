import { Page, Locator, expect } from "@playwright/test";

export class GooglePage {
  private readonly page: Page;

  private readonly searchInput: Locator;
  private readonly searchResults: Locator;

  private readonly consentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page
      .locator('textarea[name="q"], input[name="q"]')
      .first();
    this.searchResults = page.locator("#search");
    this.consentButton = page.locator("#L2AGLb");
  }

  async searchFor(query: string): Promise<void> {
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
    await expect(this.searchResults).toBeVisible();
  }

  async clickResultByHref(href: string): Promise<void> {
    const link: Locator = this.page.locator(`a[href="${href}"]`).first();
    await expect(link).toBeVisible();
    await link.click();
  }

  async clickResultContainingHref(hrefSubstring: string): Promise<void> {
    const link: Locator = this.page
      .locator(`#search a[href*="${hrefSubstring}"]`)
      .first();
    await expect(link).toBeVisible();
    await link.click();
  }
}
