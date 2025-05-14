
import React from "react";
import Counter from "./Counter";

const ValueProposition = () => {
  return (
    <section className="section-padding bg-white" id="value">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-accent">Millones</span> ya transformaron sus vidas
          </h2>
          <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
            Únete a la comunidad de FitLife Pro y alcanza tus objetivos con un plan personalizado basado en ciencia y tecnología.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          <div className="bg-neutral-light rounded-xl p-6 text-center feature-card">
            <Counter end={250000} suffix="+" />
            <p className="mt-2 text-neutral-dark/80 font-medium">Usuarios activos</p>
          </div>
          <div className="bg-neutral-light rounded-xl p-6 text-center feature-card">
            <Counter end={92} suffix="%" />
            <p className="mt-2 text-neutral-dark/80 font-medium">Tasa de éxito</p>
          </div>
          <div className="bg-neutral-light rounded-xl p-6 text-center feature-card">
            <Counter end={5200} suffix="+" />
            <p className="mt-2 text-neutral-dark/80 font-medium">Entrenamientos personalizados</p>
          </div>
          <div className="bg-neutral-light rounded-xl p-6 text-center feature-card">
            <Counter end={180} suffix="+" prefix="$" />
            <p className="mt-2 text-neutral-dark/80 font-medium">Ahorro mensual promedio</p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Por qué elegir FitLife Pro?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-dark">
                    <strong className="font-semibold">Entrenador AI</strong> que se adapta a tu progreso en tiempo real
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-dark">
                    <strong className="font-semibold">Nutrición personalizada</strong> con planes adaptados a tus objetivos
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-dark">
                    <strong className="font-semibold">Comunidad activa</strong> que te mantiene motivado y comprometido
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-dark">
                    <strong className="font-semibold">Integración completa</strong> con tus wearables favoritos
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1461800919507-79b16743b257?q=80&w=1470&auto=format&fit=crop"
                  alt="Workout Results"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs transform rotate-3 hidden md:block">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold">Actualizado hace 2 min</span>
                </div>
                <p className="text-sm">
                  "¡Acabo de completar mi rutina de 30 días! -8kg y me siento increíble"
                </p>
                <div className="mt-2 text-xs text-neutral-dark/60">
                  María G. - Miembro Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
