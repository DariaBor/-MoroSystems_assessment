import { Page, Locator, expect } from "@playwright/test";

export class MorosystemsMainPage {
  private readonly page: Page;
  private readonly mainNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainNav = page.locator("#main");
  }

  async waitForPageReady(): Promise<void> {
    await expect(this.mainNav).toBeVisible();
  }

  async clickElementByHref(href: string): Promise<void> {
    const element: Locator = this.page.locator(`a[href="${href}"]`);
    await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible();
    await element.click();
  }
}
