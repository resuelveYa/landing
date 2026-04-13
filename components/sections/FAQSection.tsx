'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Qué incluye el plan gratuito?',
      answer: 'El plan Free incluye 50 análisis IA al mes, 100 transacciones mensuales, 1 organización, 5 exportaciones y acceso completo a ambas herramientas (Budget Analyzer y Cash Flow). Es perfecto para probar el sistema sin compromisos.',
    },
    {
      question: '¿Cómo funciona el análisis con IA de presupuestos?',
      answer: 'Nuestro Budget Analyzer utiliza inteligencia artificial entrenada específicamente en proyectos de construcción. Analiza tu presupuesto línea por línea, detecta errores comunes, identifica omisiones y sugiere optimizaciones de costos. Todo en menos de 2 minutos.',
    },
    {
      question: '¿Puedo gestionar múltiples negocios?',
      answer: 'Sí, dependiendo de tu plan. El plan Free permite 1 organización, Starter hasta 3, Professional hasta 10, y Enterprise organizaciones ilimitadas. Cada organización mantiene sus datos completamente separados.',
    },
    {
      question: '¿Mis datos están seguros?',
      answer: 'Absolutamente. Utilizamos encriptación de nivel bancario (TLS 1.3) para todas las transmisiones de datos y almacenamiento cifrado en servidores seguros. Tus datos nunca se comparten con terceros y cumplimos con normativas de protección de datos.',
    },
    {
      question: '¿Puedo exportar mis datos y reportes?',
      answer: 'Sí, todos los planes incluyen exportación de datos. El plan Free permite 5 exportaciones mensuales, Starter 50, y Professional/Enterprise exportaciones ilimitadas. Puedes exportar en formato PDF y Excel.',
    },
    {
      question: '¿Qué pasa si supero los límites de mi plan?',
      answer: 'Te notificaremos cuando estés cerca de alcanzar tus límites. Si los superas, simplemente no podrás realizar más acciones hasta el siguiente período de reset (mensual) o puedes actualizar tu plan en cualquier momento sin perder datos.',
    },
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican inmediatamente y el precio se prorratea. No hay penalizaciones por cambiar de plan ni contratos de permanencia.',
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Todos los planes incluyen soporte por email. Los planes Starter y Professional incluyen soporte prioritario con respuesta en menos de 24 horas. El plan Enterprise incluye soporte dedicado 24/7 con SLA garantizado.',
    },
    {
      question: '¿Necesito instalar algún software?',
      answer: 'No, Resuelve YA es 100% web. Funciona desde cualquier navegador moderno (Chrome, Firefox, Safari, Edge) en computadores, tablets y móviles. Solo necesitas conexión a internet.',
    },
    {
      question: '¿Ofrecen capacitación para empresas?',
      answer: 'El plan Enterprise incluye onboarding personalizado y capacitación para tu equipo. Para otros planes, ofrecemos documentación completa, tutoriales en video y webinars mensuales gratuitos.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Resolvemos tus dudas sobre Resuelve YA
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-gray-600 mb-4">
            Nuestro equipo está aquí para ayudarte
          </p>
          <a
            href="mailto:soporte@licitex.cl"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <span>Contactar Soporte</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}