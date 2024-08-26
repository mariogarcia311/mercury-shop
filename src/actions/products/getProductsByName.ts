"use server";
import puppeteer, { executablePath } from "puppeteer";
export async function getProductsByName(search: string) {
  let resp;
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-features=site-per-process"],
    });

    // Create a page
    const page = await browser.newPage();
    console.time("Navigation and API Response");
    console.time("page load: ");
    await page.goto(
      `https://www.exito.com/s?q=${search}&sort=score_desc&page=0`,
      {
        waitUntil: "domcontentloaded",
      }
    );
    console.timeEnd("page load: ");
    const _resp = await page.waitForResponse(
      "https://www.exito.com/api/graphql?operationName=QuerySearch",
      { timeout: 15000 }
    );
    resp = await _resp.json();
    console.timeEnd("Navigation and API Response");
    await browser.close();
  } catch (error) {
    browser && (await browser?.close());
  } finally {
    return JSON.stringify({ resp: resp });
  }
}
