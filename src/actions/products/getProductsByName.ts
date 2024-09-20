"use server";
import { getProductsExito } from "../utils/products/getProductsExito";
import { getProductsAlkosto } from "../utils/products/getProductsAlkosto";
import { Product } from "../../types/products/products.types";
export async function getProductsByName(search: string) {
  let resp: Product[] | any;
  let browser;
  try {
    const [respExito, respAlkosto] = await Promise.all([
      getProductsExito(search),
      getProductsAlkosto(search),
    ]);

    resp = [...respExito, ...respAlkosto]
      .filter(
        (_product: Product) => _product.price.price || _product.price.lowPrice
      )
      .sort((a: Product, b: Product) => {
        const a_price = a.price.lowPrice ?? a.price.price;
        const b_price = b.price.lowPrice ?? b.price.price;
        return b_price - a_price;
      });
  } catch (error) {
  } finally {
    return JSON.stringify({ resp: resp });
  }
}
