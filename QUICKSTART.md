# 🚀 GUÍA DE INICIO RÁPIDO - 5 MINUTOS

## ✅ Lo que tienes

Un **cuestionario web completo** de 5 preguntas que:
- Mide madurez data-driven en marketing
- Genera análisis personalizado con IA (GPT-4)
- Se puede embeber en cualquier sitio web
- Es 100% responsive y moderno

## 🎯 Opción 1: Probar en LOCAL (2 minutos)

### Windows:
1. Abre el proyecto en VS Code
2. Abre la terminal (Ctrl + `)
3. Ejecuta:
```bash
npm install
```
4. Crea archivo `.env` con tu API Key de OpenAI:
```
OPENAI_API_KEY=sk-tu-key-aqui
```
5. Ejecuta:
```bash
npm run dev
```
6. Abre: http://localhost:3000

### Mac/Linux:
```bash
npm install
echo "OPENAI_API_KEY=sk-tu-key-aqui" > .env
npm run dev
```

## 🌐 Opción 2: Deploy en PRODUCCIÓN (3 minutos)

### Paso a paso Vercel (GRATIS):

1. **Sube a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin tu-repo-url
   git push -u origin main
   ```

2. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Sign up con GitHub
   - Click "New Project"
   - Selecciona tu repo
   - Agrega variable: `OPENAI_API_KEY`
   - Click "Deploy"

3. **¡Listo!** Tu URL: `https://tu-proyecto.vercel.app`

## 🎨 Embeber en tu sitio web

### Método simple (iframe):

```html
<iframe 
  src="https://tu-proyecto.vercel.app" 
  width="100%" 
  height="900" 
  frameborder="0"
></iframe>
```

### Ver más opciones: `embed-example.html`

## 📱 URLs importantes después del deploy

- **Quiz público:** `https://tu-proyecto.vercel.app`
- **Versión embed:** `https://tu-proyecto.vercel.app/embed`
- **Dashboard Vercel:** `https://vercel.com/dashboard`

## ⚙️ Configuración básica

### Cambiar colores:
Edita: `tailwind.config.js`

### Modificar preguntas:
Edita: `lib/questions.ts`

### Ajustar análisis IA:
Edita: `app/api/analyze/route.ts`

## 📊 Costos esperados

- **Vercel:** GRATIS (hasta 100GB bandwidth)
- **OpenAI:** ~$0.01-0.03 por análisis con GPT-4
  - 100 tests = $1-3 USD
  - 1000 tests = $10-30 USD

**Tip:** Para testing, usa GPT-3.5-turbo (más barato)

## 🆘 ¿Problemas?

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "OPENAI_API_KEY not defined"
- Verifica que exista el archivo `.env`
- En Vercel: Settings → Environment Variables

### Build error en Vercel
- Revisa los logs en Vercel Dashboard
- Usualmente es un error de TypeScript

## 📞 Soporte

- 📧 info@trackingdatax.com
- 📚 Lee `README.md` completo
- 🚀 Ver `DEPLOY.md` para más detalles

---

**¡Éxito con tu proyecto! 🎉**
