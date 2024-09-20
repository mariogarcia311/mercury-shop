export interface Product {
  name: string;
  image: Image;
  price: Price;
  slug: string;
  brand: string;
  store: string;
}

export interface Image {
  url: string;
  alternateName: string;
}

export interface Price {
  lowPrice: number;
  price: number;
}
