#!/bin/bash

echo "========================================"
echo " TRACKINGDATAX - Test de Madurez Data-Driven"
echo "========================================"
echo ""

echo "[1/4] Instalando dependencias..."
npm install

echo ""
echo "[2/4] Configurando variables de entorno..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  IMPORTANTE: Edita el archivo .env.local con tus credenciales"
    echo "   - OPENAI_API_KEY: Obligatorio"
    echo "   - GOOGLE_SHEET_ID: Opcional"
    echo ""
    read -p "Presiona Enter cuando hayas configurado las variables de entorno..."
fi

echo ""
echo "[3/4] Verificando configuración..."
if grep -q "sk-proj-xxxxxxxxxxxxx" .env.local; then
    echo "❌ Por favor configura tu OPENAI_API_KEY en .env.local"
    exit 1
fi

echo ""
echo "[4/4] Iniciando servidor..."
echo ""
echo "========================================"
echo " ✅ Servidor corriendo en: http://localhost:3000"
echo " 🔗 Version embed: http://localhost:3000/embed"
echo "========================================"
echo ""

npm run dev
