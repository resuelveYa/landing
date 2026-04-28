'use client'

import { createClient } from '@/lib/supabase/client'
import { ReactNode } from 'react'

interface CrossAppLinkProps {
  href: string
  className?: string
  children: ReactNode
}

// In production, cookies are shared via .licitex.cl — just navigate directly.
// In local dev, each port has its own cookie jar, so we pass tokens in the hash
// to the target app's /auth/callback, which calls setSession().
export default function CrossAppLink({ href, className, children }: CrossAppLinkProps) {
  const handleClick = async (e: React.MouseEvent) => {
    // Let browser handle modifier clicks (Cmd+Click, Ctrl+Click, middle-click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return

    e.preventDefault()

    const isLocal = window.location.hostname === 'localhost'
    const isCrossOrigin = new URL(href).origin !== window.location.origin

    if (isLocal && isCrossOrigin) {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const target = new URL(href)
        const callbackUrl = `${target.origin}/auth/callback?next=${encodeURIComponent(target.pathname + target.search)}#access_token=${session.access_token}&refresh_token=${session.refresh_token}&type=recovery`
        window.location.href = callbackUrl
        return
      }
    }

    window.location.href = href
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
