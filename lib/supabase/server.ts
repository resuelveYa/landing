// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const isProduction = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DEV_MODE !== 'true'

// Cookie config varies between dev and production
const cookieConfig = isProduction
  ? { domain: '.licitex.cl', path: '/', sameSite: 'lax' as const, secure: true }
  : { path: '/', sameSite: 'lax' as const, secure: false }

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isBypass = !url || !anonKey || url === 'undefined' || process.env.NEXT_PUBLIC_DEV_MODE === 'true'

  if (isBypass) {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-local-token')?.value

    const mockUser = { 
      id: 'local-admin-id', 
      email: 'admin@saer.cl',
      user_metadata: { full_name: 'Administrador Local' }
    }

    const mockSession = { 
      access_token: 'local-admin-bypass-token',
      refresh_token: 'local-admin-bypass-refresh-token',
      user: mockUser
    }

    const isAuthenticated = token === 'local-admin-bypass-token'

    return {
      auth: {
        getUser: () => Promise.resolve({ 
          data: { user: isAuthenticated ? mockUser : null }, 
          error: null 
        }),
        getSession: () => Promise.resolve({ 
          data: { session: isAuthenticated ? mockSession : null }, 
          error: null 
        }),
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
