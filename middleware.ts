import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip auth check for Next.js prefetch requests — these fire for every link in viewport
  // and would hammer the Supabase /token endpoint hundreds of times per minute.
  if (
    request.headers.get('next-router-prefetch') ||
    request.headers.get('purpose') === 'prefetch' ||
    request.headers.get('x-middleware-prefetch')
  ) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Detect production based on hostname - more reliable than env vars
  const hostname = request.headers.get('host') || ''
  const isProduction = hostname.endsWith('licitex.cl')

  // Cookie config varies between dev and production
  const cookieConfig = isProduction
    ? { domain: '.licitex.cl', path: '/', sameSite: 'lax' as const, secure: true }
    : { path: '/', sameSite: 'lax' as const, secure: false }

  // Bypass only when credentials are missing or dev mode is explicitly forced.
  // Do NOT bypass based on hostname — real credentials should always use real Supabase,
  // even locally, so that OAuth and session validation work correctly.
  const isLocalBypass =
    process.env.NEXT_PUBLIC_DEV_MODE === 'true' ||
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === 'undefined';

  let user = null
  if (!isLocalBypass) {
    const supabase = createServerClient(
      supabaseUrl!,
      supabaseAnonKey!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, {
                ...options,
                ...cookieConfig,
              })
            )
          },
        },
        cookieOptions: cookieConfig,
      }
    )

    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        if (error.message !== 'Auth session missing!') {
          console.error('Auth error in middleware:', error.message)
          const cookiesToClear = request.cookies.getAll().filter(c => c.name.startsWith('sb-'))
          cookiesToClear.forEach(cookie => {
            supabaseResponse.cookies.set(cookie.name, '', { ...cookieConfig, maxAge: 0 })
          })
          // Refresh token already used = race condition between tabs/requests; redirect silently
          const isRefreshTokenError = error.message.toLowerCase().includes('refresh token')
          const loginUrl = isRefreshTokenError
            ? new URL('/sign-in', request.url)
            : new URL(`/sign-in?reason=session_error&msg=${encodeURIComponent(error.message)}`, request.url)
          return NextResponse.redirect(loginUrl)
        }
      } else {
        user = data.user
      }
    } catch (error: any) {
      console.error('Unexpected auth error in middleware:', error?.message || error)
    }
  } else {
    // Local dev bypass logic
    const token = request.cookies.get('sb-local-token')?.value
    if (token === 'local-admin-bypass-token') {
      user = { 
        id: 'local-admin-id', 
        email: 'admin@saer.cl',
        user_metadata: { full_name: 'Administrador Local' }
      } as any;
    }
  }

  const url = new URL(request.url)
  const isDashboard = url.pathname.startsWith('/dashboard')
  const redirectUrl = url.searchParams.get('redirect_url')

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Handle cross-app redirects if user is signed in
  if (user && redirectUrl) {
    const allowedDomains = ['licitex.cl', 'budget.licitex.cl', 'cashflow.licitex.cl', 'localhost']
    try {
      const redirectUrlObj = new URL(redirectUrl)
      // Check if hostname ends with licitex.cl or is localhost
      if (redirectUrlObj.hostname.endsWith('licitex.cl') || redirectUrlObj.hostname === 'localhost') {
        const response = NextResponse.redirect(redirectUrl)
        // Ensure cookies are passed to the redirect response
        supabaseResponse.cookies.getAll().forEach(cookie => {
          response.cookies.set(cookie.name, cookie.value, {
            ...cookieConfig,
          })
        })
        return response
      }
    } catch (e) {
      // Invalid URL, ignore
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Only run on routes that actually need session validation.
    // Excludes all static assets, images, and non-auth API routes.
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up',
    '/api/auth/:path*',
  ],
}