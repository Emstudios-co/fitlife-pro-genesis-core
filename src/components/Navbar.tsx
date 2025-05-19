
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
          ? "bg-black/80 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl">
            <span className="text-gradient bg-gradient-to-r from-secondary to-purple-500">FitLife Pro</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white/80 hover:text-secondary transition-colors"
            >
              Inicio
            </Link>
            <a
              href="#features"
              className="text-white/80 hover:text-secondary transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#faq"
              className="text-white/80 hover:text-secondary transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="secondary" className="hover:bg-secondary/80">Mi dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" className="hover:bg-secondary/80">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <Link
            to="/"
            className="py-2 text-white/80 hover:text-secondary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <a
            href="#features"
            className="py-2 text-white/80 hover:text-secondary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Funcionalidades
          </a>
          <a
            href="#faq"
            className="py-2 text-white/80 hover:text-secondary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </a>
          
          <div className="pt-4 space-y-2 border-t border-white/10">
            {user ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full hover:bg-secondary/80">
                  Mi dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full hover:bg-secondary/80">
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
