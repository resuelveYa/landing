// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Detect development mode
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true' || process.env.NODE_ENV === 'development'

// detect if we are on a resuelveya.cl domain (including subdomains)
const isProduction = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_DEV_MODE

// Cookie config varies between dev and production
const cookieConfig = isProduction
  ? { domain: '.resuelveya.cl', path: '/', sameSite: 'lax' as const, secure: true }
  : { path: '/', sameSite: 'lax' as const, secure: false }

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      }
    } as any;
  }

  const cookieStore = await cookies()

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                ...cookieConfig,
              })
            )
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
      cookieOptions: cookieConfig
    }
  )
}
