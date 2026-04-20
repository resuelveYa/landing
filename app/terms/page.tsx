import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones | licitex',
  description: 'Términos y condiciones de uso de la plataforma licitex.cl',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-gray-500 mb-10">Última actualización: 20 de abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Aceptación</h2>
            <p className="text-gray-600 leading-relaxed">
              Al crear una cuenta o utilizar los servicios de <strong>licitex.cl</strong>, aceptas estos Términos y Condiciones
              en su totalidad. Si no estás de acuerdo, no uses la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Descripción del servicio</h2>
            <p className="text-gray-600 leading-relaxed">
              licitex es una plataforma de gestión empresarial que ofrece herramientas de flujo de caja,
              análisis de presupuestos con inteligencia artificial y gestión financiera para empresas chilenas.
              El servicio se presta a través de <strong>licitex.cl</strong> y sus subdominios asociados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Cuenta de usuario</h2>
            <p className="text-gray-600 leading-relaxed">
              Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas
              las actividades realizadas desde tu cuenta. Notifícanos de inmediato ante cualquier uso
              no autorizado a <a href="mailto:soporte@licitex.cl" className="text-blue-600 hover:underline">soporte@licitex.cl</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Uso aceptable</h2>
            <p className="text-gray-600 leading-relaxed mb-2">Te comprometes a no:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li>Usar la plataforma para actividades ilegales o fraudulentas.</li>
              <li>Intentar vulnerar la seguridad del sistema.</li>
              <li>Cargar contenido que infrinja derechos de terceros.</li>
              <li>Realizar ingeniería inversa o extraer el código fuente de la plataforma.</li>
              <li>Revender o sublicenciar el acceso a terceros sin autorización escrita.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Propiedad intelectual</h2>
            <p className="text-gray-600 leading-relaxed">
              Todo el contenido, diseño, código y marca de licitex es propiedad exclusiva de licitex SpA.
              Los datos que tú ingresas en la plataforma son de tu propiedad y puedes exportarlos en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Planes y pagos</h2>
            <p className="text-gray-600 leading-relaxed">
              licitex ofrece un período de acceso gratuito durante la fase Beta. Los precios y condiciones de
              los planes pagados serán comunicados con al menos <strong>30 días de anticipación</strong> antes
              de su implementación. Los cobros son en pesos chilenos (CLP) e incluyen IVA cuando corresponda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Disponibilidad del servicio</h2>
            <p className="text-gray-600 leading-relaxed">
              Nos esforzamos por mantener la plataforma disponible 24/7, pero no garantizamos disponibilidad
              ininterrumpida. Realizaremos mantenimientos programados informando con anticipación.
              No somos responsables por pérdidas derivadas de interrupciones del servicio fuera de nuestro control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Limitación de responsabilidad</h2>
            <p className="text-gray-600 leading-relaxed">
              licitex provee herramientas de gestión financiera como apoyo a la toma de decisiones.
              No somos responsables por decisiones comerciales tomadas en base a los análisis de la plataforma.
              La responsabilidad total de licitex ante cualquier reclamación no excederá el monto pagado
              por el servicio en los últimos 3 meses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Cancelación</h2>
            <p className="text-gray-600 leading-relaxed">
              Puedes cancelar tu cuenta en cualquier momento desde la configuración de tu perfil o
              escribiendo a <a href="mailto:soporte@licitex.cl" className="text-blue-600 hover:underline">soporte@licitex.cl</a>.
              licitex puede suspender o eliminar cuentas que violen estos términos, previa notificación cuando sea posible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Ley aplicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa se someterá
              a la jurisdicción de los tribunales ordinarios de justicia de la ciudad de Santiago, Chile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Cambios a estos términos</h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos modificar estos términos en cualquier momento. Te notificaremos por correo con
              al menos <strong>15 días de anticipación</strong>. El uso continuado del servicio tras la
              entrada en vigor de los cambios implica su aceptación.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-400">
              ¿Tienes dudas?{' '}
              <a href="mailto:soporte@licitex.cl" className="text-blue-600 hover:underline">Contáctanos</a>.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Ver también:{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Política de Privacidad</Link>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
