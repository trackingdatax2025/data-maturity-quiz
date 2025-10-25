// components/AnalysisResults.tsx - Componente para mostrar los resultados

'use client';

import { motion } from 'framer-motion';
import { 
  Award, 
  TrendingUp, 
  AlertCircle, 
  Download,
  Share2,
  CheckCircle,
} from 'lucide-react';
import { getLevelColor, getLevelBgColor } from '@/lib/questions';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultsProps {
  result: {
    level: string;
    score: number;
    percentage: number;
    strengths: string[];
    gaps: string[];
    fullAnalysis: string;
  };
  companyName: string;
}

export default function AnalysisResults({ result, companyName }: AnalysisResultsProps) {
  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Análisis de Madurez Data-Driven',
          text: `He completado el test de madurez data-driven y mi nivel es: ${result.level}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Análisis Completado! 🎉
          </h1>
          <p className="text-gray-600">
            Hola <strong>{companyName}</strong>, aquí está tu reporte personalizado
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl shadow-xl p-8 border-2 ${getLevelBgColor(result.percentage)}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Award className={`w-12 h-12 ${getLevelColor(result.percentage)}`} />
              <div>
                <h2 className="text-sm font-medium text-gray-600 mb-1">Tu Nivel de Madurez</h2>
                <p className={`text-4xl font-bold ${getLevelColor(result.percentage)}`}>
                  {result.level}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-1">
                {result.percentage.toFixed(0)}%
              </div>
              <p className="text-sm text-gray-600">
                {result.score} de 500 puntos
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 transition"
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Summary - Strengths & Gaps */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Fortalezas</h3>
            </div>
            <ul className="space-y-2">
              {result.strengths.length > 0 ? (
                result.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Ver análisis completo abajo</li>
              )}
            </ul>
          </motion.div>

          {/* Gaps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-900">Oportunidades</h3>
            </div>
            <ul className="space-y-2">
              {result.gaps.length > 0 ? (
                result.gaps.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{gap}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Ver análisis completo abajo</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Full Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="prose prose-lg max-w-none
            prose-headings:text-gray-900 
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-ul:my-4
            prose-li:text-gray-700
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown>{result.fullAnalysis}</ReactMarkdown>
          </div>
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-2">
            ¿Listo para dar el siguiente paso?
          </h3>
          <p className="text-purple-100 mb-6">
            Hablemos sobre cómo podemos ayudarte a implementar estas mejoras
          </p>
          <a
            href="https://boomit.com/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
          >
            Agendar Consultoría Gratuita
          </a>
        </motion.div>

      </div>
    </div>
  );
}
