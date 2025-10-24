// app/api/save-response/route.ts - Endpoint para guardar en Google Sheets

import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, email, acceptsMarketing, totalScore, level, timestamp } = body;

    // Configurar credenciales de Google (desde variables de entorno)
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // Conectar al spreadsheet
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID || '',
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Verificar si hay headers, si no, crearlos
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      await sheet.setHeaderRow([
        'Fecha y Hora',
        'Nombre Empresa',
        'Email',
        'Acepta Comunicaciones',
        'Puntaje Total',
        'Nivel Madurez',
      ]);
    }

    // Agregar nueva fila
    await sheet.addRow({
      'Fecha y Hora': timestamp,
      'Nombre Empresa': companyName,
      'Email': email,
      'Acepta Comunicaciones': acceptsMarketing ? 'Sí' : 'No',
      'Puntaje Total': totalScore.toString(),
      'Nivel Madurez': level,
    });

    return NextResponse.json({ success: true, message: 'Datos guardados exitosamente' });

  } catch (error: any) {
    console.error('Error saving to Google Sheets:', error);
    
    // Fallar silenciosamente para no interrumpir la experiencia del usuario
    return NextResponse.json(
      { success: false, message: 'Error guardando datos', error: error.message },
      { status: 200 } // Retornamos 200 para no romper el flujo
    );
  }
}
