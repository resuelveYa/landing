'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, FileSpreadsheet, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function HeroSection() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-[#0A1628]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Integrado con Mercado Público · Chile 🇨🇱
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Gana más{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                licitaciones
              </span>{' '}
              con presupuestos precisos
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
              Sube tu presupuesto, la IA detecta errores, omisiones y precios fuera de mercado
              antes de que presentes tu oferta en Mercado Público. En menos de 2 minutos.
            </p>

            {/* Pain points */}
            <div className="space-y-3 mb-10">
              {[
                { icon: AlertTriangle, text: '¿Perdiste una licitación por un error en el presupuesto?', color: 'text-amber-400' },
                { icon: CheckCircle, text: 'Detecta partidas faltantes antes de presentar tu oferta', color: 'text-green-400' },
                { icon: TrendingUp, text: 'Compara tus precios con referencias del mercado', color: 'text-blue-400' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            {!loading && (
              <div className="flex flex-col sm:flex-row gap-3">
                {user ? (
                  <Link href="/dashboard" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-base">
                    Ir al Dashboard
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-up" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-base">
                      Analizar mi presupuesto gratis
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="#como-funciona" className="inline-flex items-center justify-center px-7 py-4 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-xl transition-all text-base">
                      Ver cómo funciona
                    </a>
                  </>
                )}
              </div>
            )}

            <p className="text-slate-500 text-xs mt-4">Sin tarjeta de crédito · 2 análisis gratis para siempre</p>
          </div>

          {/* Right — Mock UI */}
          <div className="hidden lg:block">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Window bar */}
              <div className="bg-slate-900/80 px-4 py-3 flex items-center gap-2 border-b border-slate-700/60">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="flex items-center gap-2 ml-4 bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-400">
                  <FileSpreadsheet size={12} />
                  presupuesto_municipalidad_2024.xlsx
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Upload area */}
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Análisis completado</p>
                    <p className="text-blue-400 text-xs">3 observaciones encontradas</p>
                  </div>
                  <div className="ml-auto text-green-400 text-xs font-bold">✓ Listo</div>
                </div>

                {/* Issues found */}
                <div className="space-y-2">
                  <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                    </div>
                    <div>
                      <p className="text-red-300 text-xs font-bold uppercase tracking-wide">Partida faltante</p>
                      <p className="text-slate-300 text-xs mt-0.5">Hormigón H-25 no incluido en estructura</p>
                    </div>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Precio bajo mercado</p>
                      <p className="text-slate-300 text-xs mt-0.5">Mano de obra obra gruesa -23% vs referencia</p>
                    </div>
                  </div>
                  <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-300 text-xs font-bold uppercase tracking-wide">Oportunidad de ahorro</p>
                      <p className="text-slate-300 text-xs mt-0.5">Áridos — proveedor alternativo disponible</p>
                    </div>
                  </div>
                </div>

                {/* Summary bar */}
                <div className="bg-slate-900/60 rounded-xl p-4 grid grid-cols-3 gap-4 text-center border border-slate-700/40">
                  <div>
                    <p className="text-2xl font-black text-white">$2.4M</p>
                    <p className="text-slate-400 text-xs">Riesgo detectado</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-green-400">94%</p>
                    <p className="text-slate-400 text-xs">Completitud</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-blue-400">1:42</p>
                    <p className="text-slate-400 text-xs">Tiempo análisis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800 pt-12">
          {[
            { value: '+850', label: 'licitaciones analizadas' },
            { value: '$12.000M', label: 'en presupuestos revisados' },
            { value: '94%', label: 'de precisión detectando errores' },
            { value: '< 10 min', label: 'por análisis completo' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
