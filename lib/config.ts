// lib/config.ts
export const config = {
  isDev: process.env.NODE_ENV === 'development',

  // URLs de producción (Forzamos rutas relativas para evitar subdominios antiguos)
  adminUrl: '/cashflow',
  chatUrl: '/budget/analyze',

  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://resuelveya.cl'), // Landing
};

export const getProductUrls = () => {
  return {
    admin: config.adminUrl,     // Saerti Admin / Cash Flow
    chat: config.chatUrl,       // Budget Analyzer
    landing: config.baseUrl,    // Landing
  };
};