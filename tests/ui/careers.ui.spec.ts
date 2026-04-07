import { test, expect } from "@playwright/test";
import { GooglePage } from "../../src/ui/pages/googlePage";
import { MorosystemsMainPage } from "../../src/ui/pages/morosystemsMainPage";
import { MorosystemsCareerPage } from "../../src/ui/pages/morosystemsCareerPage";
import cityFilters from "../../src/data/cityFilters.json";
type City = { label: string; value: string };

const mode = process.env.TEST_MODE || "single";

const cities: City[] =
  mode === "all"
    ? cityFilters.cities
    : cityFilters.cities.filter(
        (c: City) => c.value === cityFilters.defaultCity,
      );

const GOOGLE_URL = "https://www.google.com";
const MOROSYSTEMS_CAREER_LINK = "/kariera/";

for (const city of cities) {
  test(`Filter careers by city: ${city.label}`, async ({ page }) => {
    const googlePage = new GooglePage(page);
    const mainPage = new MorosystemsMainPage(page);
    const careerPage = new MorosystemsCareerPage(page);

    await page.goto(GOOGLE_URL);
    await googlePage.searchFor("MoroSystems");
    await expect(page.locator("#search")).toBeVisible();
    await googlePage.clickResultContainingHref("morosystems.cz");
    await mainPage.waitForPageReady();
    await mainPage.clickElementByHref(MOROSYSTEMS_CAREER_LINK);

    await careerPage.waitForPageReady();
    await careerPage.selectCity(city.value);
    if (city.value) {
      await careerPage.verifyResultsContainCity(city.value);
    }
  });
}
