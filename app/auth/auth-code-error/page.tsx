'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function AuthCodeErrorHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error') || window.location.hash
    if (error?.includes('access_denied')) {
      router.replace('/sign-in')
    } else {
      router.replace('/sign-in?reason=session_error')
    }
  }, [router, searchParams])

  return null
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense>
      <AuthCodeErrorHandler />
    </Suspense>
  )
}
