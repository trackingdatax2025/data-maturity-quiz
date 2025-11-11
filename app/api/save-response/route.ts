import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Ahora incluimos 'diagnosis' en la desestructuración
    const { companyName, email, acceptsMarketing, totalScore, level, timestamp, diagnosis } = body;

    // 1) Validar envs
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      console.error('❌ Faltan variables de entorno de Google Sheets');
      return NextResponse.json(
        { success: false, message: 'Configuración de Google Sheets incompleta' },
        { status: 500 }
      );
    }

    console.log('📊 Guardando en Google Sheets...');
    console.log('Empresa:', companyName);
    console.log('Email:', email);
    // Agregamos un log para verificar que el diagnóstico llega
    console.log('Diagnóstico presente:', diagnosis ? 'SÍ' : 'NO');


    // 2) Auth
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 3) Cliente de Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;

    // 4) Buscar primera fila vacía en A
    console.log('🔍 Buscando primera fila vacía en columna A...');
    const colA = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:A',
    });

    const nextEmptyRow = (colA.data.values?.length ?? 0) + 1;
    console.log(`✅ Insertando en fila: ${nextEmptyRow}`);

    // 5) Valor SI/NO del checkbox
    const aceptaContacto = acceptsMarketing ? 'SI' : 'NO';

    // 6) Escribimos TODA la fila de una vez (A:G)
    // Esta es la optimización clave: una sola fila, una sola llamada.
    const fullRow = [
      timestamp || new Date().toISOString(), // A - Fecha
      companyName || '',                      // B - Nombre
      email || '',                            // C - Mail
      '',                                     // D - Url (vacío)
      'Diagnostico Madurez',                  // E - Formulario
      diagnosis || '',                        // F - Diagnóstico (Ahora sí viene)
      aceptaContacto                          // G - Acepta ser contactado
    ];

    // El rango ahora va de A hasta G
    const rangeFull = `A${nextEmptyRow}:G${nextEmptyRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeFull, // Rango completo
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [fullRow] }, // Fila completa
    });

    // 7) La segunda llamada (que actualizaba G) se elimina
    
    console.log(`✅ Fila ${nextEmptyRow} completa guardada (A:G con diagnóstico)`);

    return NextResponse.json({
      success: true,
      message: 'Datos guardados correctamente',
      row: nextEmptyRow,
    });

  } catch (error: any) {
    console.error('❌ ERROR al guardar en Google Sheets:', error);
    return NextResponse.json(
      { success: false, message: 'Error al guardar en Google Sheets', errorDetails: error?.message },
      { status: 500 }
    );
  }
}