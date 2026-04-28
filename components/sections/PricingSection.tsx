'use client';

import { useEffect, useState } from 'react';
import { Check, Zap, Star, Crown, Building2 } from 'lucide-react';
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
      description: 'Para conocer la plataforma y hacer tus primeras pruebas',
      icon: Zap,
      iconColor: 'text-gray-600',
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
      buttonLabel: 'Comenzar Gratis',
      popular: false,
      features: [
        { text: '2 análisis IA incluidos', included: true },
        { text: 'Flujo de caja básico', included: true },
        { text: '1 organización', included: true },
        { text: 'Exportaciones PDF', included: false },
        { text: 'Análisis extra disponibles', included: false },
        { text: 'Soporte prioritario', included: false },
      ],
      extra: null,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$49.990',
      period: 'CLP/mes',
      description: 'Para empresas pequeñas con licitaciones ocasionales',
      icon: Star,
      iconColor: 'text-blue-600',
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-300',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
      buttonLabel: 'Contratar Starter',
      popular: false,
      features: [
        { text: '15 análisis IA incluidos/mes', included: true },
        { text: 'Flujo de caja completo', included: true },
        { text: '3 organizaciones', included: true },
        { text: 'Exportaciones PDF ilimitadas', included: true },
        { text: 'Historial 12 meses', included: true },
        { text: 'Soporte por email', included: true },
      ],
      extra: '$3.500 CLP por análisis adicional',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$99.990',
      period: 'CLP/mes',
      description: 'Para contratistas con licitaciones frecuentes',
      icon: Crown,
      iconColor: 'text-purple-600',
      gradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white',
      buttonLabel: 'Contratar Pro',
      popular: true,
      features: [
        { text: '40 análisis IA incluidos/mes', included: true },
        { text: 'Flujo de caja completo', included: true },
        { text: '10 organizaciones', included: true },
        { text: 'Exportaciones ilimitadas', included: true },
        { text: 'Proyecciones IA avanzadas', included: true },
        { text: 'Soporte prioritario', included: true },
      ],
      extra: '$2.900 CLP por análisis adicional',
    },
    {
      id: 'business',
      name: 'Business',
      price: '$179.990',
      period: 'CLP/mes',
      description: 'Para empresas constructoras con alto volumen',
      icon: Building2,
      iconColor: 'text-orange-600',
      gradient: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-300',
      buttonStyle: 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white',
      buttonLabel: 'Contratar Business',
      popular: false,
      features: [
        { text: '120 análisis IA incluidos/mes', included: true },
        { text: 'Flujo de caja completo', included: true },
        { text: 'Organizaciones ilimitadas', included: true },
        { text: 'Exportaciones ilimitadas', included: true },
        { text: 'API access', included: true },
        { text: 'Soporte dedicado 24/7', included: true },
      ],
      extra: '$2.200 CLP por análisis adicional',
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
            Sin letra chica. Sin compromisos anuales. Cancela cuando quieras.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>Todos los planes incluyen flujo de caja completo</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl p-7 border-2 ${plan.borderColor} ${
                  plan.popular ? 'ring-4 ring-purple-200 scale-105' : ''
                } transition-all hover:shadow-2xl flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                      ⭐ Más Popular
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <Icon className={`w-10 h-10 ${plan.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-5">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  {plan.extra && (
                    <p className="text-xs text-gray-500 mt-1">{plan.extra}</p>
                  )}
                </div>

                {isSignedIn ? (
                  plan.id === 'free' ? (
                    <Link
                      href="/dashboard"
                      className={`block w-full py-3 ${plan.buttonStyle} text-center rounded-xl font-semibold transition-all shadow mb-6`}
                    >
                      Ir al Dashboard
                    </Link>
                  ) : (
                    <Link
                      href={`/checkout?plan=${plan.id}`}
                      className={`block w-full py-3 ${plan.buttonStyle} text-center rounded-xl font-semibold transition-all shadow mb-6`}
                    >
                      {plan.buttonLabel}
                    </Link>
                  )
                ) : (
                  <Link
                    href={plan.id === 'free' ? '/sign-up' : `/sign-up?plan=${plan.id}`}
                    className={`block w-full py-3 ${plan.buttonStyle} text-center rounded-xl font-semibold transition-all shadow mb-6`}
                  >
                    {plan.id === 'free' ? 'Comenzar Gratis' : plan.buttonLabel}
                  </Link>
                )}

                <div className="space-y-2.5 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                        feature.included ? 'bg-green-500' : 'bg-gray-200'
                      } flex items-center justify-center mt-0.5`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <span className="text-gray-400 text-xs">−</span>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-10 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">¿Empresa grande o necesidades especiales?</h3>
            <p className="text-gray-400 text-sm">Planes Enterprise desde $350.000 CLP/mes con SLA, soporte dedicado y análisis ilimitados.</p>
          </div>
          <a
            href="mailto:soporte@licitex.cl"
            className="flex-shrink-0 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all whitespace-nowrap"
          >
            Contactar ventas →
          </a>
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Pagos procesados de forma segura con{' '}
          <span className="font-semibold text-gray-600">Webpay / Transbank</span>.
          Precios en pesos chilenos (CLP) con IVA incluido.
        </p>
      </div>
    </section>
  );
}
