import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Desestructuramos todos los campos que envía el frontend
    const { 
      companyName, email, acceptsMarketing, totalScore, level, timestamp, diagnosis,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      gclid, fbclid, landing_url, referrer
    } = body;

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
    console.log('Diagnóstico presente:', diagnosis ? 'SÍ' : 'NO');
    console.log('Landing URL:', landing_url);
    console.log('UTM Source:', utm_source);

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

    // 6) Escribimos TODA la fila de una vez (A:Q)
    // --- AJUSTADO A TU ESTRUCTURA DE 17 COLUMNAS ---
    const fullRow = [
      timestamp || new Date().toISOString(), // A - Fecha
      companyName || '',                      // B - Nombre
      email || '',                            // C - Mail
      landing_url || '',                      // D - Url
      'Diagnostico Madurez',                  // E - Formulario
      diagnosis || '',                        // F - Diagnóstico
      aceptaContacto,                         // G - Acepta ser contactado
      utm_source || '',                       // H - utm_source
      utm_medium || '',                       // I - utm_medium
      utm_campaign || '',                     // J - utm_campaign
      utm_term || '',                         // K - utm_term
      utm_content || '',                      // L - utm_content
      gclid || '',                            // M - gclid
      fbclid || '',                           // N - fbclid
      landing_url || '',                         // O - landing_url
      referrer || '',                      // P -  referrer
      ''                                      // Q - telefono 
    ];

    // --- MODIFICADO ---
    // El rango ahora va de A hasta Q
    const rangeFull = `A${nextEmptyRow}:Q${nextEmptyRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeFull, // Rango completo (A:Q)
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [fullRow] }, // Fila completa
    });

    // 7) La segunda llamada (que actualizaba G) se elimina
    
    // --- MODIFICADO ---
    console.log(`✅ Fila ${nextEmptyRow} completa guardada (A:Q con diagnóstico, UTMs y telefono)`);

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