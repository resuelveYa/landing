'use client';

import { Upload, Cpu, FileCheck, TrendingUp } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Sube las bases y tu presupuesto',
      description: 'Carga el PDF de las bases de licitación de Mercado Público y tu presupuesto en Excel o PDF. También puedes subir bases técnicas y administrativas por separado.',
      detail: 'Formatos: .xlsx, .xls, .pdf, .csv',
    },
    {
      number: '02',
      icon: Cpu,
      title: 'La IA analiza en segundos',
      description: 'El sistema cruza tu presupuesto con los requisitos de las bases, valida precios contra referencias del mercado chileno y detecta partidas faltantes o inconsistencias.',
      detail: 'Tiempo promedio: 90 segundos',
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Revisa el informe de observaciones',
      description: 'Recibes un informe estructurado con observaciones priorizadas por criticidad: errores que descalifican, precios de riesgo y oportunidades de optimización.',
      detail: 'Exportable en PDF y Excel',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Ajusta y presenta con confianza',
      description: 'Corrige tu presupuesto en base al informe y adjunta el reporte de cumplimiento a tu oferta. Haz seguimiento del proyecto con nuestro módulo de flujo de caja si eres adjudicado.',
      detail: 'Historial guardado por proyecto',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Proceso</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            De las bases al presupuesto final{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              en 4 pasos
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Un flujo diseñado para el proceso real de postulación en Mercado Público
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/60 via-blue-600/30 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex items-start gap-8 lg:gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Number bubble — center on desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-full items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/40 z-10 border-4 border-[#0A1628]">
                    {idx + 1}
                  </div>

                  {/* Card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 hover:border-blue-500/40 transition-all">
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Paso {step.number}</span>
                          <h3 className="text-white font-bold text-lg leading-snug">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.description}</p>
                      <span className="text-xs text-slate-500 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50">
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Example types */}
        <div className="mt-20 grid sm:grid-cols-3 gap-5">
          {[
            {
              emoji: '🏗️',
              title: 'Obras civiles',
              desc: 'Construcción de plazas, pavimentación, obras de agua potable, alcantarillado y vialidad municipal.',
            },
            {
              emoji: '🏢',
              title: 'Servicios profesionales',
              desc: 'Consultorías, asesorías técnicas, inspecciones y diseño de proyectos para municipalidades.',
            },
            {
              emoji: '🚚',
              title: 'Suministros y compras',
              desc: 'Compra de equipos, materiales, vehículos y suministros para organismos públicos.',
            },
          ].map((type, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{type.emoji}</div>
              <h4 className="text-white font-bold mb-2">{type.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
