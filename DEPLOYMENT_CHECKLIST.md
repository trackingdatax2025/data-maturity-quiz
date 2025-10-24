# ✅ Checklist de Deployment y Configuración

## 📋 Pre-Deployment

### Desarrollo Local
- [ ] Clonar/descargar el proyecto
- [ ] Ejecutar `npm install`
- [ ] Crear archivo `.env.local` (copiar de `.env.example`)
- [ ] Configurar `OPENAI_API_KEY` (OBLIGATORIO)
- [ ] Configurar Google Sheets (OPCIONAL)
- [ ] Probar en local: `npm run dev`
- [ ] Verificar que funciona en `http://localhost:3000`
- [ ] Verificar ruta `/embed` funciona correctamente

### Customización (Opcional)
- [ ] Cambiar colores en `tailwind.config.js` para match con tu brand
- [ ] Actualizar metadata en `app/layout.tsx` (título, descripción)
- [ ] Agregar tu logo (reemplazar referencias a "Boomit" si aplica)
- [ ] Personalizar el CTA del final en `components/AnalysisResults.tsx`
- [ ] Ajustar el prompt de análisis en `app/api/analyze/route.ts`

---

## 🚀 Deployment en Vercel (Recomendado)

### 1. Preparar Repositorio GitHub

```bash
# Inicializar Git si no lo has hecho
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Data Maturity Quiz"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/data-maturity-quiz.git
git branch -M main
git push -u origin main
```

### 2. Deploy en Vercel

