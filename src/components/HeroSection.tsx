
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Kaleidoscopic gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-purple-800/30 to-fuchsia-500/30 animate-[kaleidoscopic-animate_20s_ease_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,40,180,0.3)_0%,transparent_70%)]"></div>
        <div className="absolute -inset-full top-0 z-10 h-full w-[300%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25"></div>
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span>Tu entrenador de fitness con IA</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-secondary">
            Transforma tu cuerpo. <br />Mejora tu vida.
          </h1>
          
          <p className="text-xl mb-8 text-white/80 max-w-2xl">
            Rutinas personalizadas, planes nutricionales y seguimiento de progreso con inteligencia artificial para tu transformación completa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-black font-bold px-8 hover:scale-105 transition-transform">
                  Mi Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="text-black font-bold px-8 hover:scale-105 transition-transform">
                    Empieza Gratis <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white/30 text-white bg-black/40 backdrop-blur-sm hover:bg-white/10 hover:text-white hover:scale-105 transition-transform">
                    Iniciar Sesión
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 glass-card p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="flex -space-x-3">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
                  src="https://randomuser.me/api/portraits/women/42.jpg" alt="User" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
                  src="https://randomuser.me/api/portraits/men/35.jpg" alt="User" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
                  src="https://randomuser.me/api/portraits/women/26.jpg" alt="User" />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-medium text-black ring-2 ring-black">
                  +5k
                </div>
              </div>
              <p className="text-sm text-white/80">
                Más de 5,000 personas transformaron su vida este mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
