# ERP - Guide de démarrage rapide

## ⚡ Commencez en 5 minutes

### 1. Préparation

```bash
# À la racine du projet
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configuration Base de Données

**Option A: PostgreSQL local**
```bash
# Créer la base
psql -U postgres
CREATE DATABASE erp_gestion_commerciale;
\q

# Éditer backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=erp_gestion_commerciale
DB_USER=postgres
DB_PASSWORD=your_password
```

**Option B: SQLite (simple pour développement)**
```bash
# Éditer backend/.env
DB_TYPE=sqlite
DB_PATH=./data/erp.db
```

### 3. Démarrer l'application

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

### 4. Accès

- Application: http://localhost:3000
- API: http://localhost:5000
- Health: http://localhost:5000/api/health

### 5. Test

1. Créer un compte à l'inscription
2. Se connecter
3. Voir le tableau de bord

## 📋 Checklist Post-Installation

- [ ] Backend démarre sans erreurs
- [ ] Frontend accessible sur :3000
- [ ] Connexion possible
- [ ] Tableau de bord s'affiche
- [ ] Les 4 modules s'ouvrent

## 🔧 Commandes utiles

### Backend
```bash
npm start          # Production
npm run dev        # Développement (nodemon)
npm test           # Tests
npm run db:migrate # Migrations BD
npm run db:seed    # Données de test
```

### Frontend
```bash
npm run dev        # Dev avec rechargement
npm run build      # Build production
npm run preview    # Preview build
```

## ❌ Troubleshooting

**Erreur connexion BD:**
- Vérifier `.env` du backend
- Vérifier PostgreSQL démarre: `psql -U postgres`

**Frontend affiche "Cannot GET":**
- Vérifier backend démarre
- Vérifier `VITE_API_URL` dans `.env`

**Erreur CORS:**
- Vérifier `CORS_ORIGIN` dans `backend/.env`

## 📚 Prochaines étapes

1. Lire [Backend README](backend/README.md)
2. Lire [Frontend README](frontend/README.md)
3. Explorer la structure du code
4. Commencer à implémenter les modules

## 💡 Tips

- Garder les 2 serveurs (backend/frontend) actifs
- Utiliser Insomnia/Postman pour tester l'API
- Lire les commentaires du code - ils expliquent l'architecture

---

**Besoin d'aide?** Vérifiez les READMEs spécifiques
