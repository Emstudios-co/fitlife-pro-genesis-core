
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "¿Cómo personaliza FitLife Pro mis entrenamientos?",
      answer:
        "Nuestro algoritmo de IA analiza tu nivel de condición física, objetivos, preferencias y progreso para crear un plan específicamente diseñado para ti. A medida que avanzas, el sistema se adapta automáticamente para asegurar que siempre estés progresando de manera óptima.",
    },
    {
      question: "¿Con qué dispositivos wearables es compatible?",
      answer:
        "FitLife Pro es compatible con Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch, Polar y muchos más. Nuestra API unificada permite sincronizar datos de actividad, sueño y ritmo cardíaco de manera fluida y en tiempo real.",
    },
    {
      question: "¿Puedo usar FitLife Pro si soy principiante?",
      answer:
        "¡Absolutamente! FitLife Pro está diseñado para todos los niveles de condición física. Si eres principiante, el sistema comenzará con rutinas adecuadas para tu nivel y te guiará paso a paso con tutoriales detallados y videos explicativos.",
    },
    {
      question: "¿Cómo funciona el plan de nutrición?",
      answer:
        "Nuestros planes de nutrición se crean según tus preferencias alimenticias, alergias, objetivos de fitness y horario de comidas. El plan se ajusta automáticamente según tu actividad diaria y progreso. Incluye recetas deliciosas, listas de compras y alternativas para diferentes situaciones.",
    },
    {
      question: "¿Puedo cambiar o cancelar mi suscripción en cualquier momento?",
      answer:
        "Sí, puedes cambiar entre planes o cancelar tu suscripción en cualquier momento desde la sección de 'Mi cuenta'. Si cancelas, tendrás acceso a las funciones premium hasta el final del período facturado. No hay cargos ocultos ni penalizaciones por cancelación.",
    },
    {
      question: "¿FitLife Pro ofrece soporte para lesiones o condiciones especiales?",
      answer:
        "Sí, al configurar tu perfil puedes indicar cualquier lesión o condición que requiera atención especial. Nuestro sistema adaptará tus rutinas para evitar ejercicios que puedan causar problemas y sugerirá alternativas seguras. Para condiciones médicas complejas, recomendamos consultar con un profesional de la salud.",
    },
  ];

  return (
    <section className="section-padding bg-neutral-light" id="faq">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas <span className="text-accent">frecuentes</span>
          </h2>
          <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre FitLife Pro y cómo
            puede ayudarte a alcanzar tus metas de fitness.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-neutral-dark/10 bg-white rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-neutral-light/50 transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-neutral-dark/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-neutral-dark/80">
            ¿No encuentras lo que buscas? Contacta con nuestro equipo de soporte
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
