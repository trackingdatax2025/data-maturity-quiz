# 🔗 Guía Completa de Embedding

Esta guía te ayudará a embeber el Test de Madurez Data-Driven en tu sitio web, sin importar la plataforma que uses.

## 📋 Requisitos Previos

1. Tu quiz debe estar desplegado (ej: `https://tu-quiz.vercel.app`)
2. Usa la ruta `/embed` para embeber: `https://tu-quiz.vercel.app/embed`

---

## 🌐 Por Plataforma

### WordPress

**Opción 1: Plugin Simple (Recomendado)**

1. Instala el plugin "Embed Any Document" o "iframe"
2. Crea una nueva página
3. Agrega un bloque "Custom HTML"
4. Pega este código:

```html
<div style="width: 100%; max-width: 1200px; margin: 0 auto;">
  <iframe 
    src="https://tu-quiz.vercel.app/embed" 
    width="100%" 
    height="900px" 
    frameborder="0"
    style="border: none; border-radius: 12px;"
  ></iframe>
</div>
```

**Opción 2: Shortcode Personalizado**

Agrega esto a `functions.php` de tu tema:

```php
function trackingdatax_quiz_shortcode() {
    return '<iframe src="https://tu-quiz.vercel.app/embed" width="100%" height="900px" frameborder="0" style="border: none; border-radius: 12px;"></iframe>';
}
add_shortcode('trackingdatax_quiz', 'trackingdatax_quiz_shortcode');
```

Luego en cualquier página/post usa: `[trackingdatax_quiz]`

---

### Wix

1. Click en el botón "+" para agregar elementos
2. Selecciona "Embed" → "Embed a Site"
3. Pega la URL: `https://tu-quiz.vercel.app/embed`
4. Ajusta el tamaño (recomendado: ancho completo, alto 900px)

---

### Webflow

1. Arrastra un elemento "Embed" al canvas
2. Pega este código:

```html
<iframe 
  src="https://tu-quiz.vercel.app/embed" 
  width="100%" 
  height="900" 
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>
```

3. Publica el sitio

---

### Squarespace

1. Edita la página donde quieres el quiz
2. Click en un punto de inserción → "Code"
3. Pega este código:

```html
<div class="quiz-container">
  <iframe 
    src="https://tu-quiz.vercel.app/embed" 
    width="100%" 
    height="900px" 
    frameborder="0"
    style="border: none;"
  ></iframe>
</div>
```

---

### Shopify

1. Ve a "Online Store" → "Pages" → "Add page"
2. En el editor, click en "Show HTML"
3. Pega:

```html
<div style="width: 100%; max-width: 1200px; margin: 40px auto;">
  <iframe 
    src="https://tu-quiz.vercel.app/embed" 
    width="100%" 
    height="900px" 
    frameborder="0"
    style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
  ></iframe>
</div>
```

---

### HubSpot

1. Crea una nueva página de destino o landing page
2. Arrastra un módulo "Custom HTML"
3. Pega el código del iframe
4. Publica

---

### Notion (Público)

1. Crea un bloque de tipo "Embed"
2. Pega la URL: `https://tu-quiz.vercel.app/embed`
3. Notion creará automáticamente el embed

---

### HTML/CSS Estático

Si tienes un sitio HTML simple:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test de Madurez Data-Driven</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f9fafb;
        }
        .quiz-wrapper {
            max-width: 1200px;
            margin: 0 auto;
        }
        .quiz-iframe {
            width: 100%;
            height: 900px;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="quiz-wrapper">
        <iframe 
            src="https://tu-quiz.vercel.app/embed" 
            class="quiz-iframe"
            title="Test de Madurez Data-Driven"
        ></iframe>
    </div>
</body>
</html>
```

---

## 🎨 Personalización Avanzada

### Ajustar altura dinámicamente (JavaScript)

```html
<iframe 
  id="trackingdatax-quiz" 
  src="https://tu-quiz.vercel.app/embed" 
  width="100%" 
  frameborder="0"
></iframe>

<script>
  // Ajustar altura automáticamente
  window.addEventListener('message', function(e) {
    if (e.data.type === 'resize') {
      document.getElementById('trackingdatax-quiz').style.height = e.data.height + 'px';
    }
  });
</script>
```

### Con botón de apertura modal

```html
<button id="open-quiz" style="
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
">
  🎯 Evaluar mi Madurez Data-Driven
</button>

<div id="quiz-modal" style="
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 9999;
  padding: 20px;
">
  <div style="
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
  ">
    <button id="close-quiz" style="
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 24px;
      z-index: 10000;
    ">×</button>
    
    <iframe 
      src="https://tu-quiz.vercel.app/embed" 
      width="100%" 
      height="100%"
      frameborder="0"
      style="border: none; border-radius: 12px; background: white;"
    ></iframe>
  </div>
</div>

<script>
  document.getElementById('open-quiz').onclick = function() {
    document.getElementById('quiz-modal').style.display = 'block';
  };
  
  document.getElementById('close-quiz').onclick = function() {
    document.getElementById('quiz-modal').style.display = 'none';
  };
</script>
```

---

## 📱 Consideraciones Mobile

El quiz es **completamente responsive**, pero asegúrate de:

1. **No fijar anchos en píxeles** - usa `width="100%"`
2. **Altura mínima recomendada**: 800px en mobile
3. **Viewport meta tag** en tu página:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🔐 Seguridad y Privacidad

### CORS y Content Security Policy

Si tu sitio tiene CSP estricto, agrega:

```html
<meta http-equiv="Content-Security-Policy" content="
  frame-src https://tu-quiz.vercel.app;
">
```

### Permitir solo tu dominio

En tu configuración de Vercel, puedes configurar headers para solo permitir embedding desde tu dominio:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/embed',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://tu-sitio.com',
          },
        ],
      },
    ];
  },
};
```

---

## ⚡ Performance Tips

1. **Lazy loading**: Carga el iframe solo cuando sea visible

```html
<iframe 
  src="https://tu-quiz.vercel.app/embed" 
  loading="lazy"
  width="100%" 
  height="900px"
></iframe>
```

2. **Preconnect**: Acelera la carga agregando en tu `<head>`:

```html
<link rel="preconnect" href="https://tu-quiz.vercel.app">
```

---

## 🎯 Tracking y Analytics

### Google Analytics

El quiz ya incluye tracking interno. Para conectar con tu GA:

1. Crea eventos personalizados en tu GA
2. Escucha mensajes del iframe:

```javascript
window.addEventListener('message', function(e) {
  if (e.data.event === 'quiz_completed') {
    gtag('event', 'quiz_completion', {
      'score': e.data.score,
      'level': e.data.level
    });
  }
});
```

---

## 📞 Soporte

¿Problemas con el embedding?

1. Verifica que la URL del quiz sea correcta y esté accesible
2. Revisa la consola del navegador (F12) para errores
3. Contacta: info@trackingdatax.com

---

## ✅ Checklist de Implementación

- [ ] Quiz desplegado en Vercel
- [ ] URL `/embed` funciona correctamente
- [ ] Código de iframe agregado a tu sitio
- [ ] Altura ajustada apropiadamente
- [ ] Probado en mobile y desktop
- [ ] Analytics configurado (opcional)
- [ ] Design match con tu brand (opcional)

---

¡Listo! Tu quiz está embebido y funcionando. 🎉
