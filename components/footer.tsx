import Link from 'next/link';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import Logo from './logo';  // ← Importar Logo

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            {/* ← Reemplazar el div con Logo */}
            <div className="mb-4">
              <Logo size="md" showText href="/" textColor="light" />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Software de gestión empresarial inteligente. 
              Hecho en Chile, para emprendedores chilenos.
            </p>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#productos" className="hover:text-blue-400 transition-colors">
                  Asistente IA
                </a>
              </li>
              <li>
                <a href="#beta" className="hover:text-blue-400 transition-colors">
                  Programa Beta
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <a href="mailto:soporte@licitex.cl" className="hover:text-blue-400 transition-colors">
                  Soporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} licitex. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-400">
            Hecho con ❤️ en Chile 🇨🇱
          </p>
        </div>
      </div>
    </footer>
  );
}