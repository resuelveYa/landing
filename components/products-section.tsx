'use client';

import { Brain, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { getProductUrls } from '@/lib/config';

export default function ProductsSection() {
  const urls = getProductUrls();

  return (
    <section id="productos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Plataforma</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Dos herramientas,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              un solo flujo
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Desde la preparación del presupuesto hasta la ejecución del contrato adjudicado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Budget Analyzer */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all group">
            <div className="bg-gradient-to-br from-blue-900/50 to-slate-800/50 p-8 border-b border-slate-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Módulo 1</span>
                  <h3 className="text-xl font-black text-white">Analizador de Presupuestos IA</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sube tu presupuesto y las bases de licitación de Mercado Público. La IA lo cruza,
                detecta errores y genera un informe de cumplimiento en menos de 2 minutos.
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8">
                {[
                  'Detección de partidas faltantes',
                  'Validación de precios contra mercado',
                  'Verificación matemática del presupuesto',
                  'Análisis de bases técnicas y administrativas',
                  'Reporte de cumplimiento exportable',
                  'Comparación entre versiones del presupuesto',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={15} className="text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={urls.chat || '/sign-up'}
                className="group/btn w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-sm"
              >
                Analizar presupuesto
                <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Cash Flow */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all group">
            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 p-8 border-b border-slate-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Módulo 2</span>
                  <h3 className="text-xl font-black text-white">Flujo de Caja del Proyecto</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Una vez adjudicado el contrato, controla la ejecución financiera del proyecto.
                Estados de pago, proyecciones y control por partidas presupuestarias.
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8">
                {[
                  'Control de ingresos y egresos por proyecto',
                  'Estados de pago y avances de obra',
                  'Proyección de flujo de caja mensual',
                  'Control por centros de costo',
                  'Alertas de desviación presupuestaria',
                  'Reportes para contraparte técnica municipal',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={15} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={urls.admin || '/sign-up'}
                className="group/btn w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all text-sm"
              >
                Gestionar proyecto
                <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bridge callout */}
        <div className="mt-8 bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-semibold">Flujo integrado:</span>{' '}
            Analiza el presupuesto antes de postular → Gana la licitación → Controla la ejecución financiera del contrato.
            Todo en una sola plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}
