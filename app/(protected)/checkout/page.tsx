'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Shield, CreditCard, Check, Loader2 } from 'lucide-react'

const PLANS = {
  starter:  { name: 'Starter',  price: '$49.990',  amount: 49990,  analyses: 15 },
  pro:      { name: 'Pro',      price: '$99.990',  amount: 99990,  analyses: 40 },
  business: { name: 'Business', price: '$179.990', amount: 179990, analyses: 120 },
} as const

type PlanId = keyof typeof PLANS

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = (searchParams.get('plan') || '') as PlanId
  const plan = PLANS[planId]

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!plan) router.replace('/dashboard')
  }, [plan, router])

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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.licitex.cl'
      const res = await fetch(`${apiUrl}/api/payments/create`, {
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
      setError(err.message || 'Error al conectar con el servidor de pagos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Confirmar suscripción</h1>
          <p className="text-gray-500 text-sm mb-8">Serás redirigido a Webpay para completar el pago de forma segura.</p>

          {/* Resumen del plan */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Plan {plan.name}</span>
              <span className="text-xl font-bold text-gray-900">{plan.price}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">CLP / mes · sin compromiso de permanencia</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                {plan.analyses} análisis IA incluidos por mes
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                Flujo de caja completo
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                Cancela cuando quieras
              </li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <CreditCard className="w-5 h-5" />
            )}
            {loading ? 'Redirigiendo a Webpay...' : `Pagar ${plan.price}`}
          </button>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Pago seguro procesado por <strong>Transbank / Webpay</strong></span>
          </div>
        </div>
      </div>
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
