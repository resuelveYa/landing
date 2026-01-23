'use client';

import { useEffect, useState } from 'react';
import { Check, Zap, Star, Crown } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function PricingSection() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };
    checkAuth();
  }, [supabase.auth]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'siempre',
      description: 'Perfecto para empezar y probar las herramientas',
      icon: Zap,
      iconColor: 'text-gray-600',
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
      popular: false,
      features: [
        { text: '10 análisis IA/mes', included: true },
        { text: '100 transacciones/mes', included: true },
        { text: '1 organización', included: true },
        { text: '5 exportaciones/mes', included: true },
        { text: 'Gráficos básicos', included: true },
        { text: 'Soporte por email', included: true },
        { text: 'Proyecciones avanzadas', included: false },
        { text: 'Multi-organización', included: false },
      ],
      limits: {
        budgetAnalyzer: {
          daily_analyses: '3/día',
          monthly_analyses: '10/mes',
        },
        cashFlow: {
          transactions: '100/mes',
          organizations: '1',
          exports: '5/mes',
        },
      },
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.990',
      period: 'CLP/mes',
      description: 'Para negocios en crecimiento que necesitan más capacidad',
      icon: Star,
      iconColor: 'text-blue-600',
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-300',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
      popular: true,
      features: [
        { text: '100 análisis IA/mes', included: true },
        { text: '500 transacciones/mes', included: true },
        { text: '3 organizaciones', included: true },
        { text: '50 exportaciones/mes', included: true },
        { text: 'Gráficos avanzados', included: true },
        { text: 'Soporte prioritario', included: true },
        { text: '20 proyecciones IA/mes', included: true },
        { text: 'Reportes personalizados', included: true },
      ],
      limits: {
        budgetAnalyzer: {
          daily_analyses: '10/día',
          monthly_analyses: '500/mes',
        },
        cashFlow: {
          transactions: '500/mes',
          organizations: '3',
          exports: '50/mes',
          advanced_projections: '20/mes',
        },
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$29.990',
      period: 'CLP/mes',
      description: 'Para empresas que requieren capacidad profesional',
      icon: Crown,
      iconColor: 'text-purple-600',
      gradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white',
      popular: false,
      features: [
        { text: 'Análisis IA ilimitados', included: true },
        { text: '2.000 transacciones/mes', included: true },
        { text: '10 organizaciones', included: true },
        { text: 'Exportaciones ilimitadas', included: true },
        { text: 'Gráficos avanzados', included: true },
        { text: 'Soporte prioritario 24/7', included: true },
        { text: '100 proyecciones IA/mes', included: true },
        { text: 'API access', included: true },
      ],
      limits: {
        budgetAnalyzer: {
          daily_analyses: 'Ilimitado',
          monthly_analyses: 'Ilimitado',
        },
        cashFlow: {
          transactions: '2.000/mes',
          organizations: '10',
          exports: 'Ilimitado',
          advanced_projections: '100/mes',
        },
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contactar',
      description: 'Solución personalizada para grandes empresas',
      icon: Crown,
      iconColor: 'text-yellow-600',
      gradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-300',
      buttonStyle: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white',
      popular: false,
      features: [
        { text: 'Todo ilimitado', included: true },
        { text: 'Organizaciones ilimitadas', included: true },
        { text: 'Exportaciones ilimitadas', included: true },
        { text: 'Soporte dedicado 24/7', included: true },
        { text: 'Proyecciones IA ilimitadas', included: true },
        { text: 'API access completo', included: true },
        { text: 'SLA garantizado', included: true },
        { text: 'Onboarding personalizado', included: true },
      ],
      limits: {
        budgetAnalyzer: {
          daily_analyses: 'Ilimitado',
          monthly_analyses: 'Ilimitado',
        },
        cashFlow: {
          transactions: 'Ilimitado',
          organizations: 'Ilimitado',
          exports: 'Ilimitado',
          advanced_projections: 'Ilimitado',
        },
      },
    },
  ];

  return (
    <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Planes diseñados{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              para crecer contigo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comienza gratis y actualiza cuando lo necesites. Sin compromisos, cancela cuando quieras.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>Por ahora todos los planes son gratuitos durante la beta</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl p-8 border-2 ${plan.borderColor} ${plan.popular ? 'ring-4 ring-blue-200 scale-105' : ''
                  } transition-all hover:shadow-2xl`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Más Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <Icon className={`w-12 h-12 ${plan.iconColor}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-gray-600">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    className={`block w-full py-3 ${plan.buttonStyle} text-center rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl mb-8`}
                  >
                    Ir al Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/sign-up"
                    className={`block w-full py-3 ${plan.buttonStyle} text-center rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl mb-8`}
                  >
                    {plan.id === 'enterprise' ? 'Contactar' : 'Comenzar Gratis'}
                  </Link>
                )}

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full ${feature.included ? 'bg-green-500' : 'bg-gray-300'
                        } flex items-center justify-center mt-0.5`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <span className="text-white text-xs">−</span>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limits Details (collapsed) */}
                <details className="mt-6 bg-white/50 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-700 text-sm">
                    Ver límites detallados
                  </summary>
                  <div className="mt-4 space-y-3 text-xs text-gray-600">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Budget Analyzer:</div>
                      <div>• Análisis diarios: {plan.limits.budgetAnalyzer.daily_analyses}</div>
                      <div>• Análisis mensuales: {plan.limits.budgetAnalyzer.monthly_analyses}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Cash Flow:</div>
                      <div>• Transacciones: {plan.limits.cashFlow.transactions}</div>
                      <div>• Organizaciones: {plan.limits.cashFlow.organizations}</div>
                      <div>• Exportaciones: {plan.limits.cashFlow.exports}</div>
                      {plan.limits.cashFlow.advanced_projections && (
                        <div>• Proyecciones IA: {plan.limits.cashFlow.advanced_projections}</div>
                      )}
                    </div>
                  </div>
                </details>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <p className="text-gray-600 mb-4">
            ¿Necesitas algo específico? Los planes Enterprise son totalmente personalizables.
          </p>
          <a href="mailto:soporte@resuelveya.cl"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <span>Contáctanos</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}