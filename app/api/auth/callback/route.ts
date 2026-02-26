// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
    const isProduction = process.env.NODE_ENV === 'production'
    const cookieConfig = isProduction
      ? { domain: '.resuelveya.cl', path: '/', sameSite: 'lax' as const, secure: true }
      : { path: '/', sameSite: 'lax' as const, secure: false }

    // Use next/headers cookies() so Set-Cookie headers are attached to the response properly
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
              try {
                cookieStore.set(name, value, { ...options, ...cookieConfig })
              } catch { /* ignore errors in server components */ }
            })
          },
        },
        cookieOptions: cookieConfig,
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Determine final destination URL
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      let redirectDest = `${origin}${next}`
      if (!isLocalEnv && forwardedHost) {
        redirectDest = `https://${forwardedHost}${next}`
      }

      // Return HTML page that immediately redirects via JS
      // This ensures Set-Cookie headers on the 200 response are ALWAYS saved by the browser
      // before the redirect happens (unlike a 302 where browsers sometimes ignore Set-Cookie)
      const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Iniciando sesión...</title></head>
<body>
<p>Iniciando sesión, espera un momento...</p>
<script>window.location.replace(${JSON.stringify(redirectDest)});</script>
</body>
</html>`

      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    } else {
      console.error('exchangeCodeForSession error:', error.message, error)
      return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error.message)}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
