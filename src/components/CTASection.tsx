
import React from "react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-90"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl">
            Comienza tu transformación hoy mismo
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Únete a miles de personas que ya cambiaron sus vidas con FitLife Pro. 
            Los primeros 7 días son gratis, sin compromiso.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#signup"
              className="px-8 py-4 bg-secondary text-black font-bold rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105 duration-300"
            >
              Empieza Gratis
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/20 text-white font-medium border border-white/30 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
            >
              Contactar Ventas
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=80"
                alt="Usuario 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&auto=format&fit=crop&q=80"
                alt="Usuario 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&q=80"
                alt="Usuario 3"
              />
            </div>
            <span className="text-sm text-white/80">
              <span className="font-bold text-white">237 personas</span> se unieron esta semana
            </span>
          </div>
        </div>
      </div>
      
      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 140">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,140L1360,140C1280,140,1120,140,960,140C800,140,640,140,480,140C320,140,160,140,80,140L0,140Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
