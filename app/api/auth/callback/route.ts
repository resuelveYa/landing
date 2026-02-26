// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error_description = searchParams.get('error_description')

  // if "next" is in param, use it as the redirection URL
  const next = searchParams.get('next') ?? '/dashboard'

  // Handle OAuth errors from Supabase
  if (error_description) {
    console.error('OAuth error from Supabase:', error_description)
    return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error_description)}`)
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const isProduction = process.env.NODE_ENV === 'production'
    const cookieConfig = isProduction
      ? { domain: '.resuelveya.cl', path: '/', sameSite: 'lax' as const, secure: true }
      : { path: '/', sameSite: 'lax' as const, secure: false }

    // Determine the final redirect destination
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'
    let redirectDest = `${origin}${next}`
    if (!isLocalEnv && forwardedHost) {
      redirectDest = `https://${forwardedHost}${next}`
    }

    // Create the redirect response first — we'll attach cookies to it
    const redirectResponse = NextResponse.redirect(redirectDest)

    // Create a Supabase client that writes cookies directly into the redirect response
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.headers
            .get('cookie')
            ?.split('; ')
            .map((cookie) => {
              const [name, ...rest] = cookie.split('=')
              return { name: name.trim(), value: rest.join('=') }
            }) ?? []
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            redirectResponse.cookies.set(name, value, {
              ...options,
              ...cookieConfig,
            })
          })
        },
      },
      cookieOptions: cookieConfig,
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return redirectResponse
    } else {
      console.error('exchangeCodeForSession error:', error.message, error)
      return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error.message)}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
