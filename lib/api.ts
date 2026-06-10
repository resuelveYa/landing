// lib/api.ts
// Helper para construir URLs hacia la API. Normaliza NEXT_PUBLIC_API_URL
// para que funcione tanto si incluye el sufijo /api (ej. desarrollo local
// "http://localhost:3001/api") como si no (ej. producción "https://api.licitex.cl").

export function apiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_API_URL || 'https://api.licitex.cl')
    .replace(/\/+$/, '')
    .replace(/\/api$/, '');

  return `${base}${path}`;
}
