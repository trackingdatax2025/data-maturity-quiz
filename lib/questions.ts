// Cuestionario optimizado de 5 preguntas para medir madurez data-driven en marketing

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    value: number;
    description?: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: '¿Cómo están organizados los datos de marketing en tu empresa?',
    options: [
      {
        text: 'Sin organización clara',
        value: 0,
        description: 'Datos dispersos o inexistentes'
      },
      {
        text: 'Excel/Sheets manuales',
        value: 25,
        description: 'Recopilación manual básica'
      },
      {
        text: 'Herramientas básicas conectadas',
        value: 50,
        description: 'GA4 + Meta Pixel básico'
      },
      {
        text: 'Sistema centralizado',
        value: 75,
        description: 'CRM + Analytics integrados'
      },
      {
        text: 'Data Warehouse completo',
        value: 100,
        description: 'BigQuery/Snowflake + ETL'
      }
    ]
  },
  {
    id: 'q2',
    text: '¿Qué tan frecuentemente revisas métricas de marketing para tomar decisiones?',
    options: [
      {
        text: 'Rara vez o nunca',
        value: 0,
        description: 'Decisiones por intuición'
      },
      {
        text: 'Mensualmente',
        value: 30,
        description: 'Reportes mensuales básicos'
      },
      {
        text: 'Semanalmente',
        value: 60,
        description: 'Revisión semanal de KPIs'
      },
      {
        text: 'Diariamente',
        value: 85,
        description: 'Monitoreo diario activo'
      },
      {
        text: 'En tiempo real',
        value: 100,
        description: 'Dashboards live + alertas'
      }
    ]
  },
  {
    id: 'q3',
    text: '¿Qué nivel de automatización tienen tus procesos de marketing?',
    options: [
      {
        text: 'Todo manual',
        value: 0,
        description: 'Sin automatización'
      },
      {
        text: 'Emails automatizados básicos',
        value: 30,
        description: 'Autoresponders simples'
      },
      {
        text: 'Workflows multi-paso',
        value: 60,
        description: 'Nurturing + segmentación'
      },
      {
        text: 'Automatización avanzada',
        value: 85,
        description: 'Lead scoring + triggers'
      },
      {
        text: 'Orquestación con IA',
        value: 100,
        description: 'ML para personalización'
      }
    ]
  },
  {
    id: 'q4',
    text: '¿Cómo mides el ROI y atribución de tus campañas de marketing?',
    options: [
      {
        text: 'No medimos ROI',
        value: 0,
        description: 'Sin medición financiera'
      },
      {
        text: 'ROI básico por canal',
        value: 30,
        description: 'Costo vs Ingreso simple'
      },
      {
        text: 'ROAS + atribución last-click',
        value: 55,
        description: 'Medición por plataforma'
      },
      {
        text: 'Multi-touch attribution',
        value: 80,
        description: 'Modelo de atribución avanzado'
      },
      {
        text: 'MMM + incrementalidad',
        value: 100,
        description: 'Marketing Mix Modeling'
      }
    ]
  },
  {
    id: 'q5',
    text: '¿Tienes equipo o recursos dedicados a analytics/data en marketing?',
    options: [
      {
        text: 'Sin recursos dedicados',
        value: 0,
        description: 'Marketing hace todo'
      },
      {
        text: '1 persona part-time',
        value: 25,
        description: 'Apoyo ocasional'
      },
      {
        text: 'Analista full-time',
        value: 55,
        description: '1 persona especializada'
      },
      {
        text: 'Equipo de analytics',
        value: 80,
        description: '2-3 personas + herramientas'
      },
      {
        text: 'Equipo completo data/BI',
        value: 100,
        description: 'Data Eng + Analytics + Science'
      }
    ]
  }
];

export const MAX_SCORE = 500; // 100 puntos por pregunta x 5 preguntas

export function calculateLevel(score: number): {
  level: string;
  color: string;
  emoji: string;
  percentage: number;
} {
  const percentage = (score / MAX_SCORE) * 100;
  
  if (percentage < 20) {
    return {
      level: 'Inicial',
      color: 'red',
      emoji: '🌱',
      percentage
    };
  } else if (percentage < 40) {
    return {
      level: 'Básico',
      color: 'orange',
      emoji: '📊',
      percentage
    };
  } else if (percentage < 60) {
    return {
      level: 'Intermedio',
      color: 'yellow',
      emoji: '📈',
      percentage
    };
  } else if (percentage < 80) {
    return {
      level: 'Avanzado',
      color: 'blue',
      emoji: '🚀',
      percentage
    };
  } else {
    return {
      level: 'Experto',
      color: 'green',
      emoji: '🏆',
      percentage
    };
  }
}

// Funciones auxiliares para colores
export function getLevelColor(level: number): string {
  if (level < 20) return 'text-red-600';
  if (level < 40) return 'text-orange-600';
  if (level < 60) return 'text-yellow-600';
  if (level < 80) return 'text-blue-600';
  return 'text-green-600';
}

export function getLevelBgColor(level: number): string {
  if (level < 20) return 'bg-red-50';
  if (level < 40) return 'bg-orange-50';
  if (level < 60) return 'bg-yellow-50';
  if (level < 80) return 'bg-blue-50';
  return 'bg-green-50';
}