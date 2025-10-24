import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Test de Madurez Data-Driven | TrackingDatax',
  description: 'Descubre el nivel de madurez data-driven de tu empresa en marketing con nuestro test de 5 preguntas + análisis personalizado con IA',
  keywords: 'data-driven, marketing analytics, madurez digital, Trackingdatax',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
