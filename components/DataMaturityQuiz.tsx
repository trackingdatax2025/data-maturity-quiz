// components/DataMaturityQuiz.tsx - Componente principal del cuestionario

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  CheckCircle2, 
  Mail,
  Building2,
  Sparkles,
  Loader2
} from 'lucide-react';
import { questions, MAX_SCORE, calculateLevel } from '@/lib/questions';
import { QuizResponse } from '@/lib/types';
import AnalysisResults from './AnalysisResults';

export default function DataMaturityQuiz() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleStartQuiz = () => {
    if (!companyName.trim() || !email.trim() || !email.includes('@')) {
      alert('Por favor completa correctamente los campos de empresa y email');
      return;
    }
    setCurrentStep('questions');
  };

  const handleSelectAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Verificar que todas las preguntas estén respondidas
    const allAnswered = questions.every(q => answers[q.id] !== undefined);
    
    if (!allAnswered) {
      alert('Por favor responde todas las preguntas antes de continuar');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Calcular puntaje total
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      const timestamp = new Date().toISOString();

      // Guardar respuestas en Google Sheets (silent fail)
      try {
        await fetch('/api/save-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName,
            email,
            acceptsMarketing,
            totalScore,
            level: calculateLevel(totalScore).level,
            timestamp,
          }),
        });
      } catch (error) {
        console.error('Error saving to sheets:', error);
      }

      // Solicitar análisis de IA
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          email,
          answers,
          totalScore,
        }),
      });

      const result = await response.json();
      setAnalysisResult(result);
      setCurrentStep('results');

    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error procesando tu análisis. Por favor intenta de nuevo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const selectedValue = answers[currentQ?.id];

  if (currentStep === 'results' && analysisResult) {
    return <AnalysisResults result={analysisResult} companyName={companyName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-4">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Test de Madurez Data-Driven</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            ¿Qué tan{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              data-driven
            </span>{' '}
            es tu marketing?
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre tu nivel de madurez en 5 preguntas y recibe un análisis personalizado con IA
          </p>
        </motion.div>

        {/* Intro Form */}
        {currentStep === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Comencemos</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  Nombre de tu empresa
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej: Boomit"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email corporativo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={acceptsMarketing}
                  onChange={(e) => setAcceptsMarketing(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="marketing" className="text-sm text-gray-600">
                  Acepto recibir insights sobre transformación digital y mejores prácticas de marketing basado en datos
                </label>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Comenzar Test
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              ⏱️ Tiempo estimado: 2-3 minutos • 🔒 Tus datos están seguros
            </p>
          </motion.div>
        )}

        {/* Questions */}
        {currentStep === 'questions' && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-purple-600">
                  {progress.toFixed(0)}% completado
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentQ.text}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectAnswer(currentQ.id, option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedValue === option.value
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedValue === option.value
                            ? 'border-purple-600 bg-purple-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedValue === option.value && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">
                            {option.text}
                          </p>
                          {option.description && (
                            <p className="text-sm text-gray-500">
                              {option.description}
                            </p>
                          )}
                          <div className="mt-2 text-xs font-semibold text-purple-600">
                            {option.value} puntos
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedValue || isAnalyzing}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    !selectedValue || isAnalyzing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analizando con IA...
                    </>
                  ) : (
                    <>
                      Ver mi Análisis
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!selectedValue}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    !selectedValue
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}