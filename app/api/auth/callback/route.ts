// app/api/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'

function serializeCookie(name: string, value: string, options: Record<string, any>): string {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (options.maxAge !== undefined) cookie += `; Max-Age=${options.maxAge}`
  if (options.domain) cookie += `; Domain=${options.domain}`
  if (options.path) cookie += `; Path=${options.path}`
  if (options.expires instanceof Date) cookie += `; Expires=${options.expires.toUTCString()}`
  if (options.httpOnly) cookie += '; HttpOnly'
  if (options.secure) cookie += '; Secure'
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`
  return cookie
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error_description = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  if (error_description) {
    console.error('OAuth error from Supabase:', error_description)
    return Response.redirect(`${origin}/sign-in?error=${encodeURIComponent(error_description)}`)
  }

  if (code) {
    const isProduction = process.env.NODE_ENV === 'production'
    const cookieConfig = isProduction
      ? { domain: '.resuelveya.cl', path: '/', sameSite: 'Lax' as const, secure: true }
      : { path: '/', sameSite: 'Lax' as const, secure: false }

    // Collect cookies to set from Supabase
    const cookiesToSet: Array<{ name: string; value: string; options: Record<string, any> }> = []

    // Parse incoming request cookies for PKCE verifier
    const requestCookies = request.headers
      .get('cookie')
      ?.split('; ')
      .map((c) => {
        const [name, ...rest] = c.split('=')
        return { name: name.trim(), value: rest.join('=') }
      }) ?? []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return requestCookies
          },
          setAll(incoming) {
            // Capture all cookies into our array instead of writing to response yet
            incoming.forEach(({ name, value, options }) => {
              cookiesToSet.push({ name, value, options: { ...options, ...cookieConfig } })
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
      let redirectDest = `${origin}${next}`
      if (!isLocalEnv && forwardedHost) {
        redirectDest = `https://${forwardedHost}${next}`
      }

      // Build the HTML response with all Set-Cookie headers attached
      const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Iniciando sesión...</title></head>
<body>
<p>Iniciando sesión, espera un momento...</p>
<script>window.location.replace(${JSON.stringify(redirectDest)});</script>
</body>
</html>`

      const headers = new Headers({ 'Content-Type': 'text/html; charset=utf-8' })

      // Attach every Set-Cookie header manually so the browser actually saves them
      cookiesToSet.forEach(({ name, value, options }) => {
        headers.append('Set-Cookie', serializeCookie(name, value, options))
      })

      return new Response(html, { status: 200, headers })
    } else {
      console.error('exchangeCodeForSession error:', error.message, error)
      return Response.redirect(`${origin}/sign-in?error=${encodeURIComponent(error.message)}`)
    }
  }

  return Response.redirect(`${origin}/auth/auth-code-error`)
}
