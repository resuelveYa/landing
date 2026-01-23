import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Validar datos básicos
    if (!body.email || !body.fullName || !body.phone) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Si el usuario está autenticado, actualizar su metadata en Supabase
    if (user) {
      await supabase.auth.updateUser({
        data: {
          betaAccess: true,
          betaSignupDate: new Date().toISOString(),
          companyName: body.companyName,
          industryType: body.industryType,
          companySize: body.companySize,
          mainChallenge: body.mainChallenge,
          phone: body.phone,
          // Mantener compatibilidad con dashboard
          aiQueriesRemaining: 50,
          aiQueriesTotal: 50,
          betaUser: true,
        }
      });
    }

    // Siempre registramos el beta signup (podría ir a una tabla específica)
    console.log('Beta signup:', {
      email: body.email,
      fullName: body.fullName,
      companyName: body.companyName,
      timestamp: new Date().toISOString(),
    });

    // Opcional: Guardar en una tabla 'beta_signups' para seguimiento de CRM
    const { error: dbError } = await supabase
      .from('beta_signups' as any) // Cast as any if table doesn't have types yet
      .insert({
        email: body.email,
        full_name: body.fullName,
        phone: body.phone,
        company_name: body.companyName,
        industry: body.industryType,
        company_size: body.companySize,
        challenge: body.mainChallenge,
        user_id: user?.id || null
      });

    if (dbError && dbError.code !== 'PGRST116') { // PGRST116 is 'table not found' usually if types are strict
      console.warn('Could not save to beta_signups table, but continuing:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Registro exitoso',
      userId: user?.id || null,
    });
  } catch (error) {
    console.error('Error en beta signup:', error);
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}