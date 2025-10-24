# 📊 Integración con Google Sheets (Opcional)

Si quieres guardar las respuestas automáticamente en Google Sheets, sigue estos pasos:

## Paso 1: Crear proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto (ej: "Data Maturity Quiz")
3. Habilita "Google Sheets API":
   - Menu → APIs & Services → Library
   - Busca "Google Sheets API"
   - Click "Enable"

## Paso 2: Crear Service Account

1. Ve a APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Dale un nombre (ej: "quiz-service-account")
4. Click "Create and Continue"
5. Skip roles (click "Continue")
6. Click "Done"

## Paso 3: Generar Key

1. Click en el service account que creaste
2. Tab "Keys" → "Add Key" → "Create new key"
3. Selecciona "JSON"
4. Se descargará un archivo JSON - **GUÁRDALO EN LUGAR SEGURO**

## Paso 4: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja
3. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```
4. Click "Share" y comparte con el email del service account
   (está en el JSON que descargaste: `client_email`)

## Paso 5: Configurar código

Crea un archivo `lib/googleSheets.ts`:

```typescript
import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function saveToGoogleSheets(data: {
  company: string;
  email: string;
  totalScore: number;
  level: string;
  acceptCommunications: boolean;
}) {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.addRow({
      timestamp: new Date().toISOString(),
      company: data.company,
      email: data.email,
      score: data.totalScore,
      level: data.level,
      acceptCommunications: data.acceptCommunications ? 'Sí' : 'No',
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return { success: false, error };
  }
}
```

## Paso 6: Agregar variables de entorno

En `.env`:

```bash
GOOGLE_SHEET_ID=tu-sheet-id-aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY_AQUI\n-----END PRIVATE KEY-----\n"
```

**Importante:** El `GOOGLE_PRIVATE_KEY` debe estar entre comillas y con `\n` para los saltos de línea.

## Paso 7: Usar en la API

En `app/api/analyze/route.ts`, después de generar el análisis:

```typescript
import { saveToGoogleSheets } from '@/lib/googleSheets';

// ... código existente ...

// Guardar en Google Sheets
await saveToGoogleSheets({
  company,
  email,
  totalScore,
  level,
  acceptCommunications
});
```

## Paso 8: Configurar en Vercel

En Vercel dashboard → Settings → Environment Variables, agrega:
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## Estructura del Sheet

Tu Google Sheet debería tener estos headers en la primera fila:

| timestamp | company | email | score | level | acceptCommunications |
|-----------|---------|-------|-------|-------|---------------------|

## Troubleshooting

### Error: "The caller does not have permission"
**Solución:** Verifica que compartiste el Sheet con el email del service account.

### Error: "Invalid private key"
**Solución:** Asegúrate de que el private key tiene los saltos de línea (`\n`) y está entre comillas.

### Error: "Cannot find module google-spreadsheet"
**Solución:** 
```bash
npm install google-spreadsheet
```

## Alternativa más simple: Webhooks

Si Google Sheets es muy complicado, puedes usar:
- **Zapier:** Recibe webhook → guarda en Sheets
- **Make.com:** Similar a Zapier
- **n8n:** Open source, self-hosted

Ejemplo con webhook:

```typescript
// En app/api/analyze/route.ts
await fetch('https://hooks.zapier.com/hooks/catch/tu-webhook-aqui', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company,
    email,
    totalScore,
    level,
    timestamp: new Date().toISOString()
  })
});
```

---

¿Necesitas ayuda? Contáctanos en hola@boomit.com.ar
