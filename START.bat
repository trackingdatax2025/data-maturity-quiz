@echo off
echo ========================================
echo  TRACKINGDATAX - Test de Madurez Data-Driven
echo ========================================
echo.

echo [1/4] Instalando dependencias...
call npm install

echo.
echo [2/4] Configurando variables de entorno...
if not exist .env.local (
    copy .env.example .env.local
    echo IMPORTANTE: Edita el archivo .env.local con tus credenciales
    echo - OPENAI_API_KEY: Obligatorio
    echo - GOOGLE_SHEET_ID: Opcional
    pause
)

echo.
echo [3/4] Construyendo proyecto...
call npm run build

echo.
echo [4/4] Iniciando servidor...
echo.
echo ========================================
echo  Servidor corriendo en: http://localhost:3000
echo  Version embed: http://localhost:3000/embed
echo ========================================
echo.
call npm run dev
