import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Logo from "@/components/logo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex flex-col">
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-600">
              Inicia sesión para continuar con resuelveYA
            </p>
          </div>

          <AuthForm mode="sign-in" />

          <p className="text-center mt-6 text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up" className="text-blue-600 font-semibold hover:text-blue-700">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}