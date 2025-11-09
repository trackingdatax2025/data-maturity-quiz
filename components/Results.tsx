'use client';

import { useEffect, useState } from 'react';
import { calculateLevel, MAX_SCORE, questions } from '@/lib/questions';
import { Loader2, Download, RefreshCw, TrendingUp, Target, Zap, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultsProps {
  companyData: {
    company: string;
    email: string;
    acceptCommunications: boolean;
  };
  answers: Record<string, number>;
  totalScore: number;
  onRestart: () => void;
}

export default function Results({ companyData, answers, totalScore, onRestart }: ResultsProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const levelData = calculateLevel(totalScore);

  useEffect(() => {
    // Esta función ahora se encarga de guardar y luego analizar.
    saveAndAnalyze();
  }, []);

  const saveAndAnalyze = async () => {
    setLoading(true);
    setError('');
    
    try {
      const timestamp = new Date().toISOString();

      // PASO 1: Guardar datos básicos
      console.log('📊 Guardando datos básicos...');
      try {
        await fetch('/api/save-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: companyData.company,
            email: companyData.email,
            acceptsMarketing: companyData.acceptCommunications,
            totalScore: totalScore,
            level: levelData.level,
            timestamp: timestamp,
          }),
        });
      } catch (sheetError) {
        console.warn('⚠️ Error en Sheets:', sheetError);
      }

      // PASO 2: Generar análisis IA
      console.log('🤖 Generando análisis...');
      const detailedAnswers = questions.map((q) => {
        const answerValue = answers[q.id];
        const selectedOption = q.options.find(opt => opt.value === answerValue);
        return {
          question: q.text,
          answer: selectedOption?.text || 'No respondida',
          description: selectedOption?.description || '',
          score: answerValue
        };
      });

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: companyData.company,
          email: companyData.email,
          totalScore,
          maxScore: MAX_SCORE,
          level: levelData.level,
          answers: detailedAnswers
        }),
      });

      if (!response.ok) throw new Error('Error en análisis');

      const data = await response.json();
      setAnalysis(data.analysis);

      // PASO 3: Actualizar diagnóstico
      console.log('📝 Actualizando diagnóstico...');
      try {
        await fetch('/api/update-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: companyData.email,
            diagnosis: data.analysis,
          }),
        });
      } catch (updateError) {
        console.warn('⚠️ Error actualizando:', updateError);
      }
      
    } catch (err) {
      setError('Error al generar análisis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- SOLUCIÓN SIMPLE Y DEFINITIVA PARA EL BADGE! ---
  // Esta función devuelve clases de color SÓLIDAS que Tailwind siempre puede encontrar.
  const getLevelBadgeClasses = (level: string) => {
    switch (level) {
      case 'Inicial':
        return 'bg-gray-200 text-gray-800'; // Fondo gris, texto oscuro
      case 'Básico':
        return 'bg-brand-light-blue text-brand-primary'; // Fondo azul claro, texto azul
      case 'Intermedio':
        return 'bg-brand-secondary text-white'; // Fondo azul medio, texto blanco
      case 'Avanzado':
        return 'bg-brand-primary text-white'; // Fondo azul oscuro, texto blanco
      case 'Experto':
        return 'bg-gray-800 text-white'; // Fondo gris oscuro, texto blanco
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            ¡Análisis Completado!
          </h2>
          <p className="text-gray-600">
            Aquí están los resultados para <span className="font-semibold text-brand-primary">{companyData.company}</span>
          </p>
        </div>

        {/* Score visualization */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 mb-6">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
              <circle cx="96" cy="96" r="88" stroke="url(#gradient)" strokeWidth="12" fill="transparent" strokeDasharray={`${2 * Math.PI * 88}`} strokeDashoffset={`${2 * Math.PI * 88 * (1 - levelData.percentage / 100)}`} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065EB3" />
                  <stop offset="100%" stopColor="#1D9CDC" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold gradient-text">{totalScore}</span>
              <span className="text-sm text-gray-500">de {MAX_SCORE}</span>
            </div>
          </div>
          
          {/* --- ¡AQUÍ SE USA LA NUEVA FUNCIÓN! --- */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xl shadow-lg ${getLevelBadgeClasses(levelData.level)}`}>
            <span className="text-2xl">{levelData.emoji}</span>
            <span>Nivel {levelData.level}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-brand-light-blue rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-brand-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600">Percentil</p>
            <p className="text-2xl font-bold text-brand-primary">{Math.round(levelData.percentage)}%</p>
          </div>
          <div className="bg-brand-light-blue rounded-lg p-4 text-center">
            <Target className="w-6 h-6 text-brand-secondary mx-auto mb-2" />
            <p className="text-sm text-gray-600">Preguntas</p>
            <p className="text-2xl font-bold text-brand-secondary">{questions.length}/{questions.length}</p>
          </div>
          <div className="bg-brand-light-blue rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Potencial</p>
            <p className="text-2xl font-bold text-gray-700">{MAX_SCORE - totalScore} pts</p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Análisis Personalizado con IA
          </h3>
        </div>
        
        {/* --- CÓDIGO DE CARGA RESTAURADO --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
            <p className="text-gray-600">Generando tu análisis personalizado...</p>
            <p className="text-sm text-gray-500 mt-2">Esto puede tomar unos segundos</p>
          </div>
        )}

        {/* --- CÓDIGO DE ERROR RESTAURADO --- */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={saveAndAnalyze}
              className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        )}
        
        {/* --- CÓDIGO DE ANÁLISIS (YA ESTABA BIEN) --- */}
        {!loading && !error && analysis && (
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
              }}
            >
              {analysis}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* --- BOTONES DE ACCIÓN CORREGIDOS --- */}
      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="w-full md:w-4/5 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Hacer test nuevamente
        </button>
        
        {/* El botón de descarga está oculto (comentado) */}
        {/* <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
        >
          <Download className="w-5 h-5" />
          Descargar resultados
        </button>
        */}
      </div>

      {/* --- FOOTER CORREGIDO (SIN ERRORES DE SINTAXIS) --- */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          ¿Quieres llevar tu estrategia data-driven al siguiente nivel?
        </p>
        <a
          href="https://trackingdatax.com/contacto-consultoria-marketing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-brand-primary hover:text-brand-secondary font-semibold underline"
        >
          Agenda una consulta gratuita →
        </a>
      </div>
    </div>
  );
}