import { Product } from "@/types/products/products.types";
import { ExitoAPIResponse } from "@/types/products/productsExito.types";

export const productsExitoAdapter = (products: any = []): Product[] => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });

  let _products: Product[] = products?.resp?.data?.search.products.edges.map(
    (_product: ExitoAPIResponse) => {
      const { name, image, offers, slug } = _product.node;
      return {
        name,
        image: image?.[0],
        price: {
          lowPrice: offers?.lowPrice,
          price: offers?.offers[0].listPrice,
        },
        brand: _product.node.brand.brandName,
        slug,
        store: "exito.png",
      };
    }
  );
  return _products;
};
