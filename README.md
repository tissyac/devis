# 🏢 ERP Sara Decorex - Système de Gestion Commerciale

**Version**: 1.0  
**Date**: 15 Janvier 2025  
**Statut**: ✅ Module Devis Opérationnel

---

## 📖 Présentation

**Sara Decorex** est un logiciel professionnel de gestion commerciale conçu pour les entreprises de décoration et d'aménagement intérieur. Il permet de gérer complètement le cycle commercial: Devis → Factures → Bons de Commande → Bons de Versement.

### Caractéristiques
- ✅ Gestion des devis avec articles et calculs automatiques
- ✅ Interface utilisateur moderne et intuitive
- ✅ Authentification sécurisée par JWT
- ✅ Base de données SQLite intégrée
- ✅ API REST complète
- ⏳ Génération PDF (en cours)
- ⏳ Factures, bons et rapports (prochainement)

---

## 🚀 Démarrage Rapide

### 1️⃣ Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm (inclus avec Node.js)
- Un navigateur moderne (Chrome, Firefox, Edge)

### 2️⃣ Installation

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Démarrage

**Option A: Script automatique (Windows)**
```bash
cd ..
start.bat
```

**Option B: Démarrage manuel**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd ../frontend
npm run dev
```

### 4️⃣ Accédez à l'application
- 🌐 Frontend: **http://localhost:3000**
- 🔌 API Backend: **http://localhost:5000/api**

---

## 🌐 Déploiement en Ligne

L'application peut être déployée gratuitement sur **Vercel** (frontend) et **Render** (backend).

### 🚀 Déploiement Rapide (5 minutes)

**Windows:**
```bash
.\deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

Puis suivez les étapes du guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Déploiement sur Vercel (Frontend)

