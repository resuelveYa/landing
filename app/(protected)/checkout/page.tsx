'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { apiUrl } from '@/lib/api'
import { Shield, ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react'
import { PLANS, isPaidPlanId } from '@/lib/plans'
import Logo from '@/components/logo'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan') || ''
  const plan = isPaidPlanId(planId) ? PLANS[planId] : undefined

  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDevBypass, setShowDevBypass] = useState(false)

  useEffect(() => {
    if (!plan) router.replace('/dashboard')
  }, [plan, router])

  useEffect(() => {
    const supabase = createClient()
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setEmail(data.user?.email ?? null)
    }
    loadUser()
  }, [])

  if (!plan) return null

  const handlePay = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/sign-in')
        return
      }

      const res = await fetch(apiUrl('/api/payments/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ planId }),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Error iniciando pago')

      // Redirigir a Webpay — enviar formulario POST con el token
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.url
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'token_ws'
      input.value = data.token
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()
    } catch (err: any) {
      setError(err.message || 'No pudimos conectar con el servidor de pagos')
      if (process.env.NODE_ENV !== 'production') setShowDevBypass(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            {email && <span className="text-sm text-gray-500 hidden sm:inline">{email}</span>}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Confirma tu suscripción</h1>
          <p className="text-gray-500">Estás a un paso de desbloquear el plan {plan.name}.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resumen del pedido */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Tu plan</h2>

            <div className="flex items-start justify-between border border-gray-100 bg-gray-50 rounded-xl p-5 mb-6">
              <div>
                <p className="font-semibold text-gray-900">Plan {plan.name}</p>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{plan.price}</p>
                <p className="text-xs text-gray-500">{plan.period}</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-3">Qué incluye</h3>
            <ul className="space-y-2.5">
              {plan.features.filter(f => f.included).map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Sin compromiso de permanencia. Puedes cambiar o cancelar tu plan cuando quieras desde tu cuenta.
              </p>
            </div>
          </div>

          {/* Resumen de pago */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 sticky top-24">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Resumen</h2>

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Plan {plan.name}</span>
                <span>{plan.price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Periodicidad</span>
                <span>{plan.period}</span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                <span className="font-semibold text-gray-900">Total a pagar hoy</span>
                <span className="text-lg font-bold text-gray-900">{plan.price}</span>
              </div>

              {error && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-4 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Conectando con Webpay...' : 'Continuar al pago'}
              </button>

              {showDevBypass && (
                <button
                  onClick={() => router.push(`/dashboard/payment-result?payment=success&plan=${planId}`)}
                  className="w-full mt-2 text-sm font-medium text-gray-500 hover:text-gray-700 py-2 transition-colors"
                >
                  Continuar sin pagar (modo desarrollo)
                </button>
              )}

              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Pago seguro procesado por Transbank / Webpay</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  )
}
