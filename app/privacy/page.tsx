import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | licitex',
  description: 'Política de privacidad y tratamiento de datos personales de licitex.cl',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-500 mb-10">Última actualización: 20 de abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Responsable del tratamiento</h2>
            <p className="text-gray-600 leading-relaxed">
              licitex SpA (en adelante, <strong>"licitex"</strong>, <strong>"nosotros"</strong> o <strong>"la empresa"</strong>),
              con domicilio en Chile, es responsable del tratamiento de los datos personales recopilados a través de
              la plataforma <strong>licitex.cl</strong> y sus subdominos asociados (<em>cashflow.licitex.cl</em>, <em>budget.licitex.cl</em>).
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              Contacto: <a href="mailto:privacidad@licitex.cl" className="text-blue-600 hover:underline">privacidad@licitex.cl</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Datos que recopilamos</h2>
            <p className="text-gray-600 leading-relaxed mb-2">Recopilamos los siguientes datos personales:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li><strong>Datos de cuenta:</strong> nombre, correo electrónico, contraseña (cifrada).</li>
              <li><strong>Datos de autenticación:</strong> token de sesión, proveedor OAuth (Google, GitHub).</li>
              <li><strong>Datos de uso:</strong> páginas visitadas, funciones utilizadas, fecha y hora de acceso.</li>
              <li><strong>Datos financieros ingresados por el usuario:</strong> flujos de caja, presupuestos y documentos que el propio usuario sube a la plataforma.</li>
              <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Finalidad del tratamiento</h2>
            <p className="text-gray-600 leading-relaxed mb-2">Utilizamos tus datos para:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li>Crear y gestionar tu cuenta en la plataforma.</li>
              <li>Prestar los servicios contratados (flujo de caja, análisis de presupuestos, asistente IA).</li>
              <li>Enviarte comunicaciones relacionadas con el servicio y novedades (puedes darte de baja en cualquier momento).</li>
              <li>Mejorar la plataforma mediante análisis agregado y anónimo de uso.</li>
              <li>Cumplir obligaciones legales aplicables en Chile.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Base legal</h2>
            <p className="text-gray-600 leading-relaxed">
              El tratamiento de tus datos se basa en: (a) la ejecución del contrato de servicio aceptado al registrarte;
              (b) tu consentimiento explícito cuando corresponda; y (c) el cumplimiento de obligaciones legales,
              conforme a la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> de Chile y sus modificaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Compartición de datos con terceros</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Compartimos datos únicamente con:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li><strong>Supabase Inc.:</strong> proveedor de base de datos y autenticación (servidores en EE.UU., con garantías adecuadas de protección).</li>
              <li><strong>Google LLC:</strong> para autenticación OAuth y análisis de uso (Google Analytics), sujeto a sus propias políticas de privacidad.</li>
              <li><strong>Anthropic PBC:</strong> los documentos que el usuario sube para análisis IA son procesados por la API de Claude. No se almacenan en sus servidores más allá del tiempo necesario para generar la respuesta.</li>
              <li><strong>Autoridades competentes:</strong> cuando la ley chilena lo exija.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Retención de datos</h2>
            <p className="text-gray-600 leading-relaxed">
              Conservamos tus datos mientras tu cuenta esté activa. Si solicitas la eliminación de tu cuenta,
              suprimiremos tus datos personales en un plazo máximo de <strong>30 días hábiles</strong>, salvo que
              debamos conservarlos por obligación legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Seguridad</h2>
            <p className="text-gray-600 leading-relaxed">
              Implementamos medidas técnicas y organizativas para proteger tus datos: cifrado en tránsito (HTTPS/TLS),
              contraseñas almacenadas con hash seguro, acceso restringido por roles y autenticación de dos factores
              disponible para cuentas de administrador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Tus derechos</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Conforme a la legislación chilena vigente, tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li><strong>Acceso:</strong> conocer qué datos tuyos tenemos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Cancelación/Eliminación:</strong> solicitar la supresión de tus datos.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento en ciertos supuestos.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Para ejercer tus derechos, escríbenos a{' '}
              <a href="mailto:privacidad@licitex.cl" className="text-blue-600 hover:underline">privacidad@licitex.cl</a>.
              Responderemos en un plazo máximo de 15 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos cookies estrictamente necesarias para mantener tu sesión autenticada, y cookies de análisis
              (Google Analytics) para entender cómo se usa la plataforma. Puedes desactivar las cookies de análisis
              desde la configuración de tu navegador sin afectar la funcionalidad del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Cambios a esta política</h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos actualizar esta política en cualquier momento. Te notificaremos por correo electrónico o mediante
              un aviso en la plataforma con al menos <strong>15 días de anticipación</strong> antes de que los cambios
              entren en vigor.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-400">
              ¿Tienes preguntas sobre esta política?{' '}
              <a href="mailto:privacidad@licitex.cl" className="text-blue-600 hover:underline">Contáctanos</a>.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Ver también:{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">Términos y Condiciones</Link>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
