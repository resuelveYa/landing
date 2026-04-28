'use client';

import { FileSearch, ShieldAlert, GitCompare, Brain, Clock, BarChart3, FileCheck, Layers } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: FileSearch,
      title: 'Detección de partidas faltantes',
      description: 'La IA compara tu presupuesto contra bases de licitación y detecta ítems que olvidaste incluir, evitando descalificaciones o pérdidas.',
      tag: 'Más usado',
      tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      icon: ShieldAlert,
      title: 'Validación de precios',
      description: 'Contrasta tus precios unitarios con referencias del mercado chileno. Detecta si estás cotizando por debajo del costo real o fuera de rango.',
      tag: 'Crítico',
      tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
    {
      icon: GitCompare,
      title: 'Comparación de versiones',
      description: 'Sube múltiples versiones del presupuesto y compara diferencias automáticamente. Ideal cuando la municipalidad publica aclaraciones.',
      tag: null,
      tagColor: '',
    },
    {
      icon: Brain,
      title: 'Análisis de bases de licitación',
      description: 'Sube las bases técnicas y administrativas de Mercado Público. La IA extrae los requisitos presupuestarios clave en segundos.',
      tag: 'IA',
      tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
    {
      icon: Clock,
      title: 'Historial de licitaciones',
      description: 'Guarda y reutiliza presupuestos anteriores. Aprende qué funcionó en licitaciones ganadas y aplícalo a las nuevas.',
      tag: null,
      tagColor: '',
    },
    {
      icon: BarChart3,
      title: 'Análisis de rentabilidad',
      description: 'Calcula el margen real de tu oferta considerando costos directos, indirectos, imprevistos y utilidad. Ve si conviene postular.',
      tag: null,
      tagColor: '',
    },
    {
      icon: FileCheck,
      title: 'Reporte de cumplimiento',
      description: 'Genera un informe de cumplimiento del presupuesto vs. las exigencias de las bases. Listo para adjuntar a tu oferta técnica.',
      tag: 'Nuevo',
      tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    {
      icon: Layers,
      title: 'Gestión de flujo de caja',
      description: 'Una vez adjudicado, controla el flujo de caja del proyecto. Registra avances, estados de pago y proyecta la liquidez mensual.',
      tag: null,
      tagColor: '',
    },
  ];

  return (
    <section id="caracteristicas" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Funcionalidades</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Todo lo que necesitas para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              ganar la licitación
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Herramientas diseñadas específicamente para empresas que postulan a licitaciones públicas en Chile
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/40 rounded-2xl p-6 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-900/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-blue-600/15 rounded-xl flex items-center justify-center group-hover:bg-blue-600/25 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  {feature.tag && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${feature.tagColor}`}>
                      {feature.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold mb-2 text-base leading-snug">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mercado Público callout */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-blue-800/40 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🏛️</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-1">Diseñado para Mercado Público</h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              licitex entiende el formato y los requisitos de las licitaciones publicadas en{' '}
              <span className="text-blue-400 font-semibold">mercadopublico.cl</span>. Sube directamente
              las bases de licitación en PDF o Excel y la IA extrae automáticamente las especificaciones técnicas y presupuestarias.
            </p>
          </div>
          <div className="text-slate-300 text-sm font-semibold whitespace-nowrap bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/50">
            Licitaciones L1, LE y LP
          </div>
        </div>
      </div>
    </section>
  );
}
