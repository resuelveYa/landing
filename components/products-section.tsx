'use client';

import { Bot, ArrowRight, Check, Sparkles, Brain, Zap, FileText, BarChart3, TrendingUp, Wallet, Building2 } from 'lucide-react';

const products = [
  {
    id: 'budget-analyzer',
    title: 'Asistente IA de Presupuestos',
    subtitle: 'Análisis instantáneo y respuestas inteligentes',
    icon: Bot,
    gradient: 'from-blue-600 to-purple-600',
    url: '/budget',
    features: [
      {
        icon: FileText,
        title: 'Análisis de Documentos',
        description: 'Sube Excel, PDF o CSV y obtén insights instantáneos',
      },
      {
        icon: Brain,
        title: 'Chat Inteligente',
        description: 'Pregunta en lenguaje natural sobre tus presupuestos',
      },
      {
        icon: BarChart3,
        title: 'Comparaciones Automáticas',
        description: 'Compara múltiples presupuestos y detecta desviaciones',
      },
      {
        icon: Zap,
        title: 'Proyecciones con IA',
        description: 'Predicciones basadas en datos históricos y tendencias',
      },
    ],
    benefits: [
      '50 análisis IA incluidos mensualmente',
      'Análisis de múltiples documentos simultáneamente',
      'Comparaciones presupuesto vs real',
      'Detección de anomalías y desviaciones',
      'Proyecciones y tendencias automáticas',
      'Exporta reportes profesionales',
      'Respuestas en lenguaje natural',
      'Disponible 24/7 desde cualquier lugar',
    ],
    useCases: [
      { emoji: '📊', title: 'Control de Gastos', desc: 'Monitorea y optimiza cada categoría presupuestaria' },
      { emoji: '📈', title: 'Proyecciones', desc: 'Predice gastos futuros con precisión basada en IA' },
      { emoji: '💡', title: 'Insights Accionables', desc: 'Recomendaciones inteligentes para optimizar recursos' },
    ]
  },
  {
    id: 'cash-flow',
    title: 'Flujo de Caja Inteligente',
    subtitle: 'Gestión financiera automatizada para tu empresa',
    icon: TrendingUp,
    gradient: 'from-emerald-600 to-teal-600',
    url: '/cashflow',
    features: [
      {
        icon: Wallet,
        title: 'Control de Ingresos y Egresos',
        description: 'Registra y categoriza automáticamente tus transacciones',
      },
      {
        icon: TrendingUp,
        title: 'Proyecciones Financieras',
        description: 'Visualiza tu flujo de caja futuro con IA predictiva',
      },
      {
        icon: Building2,
        title: 'Multi-Organización',
        description: 'Gestiona múltiples empresas desde una sola cuenta',
      },
      {
        icon: BarChart3,
        title: 'Reportes Automáticos',
        description: 'Genera reportes ejecutivos con un click',
      },
    ],
    benefits: [
      'Categorización automática de transacciones',
      'Alertas de flujo de caja negativo',
      'Proyecciones basadas en IA hasta 12 meses',
      'Integración con facturas y boletas',
      'Control por centros de costo',
      'Gráficos interactivos en tiempo real',
      'Exporta a Excel y PDF',
      'Multi-organización incluida',
    ],
    useCases: [
      { emoji: '💰', title: 'Control Total', desc: 'Visualiza todos tus movimientos financieros en un solo lugar' },
      { emoji: '🎯', title: 'Toma Decisiones', desc: 'Proyecciones precisas para planificar inversiones' },
      { emoji: '⚡', title: 'Ahorra Tiempo', desc: 'Automatiza la gestión financiera de tu empresa' },
    ]
  }
];

export default function ProductsSection() {
  return (
    <section id="productos" className="section-container bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles size={16} />
          <span>Potenciado por IA Avanzada</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
          Soluciones Empresariales Inteligentes
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Herramientas profesionales que automatizan tu gestión financiera y presupuestaria
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {products.map((product, idx) => {
          const Icon = product.icon;
          return (
            <div
              key={product.id}
              className={`bg-gradient-to-br ${product.gradient} rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-[1.01] transition-all duration-300`}
            >
              {/* Header */}
              <div className="p-8 sm:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-1">{product.title}</h3>
                    <p className="text-white/80 text-lg">{product.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 p-8 sm:p-12 bg-white/10 backdrop-blur-md">
                {product.features.map((feature, featureIdx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={featureIdx} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FeatureIcon size={24} className="text-cyan-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                        <p className="text-white/70">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits List */}
              <div className="p-8 sm:p-12 bg-slate-900/50">
                <h4 className="text-white font-bold text-xl mb-6">Lo que puedes hacer:</h4>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, benefitIdx) => (
                    <li key={benefitIdx} className="flex items-start gap-3">
                      <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-8 sm:p-12 bg-gradient-to-r from-cyan-500 to-blue-600">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white font-bold text-2xl mb-1">Comienza ahora</p>
                    <p className="text-white/80">Acceso beta gratuito por tiempo limitado</p>
                  </div>
                  <a
                    href="#beta"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Probar Gratis
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Use Cases */}
              {idx === products.length - 1 && (
                <div className="p-8 sm:p-12 bg-slate-900/30 border-t border-white/10">
                  <div className="grid md:grid-cols-3 gap-6">
                    {product.useCases.map((useCase, useCaseIdx) => (
                      <div key={useCaseIdx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="text-4xl mb-3">{useCase.emoji}</div>
                        <h4 className="text-white font-bold text-lg mb-2">{useCase.title}</h4>
                        <p className="text-white/70">{useCase.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparación de productos */}
      <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
        <h3 className="text-2xl font-black text-white mb-8 text-center">
          ¿Cuál es la diferencia?
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Bot size={24} className="text-blue-400" />
              <h4 className="text-xl font-bold text-white">Budget Analyzer</h4>
            </div>
            <p className="text-white/70 mb-4">
              <strong className="text-white">Ideal para:</strong> Análisis puntuales de presupuestos y proyectos.
              Perfecto para gerentes de proyecto, analistas y empresas que necesitan validar cotizaciones.
            </p>
            <div className="flex items-center gap-2 text-cyan-300">
              <Zap size={16} />
              <span className="text-sm">Análisis bajo demanda • 50 consultas/mes</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={24} className="text-emerald-400" />
              <h4 className="text-xl font-bold text-white">Flujo de Caja</h4>
            </div>
            <p className="text-white/70 mb-4">
              <strong className="text-white">Ideal para:</strong> Gestión continua de finanzas empresariales.
              Perfecto para emprendedores, CFOs y contadores que necesitan control total.
            </p>
            <div className="flex items-center gap-2 text-emerald-300">
              <TrendingUp size={16} />
              <span className="text-sm">Gestión permanente • Transacciones ilimitadas</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            💡 <strong className="text-white">Pro Tip:</strong> Usa ambas herramientas en conjunto para máxima eficiencia.
            Budget Analyzer para validar cotizaciones y Flujo de Caja para gestionar la ejecución.
          </p>
        </div>
      </div>
    </section>
  );
}