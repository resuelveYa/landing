'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const PLAN_NAMES: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  business: 'Business',
}

function PaymentResultContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('payment')
  const plan = searchParams.get('plan')

  if (status === 'success') {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-600 mb-2">
          Tu suscripción al plan <strong>{PLAN_NAMES[plan || ''] || plan}</strong> está activa.
        </p>
        <p className="text-gray-500 text-sm mb-8">Ya puedes usar todos los análisis incluidos en tu plan.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          Ir al Dashboard →
        </Link>
      </div>
    )
  }

  if (status === 'cancelled') {
    return (
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago cancelado</h1>
        <p className="text-gray-600 mb-8">Cancelaste el proceso de pago. No se realizó ningún cobro.</p>
        <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
          Volver al Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago rechazado</h1>
      <p className="text-gray-600 mb-2">El pago no fue autorizado. No se realizó ningún cobro.</p>
      <p className="text-gray-500 text-sm mb-8">Puedes intentarlo nuevamente o contactar a tu banco.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/#precios" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
          Ver planes
        </Link>
        <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
          Ir al Dashboard
        </Link>
      </div>
    </div>
  )
}

export default function PaymentResultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 max-w-md w-full">
        <Suspense>
          <PaymentResultContent />
        </Suspense>
      </div>
    </div>
  )
}
