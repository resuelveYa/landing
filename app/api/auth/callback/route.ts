// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
// The client you created in Step 2
import { createClient } from '@/lib/supabase/server'

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
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // i.e. vercel.com
      const isLocalEnv = process.env.NODE_ENV === 'development'

      let redirectUrl = `${origin}${next}`
      if (!isLocalEnv && forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      }

      const finalUrl = new URL(redirectUrl)
      // Indicate if Supabase returned a valid session object or null
      finalUrl.searchParams.set('auth_exchange_status', data?.session ? 'session_present' : 'session_empty')

      return NextResponse.redirect(finalUrl.toString())
    } else {
      // Log the error for debugging
      console.error('exchangeCodeForSession error:', error.message, error)
      return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error.message)}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
