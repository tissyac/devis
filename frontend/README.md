# ERP Gestion Commerciale - Frontend React

Interface web moderne pour la gestion commerciale d'aménagement intérieur.

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
cd frontend
npm install
```

### Configuration

Créez un fichier `.env` en copiant `.env.example`:

```bash
cp .env.example .env
```

Configurez l'URL de l'API backend:
```
VITE_API_URL=http://localhost:5000/api
```

### Démarrage

**Mode développement:**
```bash
npm run dev
```

L'application démarre sur http://localhost:3000

**Build pour production:**
```bash
npm run build
```

**Preview de la build:**
```bash
npm run preview
```

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── pages/           # Pages de l'application
│   ├── services/        # Services API
│   ├── context/         # Store Zustand (état global)
│   ├── styles/          # Styles Tailwind
│   ├── App.jsx          # Application principale
│   └── main.jsx         # Point d'entrée
├── index.html           # HTML principal
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind CSS
├── postcss.config.js    # Configuration PostCSS
├── .env.example         # Variables d'env (exemple)
├── package.json         # Dépendances
└── README.md           # Ce fichier
```

## 🎨 Technos utilisées

- **React 18** - Framework UI
- **Vite** - Build tool rapide
- **React Router** - Navigation
- **Tailwind CSS** - Styles
- **Zustand** - État global
- **Axios** - Requêtes HTTP
- **Lucide Icons** - Icônes

## 🔐 Authentification

- Connexion/Inscription
- Stockage du token JWT en localStorage
- Interceptors Axios pour injection du token
- Routes protégées

## 📑 Pages disponibles

- **Tableau de bord** (`/`) - Vue d'ensemble
- **Devis** (`/devis`) - Gestion des devis
- **Factures** (`/factures`) - Gestion des factures
- **Bons de Commande** (`/bons-commande`) - Gestion des bons
- **Bons de Versement** (`/bons-versement`) - Gestion des bons

## 🎯 Prochaines étapes

Les modules détaillés seront complétés dans les phases suivantes:
- [ ] Listes complètes avec pagination
- [ ] Formulaires CRUD
- [ ] Génération PDF
- [ ] Tableaux de bord avancés
- [ ] Gestion des clients/fournisseurs
- [ ] Imports/Exports
- [ ] Notifications en temps réel

## 📝 Licence

MIT

## 👤 Auteur

À compléter
