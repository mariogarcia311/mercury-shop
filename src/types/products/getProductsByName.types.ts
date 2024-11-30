export interface GetProductsByName {
  productName: string;
  pageNumber: string;
  orderBy?: "relevance" | "priceAsc" | "priceDesc" | "newest";
}
