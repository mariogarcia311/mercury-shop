"use server";
import { getProductsExito } from "../utils/products/getProductsExito";
import { getProductsAlkosto } from "../utils/products/getProductsAlkosto";
import { Product } from "../../types/products/products.types";
import { GetProductsByName } from "@/types/products/getProductsByName.types";
export async function getProductsByName({
  productName,
  pageNumber = "0",
  orderBy = "relevance",
}: GetProductsByName) {
  let resp: Product[] | any;
  let browser;
  try {
    const [respExito, respAlkosto] = await Promise.all([
      getProductsExito({ productName, pageNumber, orderBy }),
      getProductsAlkosto({ productName, pageNumber, orderBy }),
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
