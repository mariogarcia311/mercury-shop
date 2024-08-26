export interface Product {
  name: string;
  image: Image;
  price: Price;
  slug: string;
  brand: string;
}

export interface Image {
  url: string;
  alternateName: string;
}

export interface Price {
  lowPrice: string;
  price: string;
}
