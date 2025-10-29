# 📊 Test de Madurez Data-Driven en Marketing

Cuestionario interactivo de 5 preguntas con análisis personalizado impulsado por IA para medir el nivel de madurez data-driven de empresas en marketing.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Características

- 🎯 **5 preguntas estratégicas** diseñadas por expertos
- 🤖 **Análisis con IA** personalizado usando GPT-4
- 📊 **Sistema de scoring** de 0-500 puntos
- 🎨 **UI/UX moderna** con animaciones fluidas
- 📱 **Totalmente responsive** (móvil, tablet, desktop)
- 🔗 **Fácilmente embebible** en cualquier sitio web
- ⚡ **Super rápido** con Next.js 14
- 🎭 **Totalmente personalizable** con Tailwind CSS

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- API Key de OpenAI
- (Opcional) Cuenta de Google Cloud para guardar en Sheets

### Instalación

1. **Clona o descarga el proyecto:**
```bash
cd data-maturity-quiz
```

2. **Instala dependencias:**
```bash
npm install
```

3. **Configura variables de entorno:**
```bash
cp .env.example .env
```

Edita `.env` y agrega tu API Key de OpenAI:
```
OPENAI_API_KEY=sk-tu-api-key-aqui
```

4. **Ejecuta en desarrollo:**
```bash
npm run dev
```

5. **Abre en tu navegador:**
```
http://localhost:3000
```

## 📦 Deploy en Producción

### Opción 1: Vercel (Recomendado - GRATIS)

1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Agrega la variable de entorno `OPENAI_API_KEY`
5. ¡Deploy automático! 🎉

### Opción 2: Netlify

```bash
npm run build
npm run export
# Sube la carpeta 'out' a Netlify
```

### Opción 3: Docker

```bash
docker build -t data-maturity-quiz .
docker run -p 3000:3000 -e OPENAI_API_KEY=tu-key data-maturity-quiz
```

## 🎨 Embeber en tu Sitio Web

### Método 1: iFrame (Más simple)

```html
<iframe 
  src="https://tu-dominio.vercel.app" 
  width="100%" 
  height="900" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
```

### Método 2: Embed Responsivo

```html
<div style="position: relative; padding-bottom: 120%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="https://tu-dominio.vercel.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
  ></iframe>
</div>
```

### Método 3: Botón que abre en modal

```html
<button onclick="document.getElementById('quiz-modal').style.display='block'">
  📊 Hacer Test de Madurez
</button>

<div id="quiz-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999;">
  <div style="position:relative; max-width:1200px; margin:2rem auto; height:90vh; background:white; border-radius:12px; overflow:hidden;">
    <button onclick="document.getElementById('quiz-modal').style.display='none'" style="position:absolute; top:10px; right:10px; z-index:10000; background:white; border:none; font-size:24px; cursor:pointer;">✕</button>
    <iframe src="https://tu-dominio.vercel.app" style="width:100%; height:100%; border:0;"></iframe>
  </div>
</div>
```

## 🎯 Personalización

### Cambiar colores del brand

Edita `tailwind.config.js`:

```js
colors: {
  boomit: {
    purple: '#TU_COLOR_AQUI',
    pink: '#TU_COLOR_AQUI',
  }
}
```

### Modificar preguntas

Edita `lib/questions.ts` y ajusta las preguntas y opciones.

### Cambiar el prompt del análisis

Edita `app/api/analyze/route.ts` y modifica el prompt enviado a OpenAI.

### Agregar tu logo

Reemplaza el logo en `app/page.tsx`:

```tsx
<Image 
  src="/tu-logo.png" 
  alt="Tu Empresa" 
  width={200} 
  height={60} 
/>
```

## 📂 Estructura del Proyecto

```
data-maturity-quiz/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API para análisis con OpenAI
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── components/
│   ├── StartForm.tsx             # Formulario inicial
│   ├── Quiz.tsx                  # Componente del cuestionario
│   └── Results.tsx               # Resultados y análisis
├── lib/
│   └── questions.ts              # Preguntas del test
├── public/                       # Assets estáticos
├── .env.example                  # Variables de entorno ejemplo
├── next.config.js               # Configuración de Next.js
├── package.json
├── tailwind.config.js           # Configuración de Tailwind
└── tsconfig.json                # Configuración de TypeScript
```

## 🔧 Comandos Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run start        # Iniciar en producción
npm run lint         # Linter
```

## 🌟 Features Futuras

- [ ] Integración con Google Sheets para guardar respuestas
- [ ] Dashboard de administración
- [ ] Exportar resultados a PDF
- [ ] Modo multiidioma
- [ ] A/B testing de preguntas
- [ ] Analytics integrado

## 📊 Niveles de Madurez

| Nivel | Puntaje | Descripción |
|-------|---------|-------------|
| 🌱 Inicial | 0-20% | Sin estructura data-driven |
| 📊 Básico | 20-40% | Primeros pasos en analytics |
| 📈 Intermedio | 40-60% | Procesos establecidos |
| 🚀 Avanzado | 60-80% | Cultura data-driven sólida |
| 🏆 Experto | 80-100% | Excelencia en data & IA |

## 🤝 Soporte

¿Necesitas ayuda? 

- 📧 Email: info@trackingdatax.com
- 💬 WhatsApp: +54 9 11 XXXX-XXXX

## 📄 Licencia

Desarrollado por **trackingdatax** - Todos los derechos reservados.

---

**¿Te gusta el proyecto? ⭐ Dale una estrella en GitHub!**
