'use client';

import { useState } from 'react';
import StartForm from '@/components/StartForm';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import Image from 'next/image';

type Step = 'start' | 'quiz' | 'results';

export default function Home() {
  const [step, setStep] = useState<Step>('start');
  const [companyData, setCompanyData] = useState({
    company: '',
    email: '',
    acceptCommunications: false,
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = (data: { company: string; email: string; acceptCommunications: boolean }) => {
    setCompanyData(data);
    setStep('quiz');
  };

  const handleQuizComplete = (quizAnswers: Record<string, number>, score: number) => {
    setAnswers(quizAnswers);
    setTotalScore(score);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('start');
    setCompanyData({ company: '', email: '', acceptCommunications: false });
    setAnswers({});
    setTotalScore(0);
  };

  return (
    <main className="min-h-screen py-8 px-4 md:py-12">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold gradient-text">TRACKINGDATAX</span>
            </div>
          </div>
        </div>

        {/* Content based on step */}
        {step === 'start' && <StartForm onStart={handleStart} />}
        
        {step === 'quiz' && (
          <Quiz 
            companyData={companyData} 
            onComplete={handleQuizComplete}
          />
        )}
        
        {step === 'results' && (
          <Results
            companyData={companyData}
            answers={answers}
            totalScore={totalScore}
            onRestart={handleRestart}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Powered by{' '}
            <a 
              href="https://trackingdatax.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-secondary font-semibold"
            >
              TrackingDataX
            </a>
            {' '}• Transformación Digital & Data-Driven Marketing
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </main>
  );
}