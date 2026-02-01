// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Detect development mode
const isDevMode = typeof window !== 'undefined'
  ? window.location.hostname === 'localhost'
  : process.env.NEXT_PUBLIC_DEV_MODE === 'true' || process.env.NODE_ENV === 'development'

// Cookie config varies between dev and production
const cookieConfig = isDevMode
  ? { path: '/', sameSite: 'lax' as const, secure: false }
  : { domain: '.resuelveya.cl', path: '/', sameSite: 'lax' as const, secure: true }

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    if (typeof window !== 'undefined') {
      console.error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!')
    }
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: {}, error: new Error('Missing Supabase credentials') }),
        signUp: () => Promise.resolve({ data: {}, error: new Error('Missing Supabase credentials') }),
        signInWithOAuth: () => Promise.resolve({ data: {}, error: new Error('Missing Supabase credentials') }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      }
    } as any
  }

  return createBrowserClient(url, anonKey, {
    cookieOptions: cookieConfig
  })
}
