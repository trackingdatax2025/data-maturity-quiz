import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

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
      <head>
        {/* ✅ Stape Custom Loader (Head)
           Este script carga GTM desde tu servidor Stape usando el código ofuscado que te dieron.
        */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s);j.async=true;
            
            // Carga desde tu servidor Stape con el identificador especial
            j.src="https://nqagmrgk.sav.stape.io/3mthnqagmrgk.js?"+i;
            
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','bb6h=AgNPKjMsXDlZUEo1UVUrSB1aQENWRwIBG1pdHgIY');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* ✅ Stape Custom Loader (Body - NoScript)
           Pixel invisible cargado desde Stape para usuarios sin JavaScript.
        */}
        <noscript>
          <iframe 
            src="https://nqagmrgk.sav.stape.io/ns.html?id=GTM-W278X64Z"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}