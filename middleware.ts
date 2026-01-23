import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request })
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = new URL(request.url)
  const isDashboard = url.pathname.startsWith('/dashboard')
  const redirectUrl = url.searchParams.get('redirect_url')

  // Auth protection logic
  if (!user && isDashboard) {
    // no user, potentially respond by redirecting the user to the login page
    const loginUrl = new URL('/sign-in', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Handle cross-app redirects if user is signed in
  if (user && redirectUrl) {
    const allowedDomains = ['resuelveya.cl', 'budget.resuelveya.cl', 'cashflow.resuelveya.cl', 'localhost']
    try {
      const redirectUrlObj = new URL(redirectUrl)
      // Check if hostname ends with resuelveya.cl or is localhost
      if (redirectUrlObj.hostname.endsWith('resuelveya.cl') || redirectUrlObj.hostname === 'localhost') {
        return NextResponse.redirect(redirectUrl)
      }
    } catch (e) {
      // Invalid URL, ignore
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}