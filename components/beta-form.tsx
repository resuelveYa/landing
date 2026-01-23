'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle, Building2, Users, Mail, Phone, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

const betaFormSchema = z.object({
  fullName: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+?56?9\d{8}$/, 'Teléfono chileno inválido (ej: +56912345678)'),
  companyName: z.string().min(2, 'Nombre de empresa requerido'),
  industryType: z.string().min(1, 'Selecciona tu industria'),
  companySize: z.string().min(1, 'Selecciona el tamaño'),
  mainChallenge: z.string().min(10, 'Describe tu principal desafío (mín. 10 caracteres)'),
});

type BetaFormData = z.infer<typeof betaFormSchema>;

const industries = [
  'Retail / Comercio',
  'Servicios Profesionales',
  'Restaurantes / Gastronomía',
  'Tecnología',
  'Construcción',
  'Salud / Wellness',
  'Educación',
  'Otro',
];

const companySizes = [
  'Solo yo',
  '2-5 personas',
  '6-10 personas',
  '11-50 personas',
  'Más de 50',
];

export default function BetaForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
  }, [supabase.auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<BetaFormData>({
    resolver: zodResolver(betaFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('fullName', user.user_metadata?.full_name || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: BetaFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al enviar');

      setIsSuccess(true);
      reset();

      // Redirect to sign up if not logged in
      if (!user) {
        setTimeout(() => {
          window.location.href = '/sign-up';
        }, 2000);
      }
    } catch (error) {
      alert('Hubo un error. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido al Beta!</h3>
        <p className="text-gray-600 mb-4">
          Te hemos enviado un email con los próximos pasos.
          Revisa tu bandeja de entrada.
        </p>
        {!user && (
          <p className="text-sm text-gray-500">Redirigiendo al registro...</p>
        )}
      </div>
    );
  }

  return (
    <>
      {/* SI NO ESTÁ LOGEADO - Mostrar formulario */}
      {!loading && !user && (
        <section id="beta" className="section-container bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Únete al Programa Beta
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Acceso gratuito a todas las funciones. Sin tarjeta de crédito.
                Ayúdanos a mejorar y recibe beneficios exclusivos.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* ... resto del formulario ... */}
                {/* Nombre Completo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email y Teléfono en grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="juan@empresa.cl"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Teléfono *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+56912345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Nombre de Empresa */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building2 size={16} className="inline mr-1" />
                    Nombre de tu Empresa *
                  </label>
                  <input
                    {...register('companyName')}
                    type="text"
                    placeholder="Mi Empresa SpA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                {/* Industria y Tamaño en grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Industria *
                    </label>
                    <select
                      {...register('industryType')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona...</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industryType && (
                      <p className="text-red-500 text-sm mt-1">{errors.industryType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Users size={16} className="inline mr-1" />
                      Tamaño *
                    </label>
                    <select
                      {...register('companySize')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona...</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>
                    )}
                  </div>
                </div>

                {/* Principal Desafío */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Cuál es tu principal desafío en la gestión del negocio? *
                  </label>
                  <textarea
                    {...register('mainChallenge')}
                    rows={4}
                    placeholder="Ej: Llevo el flujo de caja en Excel y siempre olvido registrar gastos..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  {errors.mainChallenge && (
                    <p className="text-red-500 text-sm mt-1">{errors.mainChallenge.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Solicitar Acceso Beta
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Al enviar, aceptas recibir comunicaciones sobre el programa beta.
                  Sin spam, prometido. 🤝
                </p>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* SI YA ESTÁ LOGEADO - Mostrar link al dashboard */}
      {!loading && user && (
        <section id="beta" className="section-container bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              ¡Ya eres parte del Beta! 🎉
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Accede a tu dashboard para comenzar a usar todas las funciones.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-xl"
            >
              Ir al Dashboard
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}