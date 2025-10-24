import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// La inicialización de OpenAI se mantiene, aunque no la usemos en modo de prueba,
// para evitar errores de importación en otras partes del código si existieran.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // --- MODO DE PRUEBA ACTIVADO ---
    // La llamada real a OpenAI está desactivada.
    // En su lugar, devolvemos un análisis de prueba estático.
    // Esto te permite probar el flujo completo sin costo alguno.

    console.log('MODO DE PRUEBA: Devolviendo análisis simulado.');

    const mockAnalysis = `
# 🧪 Análisis de Prueba (Modo Local)

¡Felicidades! Si estás viendo esto, significa que el flujo de tu aplicación funciona correctamente sin llamar a la API de OpenAI.

## Verificaciones completadas:
* ✅ **Formulario de inicio:** Los datos se capturan correctamente.
* ✅ **Cuestionario:** Las respuestas se guardan en el estado de la aplicación.
* ✅ **Llamada a la API:** El endpoint \`/api/analyze\` fue alcanzado con éxito.
* ✅ **Renderizado de resultados:** La respuesta simulada se muestra en la interfaz de usuario.

## Próximos Pasos:
1.  **Revisa tu Google Sheet:** Confirma que una nueva fila con los datos de este test se haya guardado. (Esta funcionalidad es independiente del análisis de IA).
2.  **Desactiva el modo de prueba:** Cuando termines de probar, restaura el contenido original de este archivo para volver a habilitar los análisis con OpenAI.

---
*Este es un mensaje automático para fines de prueba.*
`;

    // Se retorna el objeto con el análisis de prueba.
    return NextResponse.json({
      analysis: mockAnalysis,
      success: true
    });

  } catch (error) {
    console.error('Error en /api/analyze (modo de prueba):', error);
    // Mantenemos el manejo de errores por si algo más fallara.
    return NextResponse.json(
      { error: 'Error al generar análisis simulado', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}