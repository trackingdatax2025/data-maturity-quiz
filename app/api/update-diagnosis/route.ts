import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, diagnosis } = body;

    // 1️⃣ Validar entorno
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({ 
        success: false, 
        message: 'Configuración incompleta' 
      }, { status: 500 });
    }

    console.log('📝 Actualizando diagnóstico para:', email);

    // 2️⃣ Autenticación con Google
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 3️⃣ Buscar la fila correspondiente al email (columna C)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'C:C', // Columna C (Mail)
    });

    const emails = response.data.values || [];
    const rowIndex = emails.findIndex(row => row[0] === email);

    if (rowIndex === -1) {
      console.warn('⚠️ Email no encontrado en la sheet');
      return NextResponse.json({ success: false, message: 'Email no encontrado' });
    }

    // 4️⃣ Calcular la fila exacta (suma 1 por cabecera)
    const targetRow = rowIndex + 1;

    // 5️⃣ Actualizar solo la columna F (Diagnóstico)
    // Evitamos tocar columna G (Acepta ser contactado)
    const targetRange = `F${targetRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: targetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[diagnosis]],
      },
    });

    console.log(`✅ Diagnóstico actualizado en fila ${targetRow} (columna F)`);

    return NextResponse.json({ success: true, row: targetRow });

  } catch (error: any) {
    console.error('❌ Error actualizando diagnóstico:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
