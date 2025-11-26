// lib/config.ts
export const config = {
  isDev: process.env.NODE_ENV === 'development',
  
  // URLs de producción
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5173' 
      : 'https://admin.resuelveya.cl'), // Saerti Admin / Cash Flow
  
  chatUrl: process.env.NEXT_PUBLIC_CHAT_URL || 
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3002/analyze' 
      : 'https://app.resuelveya.cl/analyze'), // Budget Analyzer
  
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