// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

const isProduction = typeof window !== 'undefined'
  ? window.location.hostname.endsWith('licitex.cl')
  : process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DEV_MODE !== 'true'

// Cookie config varies between dev and production
const cookieConfig = isProduction
  ? { domain: '.licitex.cl', path: '/', sameSite: 'lax' as const, secure: true }
  : { path: '/', sameSite: 'lax' as const, secure: false }

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isBypass = !url || !anonKey || url === 'undefined' || process.env.NEXT_PUBLIC_DEV_MODE === 'true';

  if (isBypass) {
    // Helper to get cookie
    const getLocalToken = () => {
      if (typeof document === 'undefined') return null;
      return document.cookie.split('; ').find(row => row.startsWith('sb-local-token='))?.split('=')[1];
    };

    // Helper to set cookie
    const setLocalToken = (token: string | null) => {
      if (typeof document === 'undefined') return;
      if (token) {
        document.cookie = `sb-local-token=${token}; path=/; max-age=604800; SameSite=Lax`;
      } else {
        document.cookie = `sb-local-token=; path=/; max-age=0; SameSite=Lax`;
      }
    };

    const mockUser = { 
      id: 'local-admin-id', 
      email: 'admin@saer.cl',
      user_metadata: { full_name: 'Administrador Local' }
    };

    const mockSession = { 
      access_token: 'local-admin-bypass-token',
      refresh_token: 'local-admin-bypass-refresh-token',
      user: mockUser
    };

    return {
      auth: {
        getUser: () => {
          const token = getLocalToken();
          if (token === 'local-admin-bypass-token') {
            return Promise.resolve({ data: { user: mockUser }, error: null });
          }
          return Promise.resolve({ data: { user: null }, error: null });
        },
        getSession: () => {
          const token = getLocalToken();
          if (token === 'local-admin-bypass-token') {
            return Promise.resolve({ data: { session: mockSession }, error: null });
          }
          return Promise.resolve({ data: { session: null }, error: null });
        },
        signInWithPassword: ({ email }: { email: string }) => {
          if (email === 'admin@saer.cl') {
            setLocalToken('local-admin-bypass-token');
            // Force cookie for API sharing
            if (typeof document !== 'undefined') {
              document.cookie = `sb-local-token=local-admin-bypass-token; path=/; max-age=604800; SameSite=Lax`;
            }
            return Promise.resolve({ data: { user: mockUser, session: mockSession }, error: null });
          }
          return Promise.resolve({ data: { user: null, session: null }, error: null });
        },
        signInWithOAuth: () => Promise.resolve({ data: {}, error: null }),
        setSession: (session: any) => {
          if (session?.access_token === 'local-admin-bypass-token') {
            setLocalToken('local-admin-bypass-token');
          }
          return Promise.resolve({ data: { user: mockUser, session: mockSession }, error: null });
        },
        onAuthStateChange: (callback: any) => {
          const token = getLocalToken();
          if (token === 'local-admin-bypass-token') {
            callback('SIGNED_IN', mockSession);
          }
          return { data: { subscription: { unsubscribe: () => { } } } };
        },
        signOut: () => {
          setLocalToken(null);
          return Promise.resolve({ error: null });
        },
      },
      storage: { from: () => ({ upload: () => Promise.resolve({ data: {}, error: null }) }) }
    } as any
  }

  return createBrowserClient(url, anonKey, {
    cookieOptions: cookieConfig
  })
}

export async function getAccessToken() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url === 'undefined') {
    return 'local-admin-bypass-token';
  }
  // This assumes a supabase instance is available or can be created
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}
