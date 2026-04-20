'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCodeErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // access_denied = user clicked Cancel on Google's consent screen → just go back to sign-in
    const error = searchParams.get('error') || window.location.hash
    if (error?.includes('access_denied')) {
      router.replace('/sign-in')
    }
  }, [router, searchParams])

  // Redirect happens immediately; this renders only for a brief flash
  return null
}
