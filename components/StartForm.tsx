'use client';

import { useState } from 'react';
import { Building2, Mail, ArrowRight } from 'lucide-react';

interface StartFormProps {
  onStart: (data: { company: string; email: string; acceptCommunications: boolean }) => void;
}

export default function StartForm({ onStart }: StartFormProps) {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [acceptCommunications, setAcceptCommunications] = useState(false);
  const [errors, setErrors] = useState<{ company?: string; email?: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { company?: string; email?: string } = {};
    
    if (!company.trim()) {
      newErrors.company = 'Por favor ingresa el nombre de tu empresa';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Por favor ingresa tu email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onStart({ company, email, acceptCommunications });
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Test de Madurez</span>
          <br />
          <span className="text-gray-800">Data-Driven en Marketing</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Descubre en 5 preguntas el nivel de madurez de tu empresa en el uso de datos para marketing y recibe un análisis personalizado con IA
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 mr-2 text-brand-primary" />
              Nombre de la empresa
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setErrors(prev => ({ ...prev, company: undefined }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: TrackingDataX"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-brand-primary" />
              Email corporativo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tu@empresa.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Communications Checkbox */}
          <div className="bg-brand-light-blue border border-blue-200 rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={acceptCommunications}
                onChange={(e) => setAcceptCommunications(e.target.checked)}
                className="mt-1 h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">
                Acepto recibir información relevante sobre transformación digital, mejores prácticas y contenido exclusivo para mi sector
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Comenzar Test
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="text-brand-primary">⚡</span>
            <span>5 preguntas</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-brand-primary">⏱️</span>
            <span>2-3 minutos</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-brand-primary">🤖</span>
            <span>Análisis con IA</span>
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>🔒 Tus datos están protegidos y solo se usan para generar tu análisis personalizado</p>
      </div>
    </div>
  );
}