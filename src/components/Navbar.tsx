
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl text-primary">
            <span className="text-accent">Fit</span>Life Pro
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-neutral-dark hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <a
              href="#features"
              className="text-neutral-dark hover:text-primary transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#testimonials"
              className="text-neutral-dark hover:text-primary transition-colors"
            >
              Testimonios
            </a>
            <a
              href="#pricing"
              className="text-neutral-dark hover:text-primary transition-colors"
            >
              Precios
            </a>
            <a
              href="#faq"
              className="text-neutral-dark hover:text-primary transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="default">Mi dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <Link
            to="/"
            className="py-2 text-neutral-dark hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <a
            href="#features"
            className="py-2 text-neutral-dark hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Funcionalidades
          </a>
          <a
            href="#testimonials"
            className="py-2 text-neutral-dark hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonios
          </a>
          <a
            href="#pricing"
            className="py-2 text-neutral-dark hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Precios
          </a>
          <a
            href="#faq"
            className="py-2 text-neutral-dark hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </a>
          
          <div className="pt-4 space-y-2 border-t border-neutral-light">
            {user ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Mi dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
