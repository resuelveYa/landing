'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import Logo from './logo';
import { User } from '@supabase/supabase-js';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo size="sm" href="/" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#productos" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Productos</a>
            <a href="#caracteristicas" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Funcionalidades</a>
            <a href="#como-funciona" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cómo funciona</a>
            <a href="#precios" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Precios</a>

            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all">
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors text-sm">
                    <LogOut size={15} />
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/sign-in" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    Iniciar sesión
                  </Link>
                  <Link href="/sign-up" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all">
                    Comenzar gratis
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-slate-800">
            {['#productos', '#caracteristicas', '#como-funciona', '#precios'].map((href, i) => (
              <a
                key={i}
                href={href}
                className="block px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-all"
                onClick={() => setIsOpen(false)}
              >
                {['Productos', 'Funcionalidades', 'Cómo funciona', 'Precios'][i]}
              </a>
            ))}
            <div className="pt-3 px-4 space-y-2 border-t border-slate-800 mt-3">
              {!loading && (
                user ? (
                  <>
                    <Link href="/dashboard" className="block text-center py-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={handleSignOut} className="w-full text-center py-2.5 text-red-400 font-medium text-sm">
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-up" className="block text-center py-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm" onClick={() => setIsOpen(false)}>
                      Comenzar gratis
                    </Link>
                    <Link href="/sign-in" className="block text-center py-2.5 text-slate-300 font-medium text-sm" onClick={() => setIsOpen(false)}>
                      Iniciar sesión
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
