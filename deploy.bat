@echo off
REM Script de déploiement rapide pour Windows - ERP Sara Decorex

setlocal enabledelayedexpansion

echo.
echo ========================================
echo 🚀 Preparation au deploiement
echo ========================================
echo.

REM Couleurs (émulation Windows)
set YELLOW=[33m
set BLUE=[34m
set GREEN=[32m
set RESET=[0m

REM Vérifier si Git est initialisé
if not exist ".git" (
    echo Initialisation de Git...
    git init
    git add .
    git commit -m "Initial commit: ERP Sara Decorex ready for deployment"
) else (
    echo ✓ Git déjà initialisé
)

REM Vérifier le remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  Remote GitHub non configuré. Ajoutez:
    echo    git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
    exit /b 1
)

echo.
echo ========================================
echo Verification du projet
echo ========================================

REM Frontend
if not exist "frontend\node_modules" (
    echo Installation dependances frontend...
    cd frontend
    call npm install
    cd ..
)

REM Backend
if not exist "backend\node_modules" (
    echo Installation dependances backend...
    cd backend
    call npm install
    cd ..
)

echo.
echo ========================================
echo Build Frontend
echo ========================================
cd frontend
call npm run build
cd ..
echo ✓ Frontend construit

echo.
echo ========================================
echo Push vers GitHub
echo ========================================
git add .
git commit -m "Build: préparation déploiement" || true
git push origin main

echo.
echo ========================================
echo ✅ Deploiement prêt!
echo ========================================
echo.
echo Étapes suivantes:
echo 1. Allez sur https://vercel.com
echo 2. Importez votre dépôt GitHub
echo 3. Configurez les variables d'environnement
echo 4. Déployez le backend sur https://render.com
echo.
echo 📖 Voir DEPLOYMENT.md pour les instructions détaillées
echo.
pause
