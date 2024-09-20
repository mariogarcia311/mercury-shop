"use client";
import Link from "next/link";
import React from "react";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="bg-background-secondary py-6">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground-secondary">
              Acerca de nosotros
            </h3>
            <p className="text-muted-foreground">
              TuMejorPrecio es tu destino para encontrar los mejores productos
              al mejor precio.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground-secondary">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary-hover"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary-hover"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary-hover"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground-secondary">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-hover"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-hover"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-hover"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; 2023 TuMejorPrecio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
