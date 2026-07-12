# ERP Gestion Commerciale - Backend

Backend Node.js + Express pour la gestion commerciale d'aménagement intérieur.

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
cd backend
npm install
```

### Configuration

Créez un fichier `.env` à la racine du dossier backend en copiant `.env.example`:

```bash
cp .env.example .env
```

Éditez `.env` et configurez:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET` (changez en production!)
- `CORS_ORIGIN` (URL du frontend)
- `PORT` (port du serveur)

### Démarrage

**Mode développement (avec rechargement automatique):**
```bash
npm run dev
```

**Mode production:**
```bash
npm start
```

Le serveur démarre sur http://localhost:5000

## 📚 API Endpoints

### Authentification (`/api/auth`)
- `POST /register` - Inscription nouvel utilisateur
- `POST /login` - Connexion
- `POST /refresh` - Rafraîchir le token JWT
- `GET /me` - Récupérer l'utilisateur courant

### Devis (`/api/devis`)
- `GET /` - Lister tous les devis
- `GET /:id` - Récupérer un devis
- `POST /` - Créer un devis
- `PUT /:id` - Modifier un devis
- `DELETE /:id` - Supprimer un devis
- `GET /:id/pdf` - Générer un PDF

### Factures (`/api/factures`)
- `GET /` - Lister toutes les factures
- `GET /:id` - Récupérer une facture
- `POST /` - Créer une facture
- `PUT /:id` - Modifier une facture
- `DELETE /:id` - Supprimer une facture
- `GET /:id/pdf` - Générer un PDF

### Bons de Commande (`/api/bons-commande`)
- `GET /` - Lister tous les bons
- `GET /:id` - Récupérer un bon
- `POST /` - Créer un bon
- `PUT /:id` - Modifier un bon
- `DELETE /:id` - Supprimer un bon
- `GET /:id/pdf` - Générer un PDF

### Bons de Versement (`/api/bons-versement`)
- `GET /` - Lister tous les bons
- `GET /:id` - Récupérer un bon
- `POST /` - Créer un bon
- `PUT /:id` - Modifier un bon
- `DELETE /:id` - Supprimer un bon
- `GET /:id/pdf` - Générer un PDF

## 🗄️ Base de données

### Configuration PostgreSQL

1. Créez une base de données:
```sql
CREATE DATABASE erp_gestion_commerciale;
```

2. Exécutez les migrations (à créer):
```bash
npm run db:migrate
```

### Tables principales

```sql
-- Utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Devis
CREATE TABLE devis (
  id UUID PRIMARY KEY,
  numero VARCHAR(50) UNIQUE NOT NULL,
  client VARCHAR(255) NOT NULL,
  montant DECIMAL(10, 2) NOT NULL,
  description TEXT,
  statut VARCHAR(50) DEFAULT 'BROUILLON',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Factures
CREATE TABLE factures (
  id UUID PRIMARY KEY,
  numero VARCHAR(50) UNIQUE NOT NULL,
  client VARCHAR(255) NOT NULL,
  montant DECIMAL(10, 2) NOT NULL,
  description TEXT,
  statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bons de Commande
CREATE TABLE bons_commande (
  id UUID PRIMARY KEY,
  numero VARCHAR(50) UNIQUE NOT NULL,
  fournisseur VARCHAR(255) NOT NULL,
  montant DECIMAL(10, 2) NOT NULL,
  description TEXT,
  statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bons de Versement
CREATE TABLE bons_versement (
  id UUID PRIMARY KEY,
  numero VARCHAR(50) UNIQUE NOT NULL,
  montant DECIMAL(10, 2) NOT NULL,
  description TEXT,
  statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentification JWT

Tous les endpoints (sauf `/auth/register` et `/auth/login`) nécessitent un header Authorization:

```
Authorization: Bearer <token_jwt>
```

## 🧪 Tests (à implémenter)

```bash
npm test
```

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration (DB, etc)
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middlewares (auth, errors)
│   ├── routes/          # Routes API
│   ├── models/          # Modèles données
│   ├── services/        # Services métier
│   ├── utils/           # Utilitaires
│   └── index.js         # Point d'entrée
├── .env.example         # Variables d'env (exemple)
├── package.json         # Dépendances
└── README.md           # Ce fichier
```

## 🚢 Déploiement

### Prérequis
- Node.js 14+
- PostgreSQL 12+

### Étapes
1. Configurez les variables d'environnement en production
2. Exécutez les migrations
3. Démarrez avec `npm start`

## 📝 Licence

MIT

## 👤 Auteur

À compléter
