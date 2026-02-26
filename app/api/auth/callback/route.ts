// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error_description = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  if (error_description) {
    console.error('OAuth error from Supabase:', error_description)
    return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error_description)}`)
  }

  if (code) {
    const isProduction = process.env.NODE_ENV === 'production'
    const cookieConfig = isProduction
      ? { domain: '.resuelveya.cl', path: '/', sameSite: 'lax' as const, secure: true }
      : { path: '/', sameSite: 'lax' as const, secure: false }

    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, { ...options, ...cookieConfig })
            })
          },
        },
        cookieOptions: cookieConfig,
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      console.error('exchangeCodeForSession error:', error.message)
      return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
