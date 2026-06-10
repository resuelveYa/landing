// lib/plans.ts
// Fuente única de verdad para los planes/tiers ofrecidos a los usuarios.
// Usado por PricingSection, checkout y payment-result para mantener
// nombres, precios y cupos consistentes en toda la landing.

export type PlanId = 'free' | 'starter' | 'pro' | 'business';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  /** Monto en CLP. 0 para el plan gratuito. */
  amount: number;
  /** Precio formateado para mostrar, ej. "$49.990" */
  price: string;
  period: string;
  description: string;
  /** Análisis IA incluidos (mensuales, salvo el plan free que es un total acumulado). */
  analyses: number;
  /** Precio en CLP por análisis adicional, si aplica. */
  extraAnalysisPrice?: number;
  features: PlanFeature[];
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    amount: 0,
    price: '$0',
    period: 'siempre',
    description: 'Para conocer la plataforma y hacer tus primeras pruebas',
    analyses: 2,
    features: [
      { text: '2 análisis IA incluidos', included: true },
      { text: 'Flujo de caja básico', included: true },
      { text: '1 organización', included: true },
      { text: 'Exportaciones PDF', included: false },
      { text: 'Análisis extra disponibles', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    amount: 49990,
    price: '$49.990',
    period: 'CLP/mes',
    description: 'Para empresas pequeñas con licitaciones ocasionales',
    analyses: 15,
    extraAnalysisPrice: 3500,
    features: [
      { text: '15 análisis IA incluidos/mes', included: true },
      { text: 'Flujo de caja completo', included: true },
      { text: '3 organizaciones', included: true },
      { text: 'Exportaciones PDF ilimitadas', included: true },
      { text: 'Historial 12 meses', included: true },
      { text: 'Soporte por email', included: true },
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    amount: 99990,
    price: '$99.990',
    period: 'CLP/mes',
    description: 'Para contratistas con licitaciones frecuentes',
    analyses: 40,
    extraAnalysisPrice: 2900,
    features: [
      { text: '40 análisis IA incluidos/mes', included: true },
      { text: 'Flujo de caja completo', included: true },
      { text: '10 organizaciones', included: true },
      { text: 'Exportaciones ilimitadas', included: true },
      { text: 'Proyecciones IA avanzadas', included: true },
      { text: 'Soporte prioritario', included: true },
    ],
  },
  business: {
    id: 'business',
    name: 'Business',
    amount: 179990,
    price: '$179.990',
    period: 'CLP/mes',
    description: 'Para empresas constructoras con alto volumen',
    analyses: 120,
    extraAnalysisPrice: 2200,
    features: [
      { text: '120 análisis IA incluidos/mes', included: true },
      { text: 'Flujo de caja completo', included: true },
      { text: 'Organizaciones ilimitadas', included: true },
      { text: 'Exportaciones ilimitadas', included: true },
      { text: 'API access', included: true },
      { text: 'Soporte dedicado 24/7', included: true },
    ],
  },
};

export const PLAN_LIST: Plan[] = Object.values(PLANS);

/** Planes que se pueden comprar vía checkout (todos salvo el gratuito). */
export const PAID_PLAN_IDS = PLAN_LIST.filter((p) => p.id !== 'free').map((p) => p.id);

export function isPaidPlanId(id: string | null | undefined): id is PlanId {
  return !!id && id in PLANS && id !== 'free';
}
