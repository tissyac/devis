@echo off
REM Script de démarrage pour ERP Sara Decorex
REM Démarre le backend et frontend en parallèle

echo.
echo =====================================================
echo     🚀 DÉMARRAGE ERP SARA DECOREX
echo =====================================================
echo.

REM Vérifie si Node.js est installé
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé ou non accessible
    echo Téléchargez-le depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

REM Navigue vers le répertoire du projet
cd /d "%~dp0"

REM Démarre le backend en arrière-plan
echo 🔧 Démarrage du backend sur le port 5000...
start "Backend ERP" cmd /k "cd backend && npm run dev"

REM Attend un peu que le backend démarre
timeout /t 3 /nobreak

REM Démarre le frontend
echo 🎨 Démarrage du frontend sur le port 3000...
start "Frontend ERP" cmd /k "cd frontend && npm run dev"

REM Affiche les instructions
echo.
echo =====================================================
echo     ✅ LES SERVEURS DÉMARRENT...
echo =====================================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend:  http://localhost:5000/api/health
echo.
echo 📝 Guide de test: Consultez GUIDE_TEST_DEVIS.md
echo.
echo Appuyez sur Ctrl+C dans chaque fenêtre pour arrêter
echo.

REM Garde la fenêtre principale ouverte
pause
