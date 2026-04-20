// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { MetaPixel } from '@/components/MetaPixel';
import AuthStateWatcher from '@/components/AuthStateWatcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'licitex - Software de Gestión Empresarial Inteligente',
  description: 'Gestiona tu empresa con flujo de caja automático y asistente IA. Hecho en Chile para emprendedores chilenos.',
  keywords: ['flujo de caja', 'gestión empresarial', 'software chile', 'IA empresarial', 'licitex'],
  authors: [{ name: 'licitex' }],
  creator: 'licitex',
  publisher: 'licitex',
  metadataBase: new URL('https://licitex.cl'),
  other: {
    'facebook-domain-verification': process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION || '',
  },
  openGraph: {
    title: 'licitex - Software de Gestión Empresarial',
    description: 'Gestiona tu empresa con flujo de caja automático y asistente IA',
    url: 'https://licitex.cl',
    siteName: 'licitex',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'licitex - Software de Gestión Empresarial',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'licitex - Software de Gestión Empresarial',
    description: 'Gestiona tu empresa con flujo de caja automático y asistente IA',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>
        <GoogleAnalytics />
        <MetaPixel />
        <AuthStateWatcher />
        {children}
      </body>
    </html>
  );
}