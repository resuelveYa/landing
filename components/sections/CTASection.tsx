'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function CTASection() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };
    checkAuth();
  }, [supabase.auth]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Únete a cientos de usuarios activos</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Empieza a optimizar tu negocio{' '}
            <span className="block mt-2">hoy mismo</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sin tarjeta de crédito. Sin compromisos. Cancela cuando quieras.
            Comienza gratis y accede a todas las herramientas.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Setup en 2 minutos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Datos 100% seguros</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">50 análisis IA gratis</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="group px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center space-x-2"
              >
                <span>Ir al Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="group px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center space-x-2"
                >
                  <span>Comenzar Gratis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#productos"
                  className="px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg transition-all hover:bg-white/10 backdrop-blur-sm"
                >
                  Ver Productos
                </a>
              </>
            )}
          </div>

          {/* Trust Line */}
          <p className="text-blue-100 text-sm pt-4">
            Más de <strong className="text-white">100 empresas</strong> confían en Resuelve YA
          </p>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
}