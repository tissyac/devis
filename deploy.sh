#!/bin/bash

# 🚀 Script de déploiement rapide - ERP Sara Decorex

set -e

echo "📦 Préparation du déploiement..."

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Initialisation Git ===${NC}"

# Vérifier si Git est initialisé
if [ ! -d .git ]; then
    echo -e "${YELLOW}Git non initialisé. Initialisation...${NC}"
    git init
    git add .
    git commit -m "Initial commit: ERP Sara Decorex ready for deployment"
else
    echo -e "${GREEN}✓ Git déjà initialisé${NC}"
fi

# Vérifier si le remote existe
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}Remote GitHub non configuré.${NC}"
    echo "Veuillez ajouter votre remote:"
    echo "  git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git"
    exit 1
fi

echo -e "${BLUE}=== Vérification du projet ===${NC}"

# Vérifier les dépendances frontend
if [ ! -d frontend/node_modules ]; then
    echo "Installation dépendances frontend..."
    cd frontend && npm install && cd ..
fi

# Vérifier les dépendances backend
if [ ! -d backend/node_modules ]; then
    echo "Installation dépendances backend..."
    cd backend && npm install && cd ..
fi

# Build frontend
echo -e "${BLUE}=== Build Frontend ===${NC}"
cd frontend
npm run build
cd ..
echo -e "${GREEN}✓ Frontend construit${NC}"

echo -e "${BLUE}=== Push vers GitHub ===${NC}"
git add .
git commit -m "Build: préparation déploiement" || true
git push origin main

echo -e "${GREEN}✓ Code poussé vers GitHub${NC}"

echo -e ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Déploiement prêt!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e ""
echo -e "Étapes suivantes:"
echo -e "1. Allez sur ${BLUE}https://vercel.com${NC}"
echo -e "2. Importez votre dépôt GitHub"
echo -e "3. Configurez les variables d'environnement"
echo -e "4. Déployez le backend sur ${BLUE}https://render.com${NC}"
echo -e ""
echo -e "📖 Voir DEPLOYMENT.md pour les instructions détaillées"
echo -e ""
