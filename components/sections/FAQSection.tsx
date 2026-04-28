'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Para qué tipo de licitaciones sirve licitex?',
      answer: 'licitex está diseñado para licitaciones publicadas en Mercado Público (mercadopublico.cl), especialmente licitaciones de municipalidades y organismos públicos. Funciona con Licitaciones Públicas (LP), Licitaciones en Convenio Marco (LE) y Licitaciones Simplificadas (L1). Es ideal para empresas de obras civiles, servicios profesionales y suministros.',
    },
    {
      question: '¿Cómo sube las bases de licitación de Mercado Público?',
      answer: 'Descarga los documentos de la licitación desde mercadopublico.cl (bases técnicas, bases administrativas, presupuesto referencial) y súbelos directamente a licitex en formato PDF o Excel. La IA los procesa automáticamente sin necesidad de configuración previa.',
    },
    {
      question: '¿Qué tan precisos son los precios de referencia?',
      answer: 'Los precios de referencia se basan en datos históricos de licitaciones adjudicadas en Chile, precios de materiales de construcción publicados por la Cámara Chilena de la Construcción y valores del mercado actualizado. Se actualizan periódicamente para reflejar variaciones de IPC y mercado.',
    },
    {
      question: '¿Puedo subir presupuestos en Excel con fórmulas?',
      answer: 'Sí. licitex procesa archivos .xlsx y .xls con fórmulas, tablas dinámicas y múltiples hojas. También acepta PDF (incluyendo escaneos con OCR) y archivos CSV. Si tu presupuesto tiene un formato muy específico, contáctanos para ajustar el procesamiento.',
    },
    {
      question: '¿Qué pasa si la licitación tiene documentos confidenciales?',
      answer: 'Tus documentos se procesan con encriptación en tránsito y en reposo. No se comparten con terceros ni se usan para entrenar modelos de IA. Puedes eliminar tus documentos en cualquier momento desde tu cuenta. Cumplimos con la Ley N° 19.628 de Protección de la Vida Privada.',
    },
    {
      question: '¿El sistema detecta errores aritméticos en el presupuesto?',
      answer: 'Sí. Además de partidas faltantes y precios fuera de rango, licitex verifica la consistencia matemática del presupuesto: totales de partidas, subtotales por ítem, aplicación de gastos generales, utilidad e IVA. Uno de los errores más frecuentes que causan descalificaciones.',
    },
    {
      question: '¿Puedo usar licitex si ya fui adjudicado?',
      answer: 'Sí. El módulo de Flujo de Caja te permite hacer seguimiento financiero del proyecto adjudicado: controlar estados de pago, proyectar liquidez mensual, registrar gastos por centro de costo y generar informes para tu contraparte técnica en la municipalidad.',
    },
    {
      question: '¿Hay un contrato de permanencia?',
      answer: 'No. Todos los planes son mensuales y puedes cancelar cuando quieras. Si cancelas, mantienes acceso hasta el fin del período pagado. Tus datos se conservan por 30 días antes de eliminarse permanentemente.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-black text-white mb-4">Preguntas frecuentes</h2>
          <p className="text-slate-400">Todo lo que necesitas saber antes de empezar</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all ${
                openIndex === index
                  ? 'bg-slate-800/80 border-blue-500/40'
                  : 'bg-slate-800/30 border-slate-700/40 hover:border-slate-600/60'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-white font-semibold pr-4 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180 text-blue-400' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-700/40 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-slate-800/40 border border-slate-700/40 rounded-2xl p-7">
          <p className="text-white font-semibold mb-1">¿Tienes otra consulta?</p>
          <p className="text-slate-400 text-sm mb-4">Nuestro equipo responde en menos de 24 horas hábiles</p>
          <a
            href="mailto:soporte@licitex.cl"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all text-sm"
          >
            Escribir al soporte →
          </a>
        </div>
      </div>
    </section>
  );
}
