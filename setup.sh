#!/bin/bash

# 🚀 Script de démarrage complet

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         ERP Gestion Commerciale - Démarrage                ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier Node.js
echo -e "\n${YELLOW}✓ Vérification des prérequis...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js non trouvé. Veuillez l'installer.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ NPM non trouvé.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ NPM $(npm -v)${NC}"

# Backend setup
echo -e "\n${YELLOW}📦 Installation Backend...${NC}"
cd backend

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Backend déjà installé${NC}"
else
    npm install > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dépendances backend installées${NC}"
    else
        echo -e "${RED}✗ Erreur installation backend${NC}"
        exit 1
    fi
fi

# Créer .env si n'existe pas
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Création fichier .env...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  À configurer: DB_PASSWORD, JWT_SECRET${NC}"
fi

cd ..

# Frontend setup
echo -e "\n${YELLOW}📦 Installation Frontend...${NC}"
cd frontend

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Frontend déjà installé${NC}"
else
    npm install > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dépendances frontend installées${NC}"
    else
        echo -e "${RED}✗ Erreur installation frontend${NC}"
        exit 1
    fi
fi

# Créer .env si n'existe pas
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Création fichier .env...${NC}"
    cp .env.example .env
fi

cd ..

# Afficher instructions finales
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Installation complète!                                  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}🚀 Démarrage:${NC}\n"
echo "Ouvrez 2 terminaux:\n"
echo -e "${GREEN}Terminal 1 (Backend):${NC}"
echo "  cd backend && npm run dev\n"
echo -e "${GREEN}Terminal 2 (Frontend):${NC}"
echo "  cd frontend && npm run dev\n"
echo -e "${YELLOW}L'application sera sur http://localhost:3000${NC}\n"

echo -e "${YELLOW}📚 Documentation:${NC}"
echo "  - QUICKSTART.md - Démarrage rapide"
echo "  - README.md - Documentation complète"
echo "  - docs/ARCHITECTURE.md - Architecture détaillée"
echo "  - docs/DEVELOPMENT.md - Guide développement\n"
