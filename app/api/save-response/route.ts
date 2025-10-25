import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, email, acceptsMarketing, totalScore, level, answers, timestamp } = body;

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

    // 5) Diagnóstico (si llega en el body)
    const diagnosis = body.diagnosis || '';

    // 6) Valor SI/NO del checkbox
    const aceptaContacto = acceptsMarketing ? 'SI' : 'NO';

    // 7) Escribimos PRIMERO la fila base en A:F
    // Estructura: A Fecha | B Nombre | C Mail | D Url | E Formulario | F Diagnóstico
    const baseRow = [
      timestamp || new Date().toISOString(), // A - Fecha
      companyName || '',                      // B - Nombre
      email || '',                            // C - Mail
      '',                                     // D - Url (vacío)
      'Diagnostico Madurez',                  // E - Formulario
      diagnosis                               // F - Diagnóstico
    ];

    const rangeBase = `A${nextEmptyRow}:F${nextEmptyRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeBase,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [baseRow] },
    });

    // 8) Luego actualizamos SOLO la columna G (Acepta ser contactado)
    const rangeAcepta = `G${nextEmptyRow}:G${nextEmptyRow}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeAcepta,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[aceptaContacto]] },
    });

    console.log(`✅ Fila ${nextEmptyRow} escrita (A:F) y columna G actualizada con "${aceptaContacto}"`);

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
