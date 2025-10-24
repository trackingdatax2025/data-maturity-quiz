# 🚀 Guía de Deploy en Vercel

## Paso 1: Preparar el código

1. Asegúrate de que tu código esté en un repositorio de GitHub
2. Verifica que `.env` esté en `.gitignore` (no subir claves)

## Paso 2: Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz click en "Sign Up"
3. Conecta con tu cuenta de GitHub

## Paso 3: Importar proyecto

1. Click en "Add New..." → "Project"
2. Selecciona tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Next.js

## Paso 4: Configurar variables de entorno

En la sección "Environment Variables", agrega:

```
OPENAI_API_KEY = sk-tu-api-key-real
```

**Importante:** NO uses comillas para el valor.

## Paso 5: Deploy

1. Click en "Deploy"
2. Espera 2-3 minutos
3. ¡Listo! Tu app estará disponible en una URL como:
   `https://data-maturity-quiz.vercel.app`

## Paso 6: Configurar dominio personalizado (Opcional)

1. Ve a "Settings" → "Domains"
2. Agrega tu dominio personalizado (ej: `quiz.tuempresa.com`)
3. Sigue las instrucciones DNS que te da Vercel
4. Espera propagación DNS (5-30 minutos)

## Actualizaciones automáticas

Cada vez que hagas push a la rama `main` en GitHub, Vercel:
- ✅ Detectará los cambios automáticamente
- ✅ Hará un nuevo build
- ✅ Desplegará la nueva versión
- ✅ Todo sin tocar nada (CD/CI automático)

## URLs útiles

- **Dashboard:** https://vercel.com/dashboard
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support

## Troubleshooting

### Error: "OPENAI_API_KEY is not defined"
**Solución:** Verifica que agregaste la variable de entorno en Vercel Settings.

### Error: "Module not found"
**Solución:** Ejecuta `npm install` localmente y haz commit del `package-lock.json`.

### El build falla
**Solución:** Revisa los logs en Vercel. Usualmente es un error de TypeScript o import.

## Costos

- **Plan Free de Vercel:**
  - ✅ GRATIS para siempre
  - ✅ 100 GB bandwidth
  - ✅ SSL automático
  - ✅ Dominio personalizado
  - ✅ Suficiente para 10,000+ visitas/mes

- **Costos de OpenAI:**
  - GPT-4 Turbo: ~$0.01 - $0.03 por análisis
  - Para 1000 análisis: ~$10-30 USD
  - Tip: Empieza con GPT-3.5-turbo (más barato) para pruebas

## Recomendaciones de Seguridad

1. ✅ Nunca expongas tu OPENAI_API_KEY en el código
2. ✅ Usa variables de entorno siempre
3. ✅ Considera agregar rate limiting en producción
4. ✅ Monitorea uso de API en OpenAI dashboard

## Próximos pasos después del deploy

1. Prueba el quiz completamente
2. Comparte la URL con tu equipo
3. Embebe en tu sitio web
4. Configura analytics (Google Analytics, Mixpanel, etc.)
5. Monitorea métricas de conversión

---

**¿Todo funcionando?** 🎉 
Ahora puedes embeber el quiz en tu sitio web usando los métodos del README.md
