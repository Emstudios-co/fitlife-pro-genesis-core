
import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  achievement: string;
}

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Méndez",
      role: "Profesional / 35 años",
      content:
        "FitLife Pro transformó mi rutina diaria. En 3 meses perdí 12kg y mi nivel de energía se disparó. La personalización del entrenador AI es impresionante, realmente adapta los entrenamientos a mi progreso.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&auto=format&fit=crop&q=80",
      achievement: "Perdió 12kg en 3 meses",
    },
    {
      id: 2,
      name: "Ana Torres",
      role: "Madre / 42 años",
      content:
        "Como madre ocupada, nunca encontraba tiempo para ejercitarme. Con FitLife Pro, puedo hacer entrenamientos efectivos en solo 20 minutos y los planes de comidas han sido perfectos para toda la familia.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop&q=80",
      achievement: "Recuperó su forma después de 2 embarazos",
    },
    {
      id: 3,
      name: "Miguel Ángel",
      role: "Estudiante / 24 años",
      content:
        "La integración con mi Apple Watch es perfecta, y la comunidad me motiva a seguir superándome. He participado en 3 retos grupales y he alcanzado metas que nunca pensé posibles.",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&auto=format&fit=crop&q=80",
      achievement: "Aumentó 5kg de músculo",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-primary" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Lo que dicen <span className="text-secondary">nuestros usuarios</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Miles de personas ya transformaron sus vidas con FitLife Pro. Conoce
            algunas de sus historias.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <div className="relative h-full">
                  <div className="w-full h-64 md:h-full bg-neutral-light">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:from-black/0 md:to-transparent md:bg-gradient-to-l">
                    <div className="absolute bottom-0 left-0 p-4 md:hidden">
                      <div className="text-white">
                        <h3 className="font-bold text-xl">
                          {testimonials[activeTestimonial].name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="hidden md:block mb-4">
                    <h3 className="font-bold text-2xl text-primary">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-neutral-dark/70 text-sm">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-secondary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>

                    <blockquote
                      className={`text-lg md:text-xl font-medium leading-relaxed ${
                        isAnimating ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-500`}
                    >
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>
                  </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between">
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium inline-block mb-4 md:mb-0">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{testimonials[activeTestimonial].achievement}</span>
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setActiveTestimonial(index);
                            setIsAnimating(false);
                          }, 500);
                        }}
                        className={`w-2 h-2 rounded-full ${
                          activeTestimonial === index
                            ? "bg-accent w-6"
                            : "bg-neutral-light"
                        } transition-all duration-300`}
                        aria-label={`Ver testimonio ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Activity */}
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-[250px] transform rotate-2 hidden lg:block animate-pulse-slow">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs font-bold">En vivo</span>
            </div>
            <p className="text-sm">
              <strong>357 personas</strong> completaron su entrenamiento en la última hora
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
