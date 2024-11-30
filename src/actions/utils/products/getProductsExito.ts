"use server";
import { productsExitoAdapter } from "@/adapters/products/productsExitoAdapter";
import { GetProductsByName } from "@/types/products/getProductsByName.types";
import puppeteer from "puppeteer";
export async function getProductsExito({
  productName,
  pageNumber,
}: GetProductsByName) {
  let resp;
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-features=site-per-process"],
    });

    // Create a page
    const page = await browser.newPage();
    // console.time("Navigation and API Response");
    // console.time("page load: ");
    await page.goto(
      `https://www.exito.com/s?q=${productName}&sort=score_desc&page=${pageNumber}`,
      {
        waitUntil: "domcontentloaded",
      }
    );
    // console.timeEnd("page load: ");
    const _resp = await page.waitForResponse(
      "https://www.exito.com/api/graphql?operationName=QuerySearch",
      { timeout: 15000 }
    );
    resp = await _resp.json();

    resp = productsExitoAdapter({ resp });

    // console.timeEnd("Navigation and API Response");
    await browser.close();
  } catch (error) {
    browser && (await browser?.close());
  } finally {
    return resp;
  }
}
