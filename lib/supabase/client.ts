// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

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
    cookieOptions: {
      domain: '.resuelveya.cl',
      path: '/',
      sameSite: 'lax',
      secure: true,
    }
  })
}
