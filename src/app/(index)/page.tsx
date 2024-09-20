import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="py-12 bg-secondary/5">
          <div className="container px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-primary">
              Bienvenido a TuMejorPrecio
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-background border-primary">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-primary">
                    Ofertas del día
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    ¡No te pierdas nuestras increíbles ofertas diarias!
                  </p>
                  <Button variant="secondary">Ver ofertas</Button>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-primary">
                    Nuevos productos
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Descubre las últimas novedades en nuestra tienda.
                  </p>
                  <Button variant="secondary">Explorar</Button>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-primary">
                    Categorías populares
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Encuentra rápidamente lo que buscas.
                  </p>
                  <Button variant="secondary">Ver categorías</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-primary">
              Productos destacados
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <Card key={product} className="bg-background border-primary">
                  <CardContent className="p-4">
                    <img
                      src={`/images/default.jpg`}
                      alt={`Producto ${product}`}
                      className="w-full h-48 object-cover mb-4 bg-secondary/20"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Producto {product}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Descripción corta del producto...
                    </p>
                    <div className="flex flex-wrap justify-between items-center">
                      <span className="text-xl font-bold text-accent">
                        $99.99
                      </span>
                      <Button size="sm">Agregar al carrito</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
