
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920')]  bg-cover bg-center opacity-10"></div>
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tu Entrenador Personal de Fitness <span className="text-secondary">en Línea</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 md:pr-12 text-white/80">
              Rutinas personalizadas, planes nutricionales y seguimiento de progreso con inteligencia artificial para tu transformación completa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" variant="secondary" className="text-black font-bold px-8">
                    Ir a mi Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" variant="secondary" className="text-black font-bold px-8">
                      Empieza Gratis
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:text-white hover:bg-white/20">
                      Iniciar sesión
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/women/42.jpg"
                  alt="User"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/men/35.jpg"
                  alt="User"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                  alt="User"
                />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-black ring-2 ring-white">
                  +5k
                </div>
              </div>
              <p className="ml-4 text-sm text-white/80">
                Más de 5,000 personas transformaron su vida este mes
              </p>
            </div>
          </div>

          <div className="md:col-span-5 hidden md:flex items-center">
            <div className="w-full h-full relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&h=750&auto=format"
                alt="Fitness training"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold text-black">En vivo</span>
                </div>
                <p className="text-sm text-black">
                  <strong>357 personas</strong> entrenando ahora
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-12"></div>
    </section>
  );
};

export default HeroSection;
