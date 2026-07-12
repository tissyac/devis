# 📚 Index de Déploiement - Tous les Fichiers

Voici un index complet de tous les fichiers de configuration et documentation créés pour le déploiement en ligne.

---

## 🚀 COMMENCEZ ICI

**Si c'est votre première fois:**

1. **[QUICK-DEPLOY.md](./QUICK-DEPLOY.md)** ⭐ **LISEZ EN PREMIER**
   - Guide rapide (15-20 minutes)
   - 3 étapes pour déployer
   - Pour les impatients

---

## 📖 Documentation Complète

### Déploiement

| Fichier | Usage | Lecteurs |
|---------|-------|----------|
| **[QUICK-DEPLOY.md](./QUICK-DEPLOY.md)** | ⭐ Start here! 15 min guide | Tous |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Guide détaillé complet | Débutants/Expert |
| **[ENV-SETUP.md](./ENV-SETUP.md)** | Variables d'environnement expliquées | Devs |
| **[PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)** | Vérifications avant prod | DevOps/QA |
| **[DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md)** | Résumé de configuration | Architectes |

### Projet

| Fichier | Usage |
|---------|-------|
| **[README.md](./README.md)** | Présentation générale du projet |
| **[COMMENCER_ICI.md](./COMMENCER_ICI.md)** | Premier démarrage local |
| **[SYNTHESE_DEVIS.md](./SYNTHESE_DEVIS.md)** | Documentation module Devis |
| **[GUIDE_TEST_DEVIS.md](./GUIDE_TEST_DEVIS.md)** | Scénarios de test |

---

## ⚙️ Fichiers de Configuration

### Racine du Projet

```
vercel.json              ← Config Vercel (frontend)
render.yaml              ← Config Render (déclaratif)
Procfile                 ← Config Heroku/Render (alternatif)
package.json             ← Scripts npm racine
.gitignore               ← Fichiers à ignorer
.github/workflows/       ← GitHub Actions CI/CD
```

### Backend

```
backend/
├── .env.example              ← Template variables d'env
├── package.json              ← Scripts npm backend
├── scripts/
│   ├── init-db.sh           ← Init DB (Linux/Mac)
│   ├── init-db.bat          ← Init DB (Windows)
│   └── seed.js              ← Données de test
└── render-deploy.sh         ← Script de déploiement Render
```

### Frontend

```
frontend/
├── .env.example              ← Template variables d'env
├── vite.config.js           ← Config Vite
├── tailwind.config.js       ← Config Tailwind
└── package.json             ← Scripts npm frontend
```

### Scripts Racine

```
deploy.sh                    ← Script déploiement Linux/Mac
deploy.bat                   ← Script déploiement Windows
setup.sh                     ← Setup initial Linux/Mac
setup.bat                    ← Setup initial Windows
start.bat                    ← Démarrage local Windows
```

---

## 🔐 Variables d'Environnement

### Frontend (Vercel)

```env
VITE_API_URL=https://votre-backend.onrender.com/api
VITE_API_TIMEOUT=30000
```

### Backend (Render)

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=xxxxx (min 32 chars)
CORS_ORIGIN=https://votre-frontend.vercel.app
DB_TYPE=sqlite
DB_PATH=./data/erp.db
```

Voir [ENV-SETUP.md](./ENV-SETUP.md) pour les détails.

---

## 🎯 Chemin de Déploiement Recommandé

### Étape 1: Préparation (Local)
```bash
cd c:\Users\HP\OneDrive\Desktop\dv
npm install          # Backend
npm install          # Frontend
npm run build        # Build frontend
```

### Étape 2: GitHub
```bash
git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
git push -u origin main
```

### Étape 3: Frontend (Vercel)
- [vercel.com](https://vercel.com) → New Project
- Connecter GitHub
- Ajouter `VITE_API_URL` (mettre à jour après backend)

### Étape 4: Backend (Render)
- [render.com](https://render.com) → New Service
- Connecter GitHub
- Ajouter variables d'environnement
- Noter l'URL du backend

### Étape 5: Intégration
- Mettre à jour `VITE_API_URL` sur Vercel
- Redéployer le frontend

---

## ✅ Checklists

### Avant le Déploiement

- [ ] Build frontend réussit (`npm run build`)
- [ ] Backend démarre (`npm start`)
- [ ] Base de données SQLite existe
- [ ] `.gitignore` ignore les fichiers sensibles
- [ ] Dépôt GitHub créé

Voir [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) pour la liste complète.

---

## 🔗 Ressources Externes

| Ressource | Lien |
|-----------|------|
| **Vercel** | https://vercel.com |
| **Render** | https://render.com |
| **GitHub** | https://github.com |
| **Node.js** | https://nodejs.org |
| **Vite** | https://vitejs.dev |
| **React** | https://react.dev |
| **Express** | https://expressjs.com |

---

## 🚀 Commandes Utiles

### Développement Local

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Les deux en même temps (nécessite npm 7+)
npm run dev
```

### Build Production

```bash
# Frontend
cd frontend && npm run build

# Backend (pas vraiment besoin)
npm run build
```

### Base de Données

```bash
# Initialiser DB
npm run db:init

# Ajouter données test
npm run db:seed

# Reset complet
npm run db:reset
```

### Git

```bash
# Voir le statut
git status

# Ajouter tout et commit
git add .
git commit -m "Message"

# Pousser vers GitHub
git push origin main
```

---

## 🆘 Dépannage Rapide

### Erreur: "CORS error"
**Cause:** `CORS_ORIGIN` non configuré ou incorrect
**Solution:** Verifiez [ENV-SETUP.md](./ENV-SETUP.md#cors-error)

### Erreur: "Cannot POST /api/..."
**Cause:** `VITE_API_URL` incorrect
**Solution:** Verifiez que l'URL se termine par `/api`

### Erreur: "JWT verification failed"
**Cause:** `JWT_SECRET` invalide
**Solution:** Régénérez et mettez à jour

### Page blanche sur Vercel
**Cause:** Build ou variables manquantes
**Solution:** Vérifiez les logs de Vercel → Deployments

### Backend ne répond pas
**Cause:** Render Free tier en sleep
**Solution:** Cliquez sur l'app pour réveiller, ou upgradez

---

## 📞 Où Trouver de l'Aide

| Question | Fichier |
|----------|---------|
| Comment déployer? | [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) |
| Variables d'environnement? | [ENV-SETUP.md](./ENV-SETUP.md) |
| Guide complet? | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Avant de déployer? | [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) |
| Résumé config? | [DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md) |
| Erreur CORS? | [ENV-SETUP.md](./ENV-SETUP.md#cors-error) |
| Architecture? | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) |

---

## 🎉 Vous Êtes Prêt!

Votre projet est configuré et prêt pour le déploiement en ligne.

**Prochaine étape:** Lire [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) et suivre les 3 étapes.

**Temps total:** ~20 minutes ⏱️

---

**Bonne chance et bon déploiement! 🚀**
