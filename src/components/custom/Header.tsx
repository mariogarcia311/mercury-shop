"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

export const Header = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background-secondary/90">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-secondary">MercuryShop</span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <Input
            className="w-[300px]"
            placeholder="Buscar productos..."
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
          <Button
            size="icon"
            className="ml-2 bg-secondary text-secondary-foreground"
            onClick={handleSearchSubmit}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
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
        <div className="md:hidden bg-background-secondary">
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
  );
};
