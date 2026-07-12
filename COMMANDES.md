# 🛠️ COMMANDES DE DÉVELOPPEMENT - ERP Sara Decorex

## 📚 Table des matières
1. [Installation](#installation)
2. [Démarrage](#démarrage)
3. [Base de Données](#base-de-données)
4. [Build Production](#build-production)
5. [Debugging](#debugging)

---

## Installation

### Backend
```bash
cd backend
npm install

# Vérifier l'installation
npm list express cors helmet morgan better-sqlite3
```

**Dépendances principales**:
- `express` - Framework Web
- `cors` - Cross-Origin Requests
- `helmet` - Sécurité HTTP headers
- `morgan` - Logger HTTP
- `jwt` - Authentification
- `bcryptjs` - Hash mots de passe
- `uuid` - IDs uniques
- `nodemon` - Auto-reload dev
- `dotenv` - Variables d'environnement

### Frontend
```bash
cd frontend
npm install

# Vérifier l'installation
npm list react axios zustand lucide-react
```

**Dépendances principales**:
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - Client HTTP
- `zustand` - State management
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `vite` - Build tool

---

## Démarrage

### Backend - Mode Développement
```bash
cd backend
npm run dev
```
✅ Attendu: "Serveur lancé sur le port 5000"

### Frontend - Mode Développement
```bash
cd frontend
npm run dev
```
✅ Attendu: "VITE v5.0.0 ready in xxx ms"

### Les deux en parallèle (Windows)
```bash
# Dans le répertoire racine
start.bat
```
→ Ouvre 2 fenêtres terminales

### Les deux en parallèle (Linux/Mac)
```bash
# Terminal 1
cd backend && npm run dev &

# Terminal 2
cd frontend && npm run dev &
```

---

## Base de Données

### Vérifier l'état de la BD
```bash
# Windows PowerShell
sqlite3 backend/data/erp.db

# Requêtes
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM devis;
SELECT COUNT(*) FROM devis_articles;
```

### Réinitialiser la BD
```bash
# Arrêtez d'abord le serveur backend

# Supprimer le fichier BD
rm backend/data/erp.db

# Redémarrer le backend
cd backend && npm run dev
```
→ Les tables sont automatiquement créées

### Exporter les données
```bash
sqlite3 backend/data/erp.db ".dump" > backup.sql
```

### Importer les données
```bash
sqlite3 backend/data/erp.db < backup.sql
```

---

## Build Production

### Compiler le Frontend
```bash
cd frontend
npm run build
```
→ Crée le dossier `dist/` avec les fichiers optimisés

### Servir localement (test build)
```bash
cd frontend
npm run preview
```
→ Ouvre http://localhost:4173

### Backend Production
```bash
cd backend
npm run build  # Si applicable (Node/Express = pas besoin)
npm start      # Démarrer en production
```

**Définir PORT en production**:
```bash
set NODE_ENV=production  # Windows
export NODE_ENV=production  # Linux/Mac

set PORT=8080  # Windows
export PORT=8080  # Linux/Mac

npm start
```

---

## Debugging

### Logs Backend
```bash
# Logs avec Morgan (HTTP)
# Logs console: console.log, console.error

# Vérifier connexion BD
# Dans le log: ✅ Connexion à la base de données SQLite réussie
```

### Logs Frontend
```bash
# Ouvrir DevTools: F12 ou Ctrl+Shift+I
# Onglet: Console

# Network tab: Voir les requêtes API
# Storage tab: Voir localStorage (token, user)
```

### Tests API avec cURL

#### Enregistrement
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@test.com",
    "password": "test123456",
    "passwordConfirm": "test123456"
  }'
```

#### Connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@test.com",
    "password": "test123456"
  }'
```
→ Récupérez le `token` de la réponse

#### Lister les devis
```bash
curl http://localhost:5000/api/devis \
  -H "Authorization: Bearer TOKEN_COPIE_ICI"
```

#### Créer un devis
```bash
curl -X POST http://localhost:5000/api/devis \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_ICI" \
  -d '{
    "numero": "DEV-001",
    "client_nom": "Martin",
    "client_prenom": "Sophie",
    "client_telephone": "0661234567",
    "client_adresse": "123 Rue de Alger",
    "articles": [
      {
        "designation": "Consultation",
        "quantite": 1,
        "prix_unitaire": 50000
      }
    ],
    "tva": 0
  }'
```

### Tests API avec Postman/Thunder Client

1. **Enregistrement**:
   - Méthode: `POST`
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
   ```json
   {
     "nom": "Test",
     "prenom": "User",
     "email": "test@example.com",
     "password": "test123456",
     "passwordConfirm": "test123456"
   }
   ```

2. **Connexion**:
   - Méthode: `POST`
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "test123456"
   }
   ```
   - Copier le `token` de la réponse

3. **Créer un devis**:
   - Méthode: `POST`
   - URL: `http://localhost:5000/api/devis`
   - Headers:
     - `Authorization: Bearer YOUR_TOKEN_HERE`
     - `Content-Type: application/json`
   - Body (JSON):
   ```json
   {
     "numero": "DEV-TEST-001",
     "client_nom": "Dupont",
     "client_prenom": "Marie",
     "client_telephone": "0661234567",
     "client_adresse": "Villa Sunny, Alger",
     "articles": [
       {
         "designation": "Design intérieur complet",
         "quantite": 1,
         "prix_unitaire": 150000
       },
       {
         "designation": "Plans détaillés",
         "quantite": 3,
         "prix_unitaire": 25000
       }
     ],
     "tva": 19
   }
   ```

### Vérifier les Performances

#### Frontend
```bash
# Audit Lighthouse dans Chrome DevTools
# Performance, Accessibility, Best Practices, SEO

# Network tab: Vérifier taille des fichiers
```

#### Backend
```bash
# Vérifier les requêtes SQL
# Activer les logs detaillés
# Mesurer temps de réponse
```

---

## Variables d'Environnement

### Backend: `.env`
```
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=backend/data/erp.db
```

### Frontend: `.env.local`
```
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
```

---

## Dépannage Rapide

### Port 5000 déjà en utilisation
```bash
# Windows: Trouver le processus
netstat -ano | findstr :5000

# Tuer le processus
taskkill /PID <PID> /F

# Alternative: Changer le port
set PORT=5001
npm run dev
```

### Port 3000 déjà en utilisation
```bash
# Même approche
netstat -ano | findstr :3000

# Alternative: Vite change automatiquement (5173, 5174, etc.)
```

### Module manquant
```bash
npm install missing-package-name
```

### Cache problématique
```bash
# Frontend
rm -rf frontend/node_modules frontend/package-lock.json
npm install

# Backend
rm -rf backend/node_modules backend/package-lock.json
npm install
```

---

## Scripts npm Personnalisés

### Backend `package.json`
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

### Frontend `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Checklist Avant Commit/Deploy

- [ ] `npm run dev` fonctionne (front + back)
- [ ] Backend: ✅ Connexion BD réussie
- [ ] Frontend: Pas d'erreurs console (F12)
- [ ] Tests API: auth + devis fonctionnent
- [ ] Base de données: données cohérentes
- [ ] Variables d'environnement définies
- [ ] Pas de secrets en dur (git)
- [ ] Logs importants en place
- [ ] Messages d'erreur clairs

---

## Ressources

- [Node.js Docs](https://nodejs.org/docs/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [SQLite Docs](https://sqlite.org/docs.html)
- [JWT Intro](https://jwt.io/introduction)

---

**Dernière mise à jour**: 15 Janvier 2025
**Version**: 1.0
