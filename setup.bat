@echo off
REM Batch script de démarrage pour Windows

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         ERP Gestion Commerciale - Démarrage                ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Vérifier Node.js
echo ✓ Vérification des prérequis...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js non trouvé. Veuillez l'installer.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js !NODE_VERSION!

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ NPM non trouvé.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ NPM !NPM_VERSION!

REM Backend setup
echo.
echo 📦 Installation Backend...
cd backend

if exist "node_modules" (
    echo ✓ Backend déjà installé
) else (
    call npm install > nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Dépendances backend installées
    ) else (
        echo ✗ Erreur installation backend
        pause
        exit /b 1
    )
)

if not exist ".env" (
    echo ⚙️  Création fichier .env...
    copy .env.example .env
    echo ⚠️  À configurer: DB_PASSWORD, JWT_SECRET
)

cd ..

REM Frontend setup
echo.
echo 📦 Installation Frontend...
cd frontend

if exist "node_modules" (
    echo ✓ Frontend déjà installé
) else (
    call npm install > nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Dépendances frontend installées
    ) else (
        echo ✗ Erreur installation frontend
        pause
        exit /b 1
    )
)

if not exist ".env" (
    echo ⚙️  Création fichier .env...
    copy .env.example .env
)

cd ..

REM Afficher instructions finales
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  ✅ Installation complète!                                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🚀 Démarrage:
echo.
echo Ouvrez 2 terminaux PowerShell:
echo.
echo Terminal 1 (Backend):
echo   cd backend; npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend; npm run dev
echo.
echo L'application sera sur http://localhost:3000
echo.
echo 📚 Documentation:
echo   - QUICKSTART.md
echo   - README.md
echo   - docs/ARCHITECTURE.md
echo   - docs/DEVELOPMENT.md
echo.
pause