1. Allez sur [vercel.com](https://vercel.com)
2. Importez votre dépôt GitHub
3. Configure: **Build Command**: `cd frontend && npm run build`
4. **Déployer** ✅

### Déploiement sur Render (Backend)

1. Allez sur [render.com](https://render.com)
2. Créez un **Web Service**
3. Connectez votre dépôt GitHub
4. **Start Command**: `cd backend && npm start`
5. **Déployer** ✅

📖 **Guide complet**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 Documentation

| Document | Contenu |
|----------|---------|
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | ⭐ Guide complet de déploiement |
| **[SYNTHESE_DEVIS.md](./SYNTHESE_DEVIS.md)** | Implémentation complète du module Devis |
| **[GUIDE_TEST_DEVIS.md](./GUIDE_TEST_DEVIS.md)** | Scénarios de test détaillés avec données |
| **[COMMANDES.md](./COMMANDES.md)** | Commandes npm et debugging |


---

## 🏗️ Architecture

### Frontend Stack
```
React 18 + Vite
├─ Routing: React Router
├─ State: Zustand
├─ HTTP: Axios + JWT Interceptors
├─ UI: Tailwind CSS
└─ Icons: Lucide React
```

### Backend Stack
```
Node.js + Express
├─ Database: SQLite (better-sqlite3)
├─ Auth: JWT + bcryptjs
├─ Security: Helmet, CORS
├─ Logging: Morgan
└─ Validation: Custom middleware
```

### Database
```
SQLite
├─ users (authentification)
├─ devis (devis header)
├─ devis_articles (articles du devis)
├─ factures (factures)
├─ bons_commande
└─ bons_versement
```

---

## 📋 Fonctionnalités Actuelles

### ✅ Authentification
- Inscription utilisateur
- Connexion avec email/password
- JWT token (7 jours)
- Hash bcrypt (10 rounds)

### ✅ Gestion des Devis
- Créer un devis avec:
  - Informations client (nom, prénom, adresse, téléphone)
  - Articles multiples (désignation, quantité, prix)
  - TVA optionnelle (0%, 9%, 19%)
  - Calculs automatiques (H.T, TVA, TTC)
- Lister les devis avec pagination
- Récupérer détails d'un devis
- Modifier un devis
- Supprimer un devis
- Conditions commerciales fixes

### ⏳ En développement
- Génération PDF des devis
- Factures (structure identique)
- Bons de commande
- Bons de versement
- Export CSV/Excel

---

## 🔐 Authentification & Sécurité

### Flux Authentification
1. **Inscription**: Crée user, hache le mot de passe, génère JWT
2. **Connexion**: Valide credentials, génère JWT
3. **JWT Token**: Contient `{id, email, nom, prenom}`, valable 7 jours
4. **Requêtes protégées**: Envoient `Authorization: Bearer {token}`
5. **Middleware**: Vérifie token, définit `req.user`

### Sécurité
- ✅ Mots de passe hashés avec bcryptjs
- ✅ SQL injection prevention (paramètres liés)
- ✅ CORS restreint (localhost:3000)
- ✅ Helmet security headers
- ✅ JWT pour authentification stateless

---

## 📊 Exemple d'Utilisation

### 1. S'inscrire
```
Email: ahmed@example.com
Mot de passe: MonMotDePasse123
```

### 2. Se connecter
```
Email: ahmed@example.com
Mot de passe: MonMotDePasse123
```

### 3. Créer un devis
```json
{
  "numero": "DEV-20250115-001",
  "client_nom": "Samir",
  "client_prenom": "Ahmed",
  "client_telephone": "0661234567",
  "client_adresse": "123 Rue des Fleurs, Alger",
  "articles": [
    {
      "designation": "Consultation architecte",
      "quantite": 1,
      "prix_unitaire": 50000
    },
    {
      "designation": "Plans 3D",
      "quantite": 1,
      "prix_unitaire": 75000
    }
  ],
  "tva": 19
}
```

**Résultat**:
- H.T: 125,000 DA
- TVA 19%: 23,750 DA
- TTC: 148,750 DA

---

## 🛠️ Commandes Importantes

```bash
# Backend développement
cd backend && npm run dev

# Frontend développement
cd frontend && npm run dev

# Build production (frontend)
cd frontend && npm run build

# Vérifier la BD SQLite
sqlite3 backend/data/erp.db

# Réinitialiser la BD
rm backend/data/erp.db
```

**Plus de commandes**: Consultez [COMMANDES.md](./COMMANDES.md)

---

## 📁 Structure du Projet

```
dv/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── company.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── data/
│   │   └── erp.db
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── context/
│   └── package.json
├── SYNTHESE_DEVIS.md
├── GUIDE_TEST_DEVIS.md
├── COMMANDES.md
└── start.bat
```

---

## 🧪 Tests

### Test Rapide (5 minutes)
1. Démarrez les serveurs (`npm run dev` x2 ou `start.bat`)
2. Allez sur http://localhost:3000
3. Inscrivez-vous et connectez-vous
4. Allez dans "Devis" et créez un test
5. Remplissez les infos et cliquez "Créer Devis"

**Résultat attendu**: Message "Devis créé avec succès !" ✅

### Tests Complets
Consultez [GUIDE_TEST_DEVIS.md](./GUIDE_TEST_DEVIS.md) pour les scénarios complets.

---

## 🐛 Dépannage

### Les serveurs ne démarrent pas
```
Solution: Vérifiez que Node.js est installé
node --version  // Doit être 18+
npm --version   // Doit être 9+
```

### Port déjà en utilisation
```
Backend (5000): 
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
```

### "Database not initialized"
```
Solution: Supprimer backend/data/erp.db et redémarrer
rm backend/data/erp.db
```

**Plus de solutions**: Consultez [COMMANDES.md](./COMMANDES.md)

---

## 🚦 Roadmap

- ✅ Module Devis (en production)
- 🔄 Module Factures (phase 2)
- 🔄 Bons de Commande (phase 3)
- 🔄 Bons de Versement (phase 4)
- ✨ PDF, Export, Analytics (phase 5)

---

## 📄 License

Ce projet est développé pour Sara Decorex.

---

*Version: 1.0-beta*  
*Dernière mise à jour: 15 Janvier 2025*
│   ├── src/
│   │   ├── config/         # Configuration (DB, JWT)
│   │   ├── controllers/    # Logique métier
│   │   ├── middleware/     # Middlewares
│   │   ├── routes/         # Routes API
│   │   ├── models/         # Modèles de données
│   │   ├── services/       # Services métier
│   │   └── utils/          # Utilitaires
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── docs/                    # Documentation
├── .gitignore
└── README.md               # Ce fichier
```

## 🛠️ Technologies

### Frontend
- **React 18** - Framework UI moderne
- **Vite** - Build tool rapide
- **React Router** - Navigation
- **Tailwind CSS** - Styles CSS utilitaires
- **Zustand** - Gestion d'état
- **Axios** - Requêtes HTTP
- **Lucide Icons** - Icônes SVG

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL 12+** - Base de données
- **JWT** - Authentification
- **Bcrypt** - Hachage de mots de passe
- **PDFKit** - Génération PDF

### DevOps
- **Docker** (optionnel)
- **Git/GitHub**

## 📦 Installation

### Prérequis

- Node.js 18+ et npm 9+
- PostgreSQL 12+ (ou SQLite pour le développement)
- Git

### 1. Cloner le projet

```bash
git clone <repository>
cd dv
```

### 2. Configuration Backend

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env et configurer la base de données
# DB_HOST=localhost
# DB_NAME=erp_gestion_commerciale
# DB_USER=postgres
# DB_PASSWORD=votre_mdp
# JWT_SECRET=votre_cle_secrete
```

### 3. Configuration Frontend

```bash
cd ../frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Vérifier VITE_API_URL=http://localhost:5000/api
```

## 🚀 Démarrage

### Mode développement

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Serveur sur http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Application sur http://localhost:3000
```

**Terminal 3 - (Optionnel) Lancer PostgreSQL:**
```bash
# Créer la base de données
psql -U postgres -c "CREATE DATABASE erp_gestion_commerciale;"

# Ou utiliser Docker
docker run --name postgres-erp -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
```

### Accès à l'application

- URL: http://localhost:3000
- API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## 📚 Modules

### ✅ Implémentés (Phase 1)

- **Authentification JWT** - Inscription/Connexion
- **Routes API** - Endpoints de base pour tous les modules
- **Contrôleurs** - Logique métier initiale
- **Interface Frontend** - Layout et navigation
- **Pages de base** - Dashboard et placeholders

### 🔄 À implémenter (Phase 2)

- [ ] Listes complètes avec pagination avancée
- [ ] Formulaires CRUD pour chaque module
- [ ] Validations métier
- [ ] Gestion des clients
- [ ] Gestion des fournisseurs
- [ ] Génération PDF professionnels
- [ ] Recherche et filtres

### 🎯 Phase 3+

- [ ] Tableau de bord analytique
- [ ] Imports/Exports (Excel, CSV)
- [ ] Notifications en temps réel
- [ ] Historique et audit
- [ ] API mobile
- [ ] Multi-utilisateurs avancé
- [ ] Gestion des permissions

## 📝 API Documentation

### Routes d'authentification

```
POST   /api/auth/register        - Inscription
POST   /api/auth/login           - Connexion
POST   /api/auth/refresh         - Rafraîchir token
GET    /api/auth/me              - Utilisateur courant
POST   /api/auth/logout          - Déconnexion
```

### Routes Devis

```
GET    /api/devis                - Lister les devis
GET    /api/devis/:id            - Détails devis
POST   /api/devis                - Créer devis
PUT    /api/devis/:id            - Modifier devis
DELETE /api/devis/:id            - Supprimer devis
GET    /api/devis/:id/pdf        - Générer PDF
```

### Routes Factures, Bons Commande, Bons Versement

Même structure que `/api/devis` avec endpoints correspondants

## 🔐 Sécurité

- Authentification JWT obligatoire pour les routes protégées
- Mots de passe hashés avec Bcrypt
- Protection CORS configurée
- Headers de sécurité avec Helmet
- Validation des entrées
- Gestion des erreurs cohérente

## 🗄️ Base de données

### Tables principales

**users** - Utilisateurs
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**devis, factures, bons_commande, bons_versement** - Documents

Voir les READMEs spécifiques pour les schémas complets.

## 📖 Documentation

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Architecture détaillée](docs/ARCHITECTURE.md) (à créer)
- [Guide contribution](docs/CONTRIBUTION.md) (à créer)

## 🚢 Déploiement

### Production

```bash
# Backend
npm run build
npm start

# Frontend
npm run build
# Servir le contenu de dist/ avec un serveur web (nginx, Apache, etc.)
```

### Avec Docker (optionnel)

```bash
docker-compose up -d
```

## 🤝 Contribution

1. Créer une branche feature (`git checkout -b feature/nom`)
2. Committer vos changements (`git commit -m 'Ajout feature'`)
3. Pusher la branche (`git push origin feature/nom`)
4. Créer une Pull Request

## 📄 Licence

MIT

## 👥 Auteur

Créé pour [Votre Entreprise]

## 📞 Support

Pour les questions ou problèmes:
1. Consulter la documentation
2. Vérifier les logs du serveur
3. Ouvrir une issue

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2026-06-10  
**État:** Phase 1 - Fondations établies ✅
