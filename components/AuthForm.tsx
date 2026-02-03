// components/AuthForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Loader2, Github, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const trimmedEmail = email.trim()
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        })
        if (error) throw error

        if (redirectUrl) {
          window.location.href = redirectUrl
        } else {
          router.push('/dashboard')
          router.refresh()
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          },
        })
        if (error) throw error
        setShowSuccess(true)
      }
    } catch (err: any) {
      console.error('Auth Error:', err)
      setError(err.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })
    } catch (err) {
      setError('Error al conectar con GitHub')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })
    } catch (err) {
      setError('Error al conectar con Google')
      setLoading(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Casi listo!</h2>
        <p className="text-gray-600 mb-8">
          Hemos enviado un enlace de confirmación a <span className="font-semibold text-gray-900">{email}</span>.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/sign-in')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Ir al inicio de sesión <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500">
            ¿No recibiste nada? Revisa tu carpeta de spam o intenta registrarte de nuevo en unos minutos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form onSubmit={handleAuth} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Correo electrónico
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="nombre@empresa.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Contraseña
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex gap-3 items-center border border-red-100 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-lg hover:shadow-blue-200 items-center justify-center flex gap-2 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {mode === 'sign-in' ? 'Entrar a mi cuenta' : 'Crear mi cuenta gratis'}
              <ArrowRight className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
            <span className="px-4 bg-white text-gray-400 italic">O usa tu red profesional</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-gray-700 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-gray-700 active:scale-[0.98]"
          >
            <Github className="w-5 h-5 text-gray-900" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
