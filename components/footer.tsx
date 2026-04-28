import Link from 'next/link';
import Logo from './logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="sm" href="/" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
              Plataforma de análisis de presupuestos con IA para licitaciones en Mercado Público.
              Hecho en Chile para empresas chilenas.
            </p>
            <p className="text-slate-500 text-xs">
              Diseñado para licitaciones de municipalidades y organismos públicos en{' '}
              <span className="text-slate-400">mercadopublico.cl</span>
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Analizador de Presupuestos', href: '#productos' },
                { label: 'Flujo de Caja', href: '#productos' },
                { label: 'Funcionalidades', href: '#caracteristicas' },
                { label: 'Cómo funciona', href: '#como-funciona' },
                { label: 'Precios', href: '#precios' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal y soporte */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal y soporte</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Política de Privacidad', href: '/privacy' },
                { label: 'Términos y Condiciones', href: '/terms' },
                { label: 'soporte@licitex.cl', href: 'mailto:soporte@licitex.cl' },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} licitex SpA. Todos los derechos reservados.
          </p>
          <p className="text-slate-500 text-xs">
            Hecho en Chile 🇨🇱 · Pagos con{' '}
            <span className="text-slate-400 font-medium">Webpay / Transbank</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
