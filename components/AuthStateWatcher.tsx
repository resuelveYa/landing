'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { AuthChangeEvent } from '@supabase/supabase-js'

/**
 * Listens for Supabase auth events client-side.
 *
 * When SIGNED_OUT fires (e.g. Supabase detects a bad refresh token and revokes the session),
 * we redirect to /sign-in rather than leaving the user on a broken page.
 *
 * This catches the client-side half of the race condition: the middleware handles
 * server-side detection, this handles the browser SDK's own token validation.
 */
export default function AuthStateWatcher() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT') {
        router.push('/sign-in')
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return null
}
