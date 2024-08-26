"use server";
import puppeteer, { executablePath } from "puppeteer";
export async function getProductsByName(search: string) {
  let resp;
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });

    // Create a page
    const page = await browser.newPage();

    await page.goto(
      `https://www.exito.com/s?q=${search}&sort=score_desc&page=0`,
      {
        waitUntil: "load",
      }
    );

    const _resp = await page.waitForResponse(
      "https://www.exito.com/api/graphql?operationName=QuerySearch"
      // { timeout: 15000 }
    );
    resp = await _resp.json();
    await browser.close();
  } catch (error) {
    browser && (await browser.close());
  } finally {
    return JSON.stringify({ resp: resp });
  }
}

async function waitForSpecificResponse(page: any, urlPart: any, timeout: any) {
  return new Promise((resolve, reject) => {
    const handleResponse = async (response: any) => {
      const url = response.url();
      if (url.includes(urlPart)) {
        try {
          const status = response.status();
          const headers = response.headers();
          const data = await response.json();
          resolve({ status, headers, data });
        } catch (error) {
          reject(error);
        } finally {
          page.off("response", handleResponse); // Desvincula el manejador después de recibir la respuesta
        }
      }
    };

    page.on("response", handleResponse);

    // Promesa que se rechaza después del tiempo de espera
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Timeout: La respuesta no llegó a tiempo")),
        timeout
      )
    );

    // Usa Promise.race para ganar la primera promesa que se resuelve o rechaza
    Promise.race([timeoutPromise]).catch(reject); // Rechaza la promesa principal en caso de timeout
  });
}
