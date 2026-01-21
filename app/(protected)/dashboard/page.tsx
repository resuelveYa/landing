import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Sparkles, Bot, ExternalLink, Zap, BarChart3, FileText, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { getProductUrls } from '@/lib/config';
import Logo from '@/components/logo';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const urls = getProductUrls();

  const aiQueriesRemaining = (user.privateMetadata?.aiQueriesRemaining as number) || 50;
  const aiQueriesTotal = (user.privateMetadata?.aiQueriesTotal as number) || 50;
  const betaAccess = user.publicMetadata?.betaAccess as boolean;
  const companyName = user.publicMetadata?.companyName as string;

  const queriesUsed = aiQueriesTotal - aiQueriesRemaining;
  const queriesPercentage = (aiQueriesRemaining / aiQueriesTotal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Logo size="md" showText />
              {betaAccess && (
                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold animate-pulse">
                  Beta Tester
                </span>
              )}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            ¡Hola, {user.firstName || 'Usuario'}! 👋
          </h2>
          <p className="text-xl text-gray-600">
            {companyName ? `Gestiona las finanzas de ${companyName}` : 'Bienvenido a tu nueva suite de gestión financiera (v2)'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Consultas IA */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles size={28} className="text-white" />
              </div>
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${queriesPercentage > 50 ? 'bg-green-100 text-green-700' :
                  queriesPercentage > 20 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                }`}>
                {queriesPercentage.toFixed(0)}%
              </span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">
              {aiQueriesRemaining} <span className="text-lg text-gray-500">de {aiQueriesTotal}</span>
            </h3>
            <p className="text-gray-600 font-semibold mb-4">Consultas IA disponibles</p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${queriesPercentage > 50 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    queriesPercentage > 20 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                style={{ width: `${queriesPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              ✅ Has usado {queriesUsed} consultas este mes
            </p>
          </div>

          {/* Estado Beta */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Zap size={28} />
            </div>
            <h3 className="text-3xl font-black mb-1">
              Acceso Beta
            </h3>
            <p className="text-purple-100 mb-4">
              Todas las funciones desbloqueadas
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
              <p className="text-sm font-bold flex items-center gap-2">
                <Sparkles size={16} />
                Sin límites durante el beta
              </p>
            </div>
          </div>

          {/* Quick Action */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Bot size={28} />
            </div>
            <h3 className="text-2xl font-black mb-2">
              Análisis Rápido
            </h3>
            <p className="text-cyan-100 mb-4">
              Sube documentos y obtén insights
            </p>
            <a
              href={urls.chat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Abrir Asistente
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Budget Analyzer Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Bot size={40} />
                <div>
                  <h3 className="text-3xl font-black">Asistente IA de Presupuestos</h3>
                  <p className="text-white/90 text-lg">Análisis inteligente y conversacional</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <FileText size={32} className="mx-auto text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Análisis de Documentos</h4>
                  <p className="text-sm text-gray-600">Sube Excel, PDF o CSV</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <BarChart3 size={32} className="mx-auto text-purple-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Comparaciones</h4>
                  <p className="text-sm text-gray-600">Detecta desviaciones automáticamente</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
                  <Sparkles size={32} className="mx-auto text-pink-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Proyecciones IA</h4>
                  <p className="text-sm text-gray-600">Predicciones precisas</p>
                </div>
              </div>

              <a
                href={urls.chat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Bot size={24} />
                Abrir Asistente IA
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Cash Flow Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <TrendingUp size={40} />
                <div>
                  <h3 className="text-3xl font-black">Flujo de Caja</h3>
                  <p className="text-white/90 text-lg">Gestión financiera completa</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                  <DollarSign size={32} className="mx-auto text-emerald-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Ingresos</h4>
                  <p className="text-sm text-gray-600">Seguimiento de entradas</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl">
                  <BarChart3 size={32} className="mx-auto text-teal-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Egresos</h4>
                  <p className="text-sm text-gray-600">Control de costos</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl">
                  <TrendingUp size={32} className="mx-auto text-cyan-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Proyecciones</h4>
                  <p className="text-sm text-gray-600">Forecasting preciso</p>
                </div>
              </div>

              <a
                href={urls.admin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <TrendingUp size={24} />
                Abrir Flujo de Caja
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-black mb-2">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-white/90 mb-4 text-lg">
            Como beta tester, tu feedback es invaluable. Contáctanos si tienes preguntas o sugerencias.
          </p>
          <Link href="mailto:soporte@resuelveYA.cl" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
            soporte@resuelveYA.cl
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </div>
  );
}