- [ ] Ir a [vercel.com](https://vercel.com)
- [ ] Click en "Import Project"
- [ ] Conectar con GitHub
- [ ] Seleccionar el repositorio `data-maturity-quiz`
- [ ] Configurar variables de entorno:
  - [ ] `OPENAI_API_KEY` (obligatorio)
  - [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` (opcional)
  - [ ] `GOOGLE_PRIVATE_KEY` (opcional)
  - [ ] `GOOGLE_SHEET_ID` (opcional)
- [ ] Click en "Deploy"
- [ ] Esperar 2-3 minutos
- [ ] ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### 3. Post-Deployment

- [ ] Verificar que la URL funciona
- [ ] Probar `/embed` en la URL de producción
- [ ] Verificar que el análisis con IA funciona
- [ ] Verificar que guarda en Google Sheets (si lo configuraste)
- [ ] Probar en mobile
- [ ] Probar en diferentes navegadores

---

## 🔗 Configuración de Dominio Custom (Opcional)

### En Vercel:
- [ ] Ir a "Settings" → "Domains"
- [ ] Agregar tu dominio (ej: `quiz.tuempresa.com`)
- [ ] Copiar los DNS records que te da Vercel

### En tu Proveedor de DNS:
- [ ] Agregar un registro CNAME apuntando a Vercel
- [ ] Esperar propagación (5-60 minutos)
- [ ] Verificar que funciona con tu dominio custom

---

## 📊 Configuración de Google Sheets

### 1. Crear Service Account

- [ ] Ir a [Google Cloud Console](https://console.cloud.google.com)
- [ ] Crear nuevo proyecto o usar existente
- [ ] Habilitar "Google Sheets API"
- [ ] Ir a "Credentials" → "Create Credentials" → "Service Account"
- [ ] Descargar el archivo JSON con las credenciales

### 2. Configurar Sheet

- [ ] Crear un Google Sheet nuevo
- [ ] Copiar el ID del Sheet (está en la URL)
- [ ] Compartir el Sheet con el email del service account
- [ ] Darle permisos de "Editor"

### 3. Variables de Entorno

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTuKeyAqui\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1abc123xyz
```

**IMPORTANTE:** El `GOOGLE_PRIVATE_KEY` debe tener los saltos de línea como `\n`

---

## 🔐 Seguridad

### Variables de Entorno
- [ ] NUNCA commitear `.env.local` al repositorio
- [ ] Verificar que `.env.local` está en `.gitignore`
- [ ] Rotar las API keys periódicamente
- [ ] Usar diferentes keys para dev y producción

### CORS y Frame Options
- [ ] Configurar `X-Frame-Options` si quieres restringir embedding
- [ ] Actualizar `next.config.js` con tus dominios permitidos

---

## 🔗 Embedding en tu Sitio Web

### Código Básico de iFrame

```html
<iframe 
  src="https://TU-DOMINIO.vercel.app/embed" 
  width="100%" 
  height="900px" 
  frameborder="0"
  style="border: none; border-radius: 12px;"
  title="Test de Madurez Data-Driven"
></iframe>
```

### Checklist de Embedding
- [ ] Reemplazar `TU-DOMINIO` con tu URL real
- [ ] Agregar el iframe en la página de tu sitio
- [ ] Probar en diferentes tamaños de pantalla
- [ ] Verificar que se ve bien en mobile
- [ ] Ajustar altura si es necesario
- [ ] Probar funcionalidad completa embebida

### Plataformas Comunes
- [ ] WordPress: Usar bloque "Custom HTML" o plugin
- [ ] Webflow: Elemento "Embed"
- [ ] Wix: "Embed a Site"
- [ ] Squarespace: Bloque "Code"
- [ ] HTML estático: Copiar código directamente

---

## 📊 Analytics y Tracking (Opcional)

### Google Analytics
- [ ] Crear propiedad GA4
- [ ] Instalar gtag en `app/layout.tsx`
- [ ] Configurar eventos personalizados
- [ ] Probar que los eventos se registran

### Meta Pixel (Facebook)
- [ ] Instalar Meta Pixel
- [ ] Configurar eventos de conversión
- [ ] Probar con Facebook Pixel Helper

---

## 🧪 Testing

### Funcionalidad Básica
- [ ] Formulario inicial acepta datos correctamente
- [ ] Todas las 5 preguntas se muestran
- [ ] No se puede avanzar sin seleccionar respuesta
- [ ] Progress bar se actualiza correctamente
- [ ] Botón "Anterior" funciona
- [ ] Análisis con IA se genera correctamente
- [ ] Resultados se muestran completos
- [ ] Botón de descarga PDF funciona

### UI/UX
- [ ] Responsive en mobile (320px - 428px)
- [ ] Responsive en tablet (768px - 1024px)
- [ ] Responsive en desktop (1280px+)
- [ ] Animaciones funcionan suavemente
- [ ] No hay elementos cortados
- [ ] Textos legibles en todos los tamaños
- [ ] Botones son fáciles de clickear en mobile

### Navegadores
- [ ] Chrome (desktop y mobile)
- [ ] Safari (desktop y mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (si aplica)

---

## 🎨 Branding Personalizado

### Elementos a Customizar
- [ ] Colores primarios en `tailwind.config.js`
- [ ] Título y descripción en `app/layout.tsx`
- [ ] Textos del header en `components/DataMaturityQuiz.tsx`
- [ ] CTA final en `components/AnalysisResults.tsx`
- [ ] Agregar tu logo (crear componente `Logo.tsx`)

### Ejemplo de Personalización de Colores

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#TU-COLOR',
        600: '#TU-COLOR-OSCURO',
      }
    }
  }
}
```

---

## 📈 Post-Launch

### Semana 1
- [ ] Monitorear errores en Vercel Dashboard
- [ ] Revisar primeras respuestas en Google Sheets
- [ ] Recoger feedback de primeros usuarios
- [ ] Ajustar altura de iframe si es necesario
- [ ] Verificar tiempos de carga

### Mes 1
- [ ] Analizar tasas de completitud
- [ ] Revisar calidad de análisis de IA
- [ ] Identificar preguntas confusas
- [ ] Optimizar prompt si es necesario
- [ ] A/B test de CTAs

### Mejora Continua
- [ ] Monitorear costos de OpenAI API
- [ ] Optimizar prompt para reducir tokens si es muy costoso
- [ ] Agregar más ejemplos al análisis
- [ ] Considerar agregar más niveles de personalización

---

## 🆘 Troubleshooting

### "Error al generar análisis"
- ✅ Verificar que `OPENAI_API_KEY` está configurada
- ✅ Verificar que tienes créditos en OpenAI
- ✅ Revisar logs en Vercel Dashboard

### "No se guarda en Google Sheets"
- ✅ Verificar service account configurado
- ✅ Verificar que el sheet está compartido
- ✅ Verificar formato del `GOOGLE_PRIVATE_KEY`
- ⚠️ Esta funcionalidad falla silenciosamente - no afecta la UX

### "El iframe no se ve bien"
- ✅ Aumentar `height` del iframe
- ✅ Verificar que no hay CSS conflictivo
- ✅ Probar en modo incógnito

### "Lento en mobile"
- ✅ Verificar que usas `loading="lazy"` en iframe
- ✅ Optimizar imágenes si agregaste alguna
- ✅ Revisar bundle size: `npm run build`

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel Dashboard
2. Abre la consola del navegador (F12) y busca errores
3. Consulta el README.md completo
4. Contacta: hola@boomit.com

---

## ✨ Próximos Pasos Sugeridos

Una vez que tu quiz esté funcionando:

- [ ] Agregar más preguntas opcionales por industria
- [ ] Implementar email automation con los resultados
- [ ] Crear landing page dedicada para promocionar el quiz
- [ ] Integrar con tu CRM (HubSpot, Salesforce, etc.)
- [ ] Agregar social sharing con OG images custom
- [ ] A/B testing de diferentes versiones
- [ ] Crear remarketing para quienes completan el quiz

---

**¡Buena suerte con tu deployment! 🚀**
