'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import Logo from './logo';
import { User } from '@supabase/supabase-js';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Logo size="md" href="/" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#productos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Productos</a>
            <a href="#caracteristicas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Características</a>
            <a href="#precios" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Precios</a>

            {!loading && (
              user ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
                  <button onClick={handleSignOut} className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium">
                    <LogOut size={18} />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Iniciar Sesión</Link>
                  <Link href="/sign-up" className="btn-primary">Comenzar Gratis</Link>
                </>
              )
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100 text-center">
            <a href="#productos" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Productos</a>
            <a href="#caracteristicas" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Características</a>
            <a href="#precios" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Precios</a>

            {!loading && (
              user ? (
                <>
                  <Link href="/dashboard" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button onClick={handleSignOut} className="w-full py-2 text-red-600 font-medium flex items-center justify-center gap-2">
                    <LogOut size={18} />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Iniciar Sesión</Link>
                  <Link href="/sign-up" className="block btn-primary text-center mt-2" onClick={() => setIsOpen(false)}>Comenzar Gratis</Link>
                </>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}