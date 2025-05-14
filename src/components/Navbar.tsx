
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              FitLife<span className="text-accent">Pro</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-neutral-dark hover:text-accent transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#testimonials"
            className="text-neutral-dark hover:text-accent transition-colors"
          >
            Testimonios
          </a>
          <a
            href="#pricing"
            className="text-neutral-dark hover:text-accent transition-colors"
          >
            Precios
          </a>
          <a
            href="#faq"
            className="text-neutral-dark hover:text-accent transition-colors"
          >
            FAQ
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#login"
            className="px-4 py-2 text-primary hover:text-accent transition-colors"
          >
            Iniciar sesión
          </a>
          <a
            href="#signup"
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-all"
          >
            Registrarse
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-md animate-accordion-down">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a
              href="#features"
              className="text-neutral-dark hover:text-accent transition-colors p-2"
            >
              Funcionalidades
            </a>
            <a
              href="#testimonials"
              className="text-neutral-dark hover:text-accent transition-colors p-2"
            >
              Testimonios
            </a>
            <a
              href="#pricing"
              className="text-neutral-dark hover:text-accent transition-colors p-2"
            >
              Precios
            </a>
            <a
              href="#faq"
              className="text-neutral-dark hover:text-accent transition-colors p-2"
            >
              FAQ
            </a>
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="#login"
                className="px-4 py-2 text-center text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-all"
              >
                Iniciar sesión
              </a>
              <a
                href="#signup"
                className="px-4 py-2 text-center bg-accent text-white rounded-md hover:bg-accent/90 transition-all"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
