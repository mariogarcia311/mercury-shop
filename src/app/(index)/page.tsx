"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">MercuryShop</span>
          </Link>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <Input
              className="w-[300px]"
              placeholder="Buscar productos..."
              type="search"
            />
            <Button
              size="icon"
              className="ml-2 bg-secondary text-secondary-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-primary">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-background">
            <div className="px-4 py-2">
              <Input placeholder="Buscar productos..." type="search" />
              <Button
                size="sm"
                className="mt-2 w-full bg-secondary text-secondary-foreground"
              >
                Buscar
              </Button>
            </div>
            <nav className="px-4 py-2">
              <Link
                href="/categories"
                className="block py-2 text-primary hover:text-accent"
              >
                Categorías
              </Link>
              <Link
                href="/offers"
                className="block py-2 text-primary hover:text-accent"
              >
                Ofertas
              </Link>
              <Link
                href="/account"
                className="block py-2 text-primary hover:text-accent"
              >
                Mi Cuenta
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="py-12 bg-secondary/10">
          <div className="container px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-primary">
              Bienvenido a MercuryShop
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
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Ver ofertas
                  </Button>
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
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Explorar
                  </Button>
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
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Ver categorías
                  </Button>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <Card key={product} className="bg-background border-primary">
                  <CardContent className="p-4">
                    <img
                      src={`/placeholder.svg?height=200&width=200&text=Producto ${product}`}
                      alt={`Producto ${product}`}
                      className="w-full h-48 object-cover mb-4 bg-secondary/20"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Producto {product}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Descripción corta del producto...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-accent">
                        $99.99
                      </span>
                      <Button
                        size="sm"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary/10 py-6">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Acerca de nosotros
              </h3>
              <p className="text-muted-foreground">
                MercuryShop es tu destino para encontrar los mejores productos
                al mejor precio.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Enlaces rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-accent"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-accent"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-accent"
                  >
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Síguenos
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-accent">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 MercuryShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
