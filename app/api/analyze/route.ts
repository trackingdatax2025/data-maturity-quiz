import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, email, totalScore, maxScore, level, answers } = body;

    // Construir contexto detallado
    const answersContext = answers.map((a: any, idx: number) => 
      `${idx + 1}. ${a.question}\n   Respuesta: ${a.answer} (${a.description})\n   Puntaje: ${a.score}/100`
    ).join('\n\n');

    const prompt = `Eres un consultor experto en Data-Driven Marketing y Analytics con más de 15 años de experiencia ayudando a empresas a madurar su uso de datos.

CONTEXTO DEL CLIENTE:
- Empresa: ${company}
- Nivel actual: ${level}
- Puntaje obtenido: ${totalScore}/${maxScore} (${Math.round((totalScore/maxScore)*100)}%)

RESPUESTAS DEL CUESTIONARIO:
${answersContext}

TAREA:
Genera un análisis ejecutivo profesional, personalizado y accionable que incluya:

## 📊 Diagnóstico del Estado Actual
- Evaluación honesta de fortalezas identificadas
- Brechas críticas que limitan el crecimiento
- Comparación con el benchmark de la industria

## 🎯 Quick Wins (Implementación: 1-3 meses)
3-4 acciones concretas de alto impacto que puede implementar YA para mejorar resultados:
- Acción específica con ROI estimado
- Herramientas necesarias (menciona nombres específicos)
- Esfuerzo requerido (tiempo/presupuesto)

## 🚀 Roadmap Estratégico (6-12 meses)
Plan priorizado con:
- Fase 1: Fundamentos (meses 1-3)
- Fase 2: Consolidación (meses 4-6)
- Fase 3: Optimización (meses 7-12)

## 💡 Stack Tecnológico Recomendado
Herramientas específicas según su nivel actual:
- Analytics & Tracking
- Automatización
- Visualización
- Infrastructure (si aplica)

## 📈 ROI Estimado
Impacto cuantificable esperado:
- Mejora en eficiencia operativa
- Reducción de costos
- Incremento en conversiones

ESTILO:
- Lenguaje claro, directo y profesional
- Evita jerga excesiva pero sé técnicamente preciso
- Usa bullet points para facilitar lectura
- Incluye números y porcentajes cuando sea posible
- Personaliza según el nivel actual (no des recomendaciones muy avanzadas si está en nivel inicial)
- Sé optimista pero realista

LONGITUD: 500-700 palabras

Genera el análisis ahora:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un consultor experto en Data-Driven Marketing y Analytics de TrackingDataX. Generas análisis profesionales, accionables y personalizados."        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const analysis = completion.choices[0]?.message?.content || 'No se pudo generar el análisis';

    // Aquí podrías guardar en Google Sheets si quieres
    // await saveToGoogleSheets({ company, email, totalScore, level, acceptCommunications });

    return NextResponse.json({ 
      analysis,
      success: true 
    });

  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: 'Error al generar análisis', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}