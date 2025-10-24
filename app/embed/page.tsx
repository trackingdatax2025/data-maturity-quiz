// app/embed/page.tsx - Versión embebible del quiz

import DataMaturityQuiz from '@/components/DataMaturityQuiz';

export default function EmbedPage() {
  return (
    <div className="min-h-screen">
      <DataMaturityQuiz />
    </div>
  );
}

export const metadata = {
  title: 'Test de Madurez Data-Driven',
  description: 'Descubre tu nivel de madurez data-driven',
};
