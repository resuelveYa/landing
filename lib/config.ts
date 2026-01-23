// lib/config.ts
export const config = {
  isDev: process.env.NODE_ENV === 'development',

  // URLs de los microservicios
  adminUrl: process.env.NEXT_PUBLIC_CASHFLOW_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://cashflow.resuelveya.cl'),

  chatUrl: process.env.NEXT_PUBLIC_BUDGET_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://budget.resuelveya.cl'),

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