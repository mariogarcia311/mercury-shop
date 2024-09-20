"use server";
import { Product } from "@/types/products/products.types";
import puppeteer from "puppeteer";
import { currencyToNumber } from "./currencyToNumber";
const querySelectors = {
  products:
    ".ais-InfiniteHits-item.product__item.js-product-item.js-algolia-product-click",
  name: ".product__item__top__title.js-algolia-product-click.js-algolia-product-title",
  brand: ".product__item__information__brand",
  price: ".product__price--discounts__old",
  lowPrice: ".product__price--discounts__price > span.price",
  slug: ".product__item__information__view-details > a.js-view-details",
  image: ".product__item__information__image img",
};

export async function getProductsAlkosto(search: string): Promise<Product[]> {
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
      `https://www.alkosto.com/search?text=${search}&page=1&sort=relevance`,
      {
        waitUntil: "domcontentloaded",
      }
    );
    console.timeEnd("page load: ");
    const _resp = await page.waitForSelector(querySelectors.products);
    const products: Product[] | any = await page.$$eval(
      querySelectors.products,
      (elements, querySelectors) =>
        elements.map((el) => {
          return {
            name: el?.querySelector(querySelectors.name)?.textContent || "",
            image: {
              url: `https://www.alkosto.com/medias${
                el.querySelector(querySelectors.image)?.getAttribute("src") ||
                ""
              }`,
              alternateName:
                el.querySelector(querySelectors.image)?.getAttribute("alt") ||
                "",
            },
            brand: el?.querySelector(querySelectors.brand)?.textContent || "",
            price: {
              price: el?.querySelector(querySelectors.price)?.textContent || "",
              lowPrice:
                el?.querySelector(querySelectors.lowPrice)?.textContent || "",
            },
            slug: `https://www.alkosto.com/medias${
              el?.querySelector(querySelectors.slug)?.getAttribute("href") || ""
            }`,
            store: "alkosto.jpeg",
          };
        }),
      querySelectors
    );
    products.forEach((product: Product) => {
      product.price.price = currencyToNumber(product.price.price as any);
      product.price.lowPrice = currencyToNumber(product.price.lowPrice as any);
    });

    resp = products;
    console.timeEnd("Navigation and API Response");
    await browser.close();
  } catch (error) {
    console.log(error);
    browser && (await browser?.close());
  } finally {
    return resp ?? [];
  }
}
