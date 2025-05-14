
import React, { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: string;
    quarterly: string;
    annual: string;
  };
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
  color: string;
  save?: string;
}

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("monthly");

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Free",
      price: {
        monthly: "0€",
        quarterly: "0€",
        annual: "0€",
      },
      description: "Ideal para comenzar tu viaje fitness",
      features: [
        "3 rutinas de entrenamiento básicas",
        "Plan de nutrición básico",
        "1 integración con wearable",
        "Acceso a comunidad limitado",
        "Estadísticas básicas",
      ],
      popular: false,
      cta: "Comenzar Gratis",
      color: "border-neutral-light hover:border-neutral-dark/50",
    },
    {
      id: "pro",
      name: "Premium",
      price: {
        monthly: "19.99€",
        quarterly: "49.99€",
        annual: "179.99€",
      },
      description: "Para quienes buscan resultados reales",
      features: [
        "Rutinas personalizadas ilimitadas",
        "Plan de nutrición avanzado",
        "Todas las integraciones con wearables",
        "Acceso completo a la comunidad",
        "Analíticas avanzadas",
        "Soporte prioritario 24/7",
      ],
      popular: true,
      cta: "Comenzar 7 días gratis",
      color: "border-accent hover:border-accent",
      save: "Ahorra 60€",
    },
    {
      id: "enterprise",
      name: "Corporativo",
      price: {
        monthly: "Contactar",
        quarterly: "Contactar",
        annual: "Contactar",
      },
      description: "Solución fitness completa para empresas",
      features: [
        "Todo lo de Premium",
        "Dashboard para administrador",
        "Seguimiento de equipo",
        "Retos corporativos",
        "API personalizada",
        "Gerente de cuenta dedicado",
      ],
      popular: false,
      cta: "Contactar Ventas",
      color: "border-secondary hover:border-secondary",
    },
  ];

  return (
    <section className="section-padding bg-white" id="pricing">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes <span className="text-accent">para todos</span>
          </h2>
          <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto mb-8">
            Elige el plan que mejor se adapte a tus objetivos y comienza tu
            transformación hoy.
          </p>

          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-lg bg-neutral-light">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white shadow-sm text-primary"
                    : "text-neutral-dark/80 hover:text-primary"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Mensual
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  billingCycle === "quarterly"
                    ? "bg-white shadow-sm text-primary"
                    : "text-neutral-dark/80 hover:text-primary"
                }`}
                onClick={() => setBillingCycle("quarterly")}
              >
                Trimestral
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  billingCycle === "annual"
                    ? "bg-white shadow-sm text-primary"
                    : "text-neutral-dark/80 hover:text-primary"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Anual
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "border-accent relative scale-105 shadow-xl"
                  : `${plan.color} shadow-lg`
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MÁS POPULAR
                  </div>
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">
                      {plan.price[billingCycle]}
                    </span>
                    {billingCycle !== "annual" && 
                      plan.id !== "enterprise" && (
                        <span className="text-neutral-dark/60 ml-2 pb-1">
                          /mes
                        </span>
                      )}
                  </div>
                  {plan.save && billingCycle === "annual" && (
                    <div className="mt-1">
                      <span className="text-green-600 text-sm font-medium">
                        {plan.save} al año
                      </span>
                    </div>
                  )}
                  <p className="mt-2 text-neutral-dark/70 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="mt-1 w-4 h-4 text-accent flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-neutral-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <a
                    href="#"
                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                      plan.popular
                        ? "bg-accent hover:bg-accent/90 text-white"
                        : plan.id === "enterprise"
                        ? "bg-secondary hover:bg-secondary/90 text-black"
                        : "bg-primary hover:bg-primary/90 text-white"
                    } transition-colors`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-dark/60 max-w-2xl mx-auto">
            Todos los planes incluyen acceso a la app FitLife Pro para iOS y
            Android. Puedes cancelar tu suscripción en cualquier momento. Para
            más información, consulta nuestros{" "}
            <a href="#" className="text-accent underline">
              términos y condiciones
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
