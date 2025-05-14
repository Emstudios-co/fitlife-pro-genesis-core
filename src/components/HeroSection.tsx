
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-secondary"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent"></div>
      </div>
      
      <div className="container-custom grid md:grid-cols-2 gap-8 relative z-10">
        <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Tu Entrenador Personal de Fitness en Línea
          </h1>
          <p className="text-lg md:text-xl opacity-90 md:pr-10">
            Transforma tu cuerpo y mente con rutinas personalizadas por IA,
            planes nutricionales y una comunidad que te impulsa a alcanzar tus metas.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <a
              href="#signup"
              className="px-8 py-3 bg-secondary text-black text-center font-semibold rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105 duration-300"
            >
              Empieza Gratis
            </a>
            <a
              href="#demo"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/40 text-center font-medium rounded-lg hover:bg-white/20 transition-all"
            >
              Ver Demo
            </a>
          </div>
          <div className="pt-6 flex items-center text-sm">
            <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Sin tarjeta de crédito · Cancela cuando quieras</span>
          </div>
        </div>

        <div className={`flex items-center justify-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent rounded-full opacity-30 animate-pulse-slow"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=870&auto=format&fit=crop"
                alt="FitLife Pro Dashboard"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <p className="text-sm font-medium">Dashboard personalizado con tus métricas</p>
              </div>
            </div>
            <div className="absolute -bottom-8 right-8 bg-white p-3 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-all">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold">+28% progreso este mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full transform translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
