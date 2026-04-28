// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Helper: determines if two URLs have different origins
function isCrossOrigin(a: string, b: string): boolean {
  try { return new URL(a).origin !== new URL(b).origin } catch { return false }
}

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
    const { cookieConfig } = await import('@/lib/supabase/client')
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
      // Get the established session to support cross-origin token handoff in dev
      const sessionResult = await supabase.auth.getSession()
      const session = sessionResult.data.session

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      // `next` can be a full URL (e.g. https://cashflow.licitex.cl/...) when the user
      // came from a cross-app redirect. Handle both cases: full URL and relative path.
      const isNextFullUrl = next.startsWith('http://') || next.startsWith('https://')

      if (isLocalEnv) {
        const resolvedNext = isNextFullUrl ? next : `${origin}${next}`

        // Cross-origin redirect (different port in dev) → token handoff via hash
        if (session && isCrossOrigin(origin, resolvedNext)) {
          const targetUrl = new URL(resolvedNext)
          const callbackUrl = `${targetUrl.origin}/auth/callback?next=${encodeURIComponent(targetUrl.pathname + targetUrl.search)}#access_token=${session.access_token}&refresh_token=${session.refresh_token}&type=recovery`
          return NextResponse.redirect(callbackUrl)
        }

        return NextResponse.redirect(resolvedNext)
      } else if (isNextFullUrl) {
        // Production cross-app redirect (e.g. cashflow.licitex.cl).
        // Cookies are shared via .licitex.cl domain — just redirect directly.
        try {
          const nextUrl = new URL(next)
          if (nextUrl.hostname.endsWith('licitex.cl')) {
            return NextResponse.redirect(next)
          }
        } catch {}
        return NextResponse.redirect(`${origin}/dashboard`)
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
