'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileSpreadsheet, TrendingUp, ShieldCheck } from 'lucide-react';
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
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900/60 to-slate-800/60 border border-blue-800/40 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-blue-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/15 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Disponible ahora · 2 análisis gratis
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Tu próxima licitación,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                sin errores
              </span>
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Únete a las empresas chilenas que presentan presupuestos más precisos y ganan
              más contratos en Mercado Público.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-base"
                >
                  Ir al Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-up"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-base"
                  >
                    Comenzar gratis
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="mailto:soporte@licitex.cl"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-xl transition-all text-base"
                  >
                    Hablar con ventas
                  </a>
                </>
              )}
            </div>

            {/* Trust signals */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-slate-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-slate-400" />
                <span>2 análisis gratis siempre</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>Datos protegidos · Ley 19.628</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
