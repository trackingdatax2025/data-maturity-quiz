'use client';

import { useState } from 'react';
import { questions, MAX_SCORE, calculateLevel } from '@/lib/questions';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

// Declaramos dataLayer para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface QuizProps {
  companyData: {
    company: string;
    email: string;
    acceptCommunications: boolean;
  };
  onComplete: (answers: Record<string, number>, totalScore: number) => void;
}

export default function Quiz({ companyData, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // --- AÑADIDO ---
  // "Guardián" para disparar el evento de 2 preguntas solo una vez
  const [hasCompletedTwoQuestions, setHasCompletedTwoQuestions] = useState(false);
  // --- FIN DE AÑADIDO ---

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = selectedOption !== null;

  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (!canProceed) return;

    // --- AÑADIDO ---
    // Chequea si estamos en la pregunta 2 (índice 1) y si el evento aún no se disparó
    if (currentQuestion === 1 && !hasCompletedTwoQuestions) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'maturity_form_2_questions',
        'quiz_question_number': currentQuestion + 1 // (Opcional) enviamos la pregunta
      });
      // Marcamos como disparado para que no vuelva a ocurrir
      setHasCompletedTwoQuestions(true);
    }
    // --- FIN DE AÑADIDO ---
    
    if (isLastQuestion) {
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      onComplete(answers, totalScore);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(answers[questions[currentQuestion + 1]?.id] ?? null);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestion - 1]?.id] ?? null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* ... (el resto del <div> del header no cambia) ... */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium text-brand-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ... (el resto del <div> de la tarjeta no cambia) ... */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          {question.text}
        </h2>

        {/* ... (las opciones no cambian) ... */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.value;
            
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                  isSelected
                    ? 'border-brand-secondary bg-brand-light-blue shadow-md'
                    : 'border-gray-200 hover:border-brand-secondary/50 hover:bg-brand-light-blue/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Radio circle */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-brand-secondary bg-brand-secondary'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-1">
                    <p className={`font-semibold mb-1 ${
                      isSelected ? 'text-brand-primary' : 'text-gray-800'
                    }`}>
                      {option.text}
                    </p>
                    {option.description && (
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Score badge */}
                  <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    isSelected
                      ? 'bg-brand-secondary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.value} pts
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ... (los botones de navegación no cambian) ... */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform ${
              canProceed
                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90 hover:scale-[1.02] shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Ver Resultados' : 'Siguiente'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ... (el recordatorio de la compañía no cambia) ... */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Analizando para: <span className="font-semibold text-gray-700">{companyData.company}</span></p>
      </div>
    </div>
  );
}