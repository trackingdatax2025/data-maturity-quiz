// lib/types.ts - Definición de tipos para el cuestionario

export interface QuestionOption {
  text: string;
  value: number;
  description?: string;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
}

export interface QuizResponse {
  companyName: string;
  email: string;
  acceptsMarketing: boolean;
  answers: Record<string, number>;
  totalScore: number;
  maxScore: number;
  timestamp: string;
}

export interface AnalysisResult {
  level: 'Inicial' | 'Intermedio' | 'Avanzado' | 'Experto';
  score: number;
  percentage: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  roadmap: Array<{
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    estimatedTime: string;
    expectedImpact: string;
  }>;
  fullAnalysis: string;
}
