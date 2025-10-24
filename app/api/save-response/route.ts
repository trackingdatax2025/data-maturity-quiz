import { NextRequest, NextResponse } from 'next/server';
import { sheets as sheets_v4 } from '@googleapis/sheets'; // Importamos solo el cliente de Sheets
import { GoogleAuth } from 'google-auth-library'; // La autenticación se mantiene igual

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { companyName, email, acceptsMarketing, totalScore, level, timestamp } = body;

  try {
    // 1. Validar que las variables de entorno estén presentes
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error('❌ ERROR: Faltan variables de entorno de Google Sheets.');
      return NextResponse.json({ success: false, message: 'El servidor no tiene configuradas las credenciales de Google.' }, { status: 500 });
    }

    // 2. Configurar la autenticación (esto no cambia)
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // 3. Crear un cliente específico para Sheets
    const sheets = sheets_v4({ version: 'v4', auth });

    // 4. Preparar la fila de datos
    const rowValues = [
      timestamp || new Date().toISOString(),
      companyName || '',
      email || '',
      acceptsMarketing ? 'Sí' : 'No',
      totalScore || 0,
      level || '',
    ];

    // 5. Escribir en la hoja de cálculo
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log('✅ Fila agregada a Google Sheets (usando cliente optimizado).');
    return NextResponse.json({ success: true, message: 'Datos guardados exitosamente.' });

  } catch (error: any) {
    console.error('❌ ERROR al guardar en Google Sheets (cliente optimizado):', error.message);
    return NextResponse.json(
      { success: false, message: 'Error interno al comunicarse con Google Sheets.', errorDetails: error.message },
      { status: 500 }
    );
  }
}