"use client";
import { getProductsByName } from "@/actions/products/getProductsByName";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types/products/products.types";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductSkeleton } from "@/components/custom/Product/ProductSkeleton";
import { NumberToCurrency } from "@/actions/utils/products/currencyToNumber";

const Page = () => {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>();

  useEffect(() => {
    setProducts(null);
    const getServer = async () => {
      let _resp;
      const _param = params.get("search");
      _param && (_resp = await getProductsByName(_param));
      setProducts(JSON.parse(_resp || "").resp);

      // setProducts(
      //   productsExitoAdapter(
      //     JSON.parse(window.localStorage.getItem("products") || "")
      //   )
      // );
    };
    getServer();
  }, [params]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Productos</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/4">
          <Card className="bg-background border-primary/20">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Filtros
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-primary">
                    Categoría
                  </label>
                  <Select>
                    <SelectTrigger className="border-primary/20">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electrónicos</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-primary">
                    Precio
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="border-primary/20"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      className="border-primary/20"
                    />
                  </div>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Aplicar filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Mostrando 1-12 de 100 productos
            </span>
            <Select>
              <SelectTrigger className="w-[180px] border-primary/20">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem value="name">Nombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              ? products?.map((_product) => (
                  <Card
                    key={_product.slug}
                    className="bg-background border-primary/20"
                  >
                    <CardContent className="p-4 relative">
                      <div className=" absolute top-1 right-2 h-8 w-14">
                        <img
                          src={`images/stores/${_product.store}`}
                          alt={_product.store}
                        />
                      </div>
                      <div className="w-full flex justify-center">
                        <img
                          src={_product.image.url}
                          alt={_product.image.alternateName}
                          className="h-48 w-48 mb-4 bg-skeleton"
                        />
                      </div>

                      <h3
                        className="text-lg font-semibold mb-2 text-primary truncated-text"
                        title={_product.name}
                      >
                        {_product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {_product.brand}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-secondary ">
                          {_product.price.lowPrice
                            ? NumberToCurrency(_product.price.lowPrice)
                            : NumberToCurrency(_product.price.price)}
                        </span>
                        <Button
                          size="sm"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        >
                          <span className="mr-2">Agregar</span>{" "}
                          <ShoppingCart className="h-6 w-6" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_i) => (
                  <ProductSkeleton key={_i} />
                ))}
          </div>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Page;
