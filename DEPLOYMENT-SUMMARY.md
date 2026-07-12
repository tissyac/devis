# 📋 Résumé Configuration Déploiement

## 🎯 Objectif
Déployer l'application ERP Sara Decorex en ligne sur Vercel (frontend) et Render (backend).

---

## 🏗️ Architecture Déploiement

```
┌─────────────────────────────────────────────────────────────┐
│                     UTILISATEURS (Internet)                  │
└────────────┬───────────────────────────────────┬─────────────┘
             │                                   │
        ┌────▼─────────────────┐       ┌────────▼─────────┐
        │   Vercel (Frontend)  │       │  Render (Backend) │
        │  https://app.*       │       │  https://api.*    │
        └────┬─────────────────┘       └────────┬──────────┘
             │                                   │
             └───────────────┬───────────────────┘
                             │
                        ┌────▼──────────┐
                        │  GitHub Repo  │
                        └───────────────┘
```

---

## 📦 Fichiers de Configuration Créés

| Fichier | Cible | Rôle |
|---------|-------|------|
| **vercel.json** | Racine | Configuration Vercel |
| **render.yaml** | Racine | Configuration Render (déclaratif) |
| **Procfile** | Racine | Configuration Procfile (optionnel) |
| **deploy.sh** | Racine | Script de déploiement Linux/Mac |
| **deploy.bat** | Racine | Script de déploiement Windows |
| **.github/workflows/deploy.yml** | GitHub | CI/CD automatisé |
| **backend/render-deploy.sh** | Backend | Script init DB Render |
| **backend/scripts/init-db.sh** | Backend | Script init DB Linux |
| **backend/scripts/init-db.bat** | Backend | Script init DB Windows |

---

## 🔑 Variables d'Environnement à Configurer

### Sur Vercel (Frontend)

```
VITE_API_URL = https://votre-backend-xxxxx.onrender.com/api
VITE_API_TIMEOUT = 30000 (optionnel)
```

### Sur Render (Backend)

```
NODE_ENV = production
PORT = 5000
JWT_SECRET = (généré aléatoirement - min 32 chars)
CORS_ORIGIN = https://votre-frontend.vercel.app
DB_TYPE = sqlite
DB_PATH = ./data/erp.db
```

---

## 🚀 Étapes de Déploiement

### 1️⃣ Préparation (Local)

```bash
# Initialiser Git
cd c:\Users\HP\OneDrive\Desktop\dv
git init
git add .
git commit -m "Initial commit: ERP Sara Decorex"
```

### 2️⃣ Créer Dépôt GitHub

```bash
# Ajouter le remote
git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
git branch -M main
git push -u origin main
```

### 3️⃣ Déployer Frontend (Vercel)

1. Aller sur [vercel.com](https://vercel.com)
2. Importer le dépôt GitHub
3. Configurer: `Build: "cd frontend && npm run build"`, `Output: "frontend/dist"`
4. Ajouter variable `VITE_API_URL`
5. Déployer
6. **URL résultat:** `https://votre-nom.vercel.app`

### 4️⃣ Déployer Backend (Render)

1. Aller sur [render.com](https://render.com)
2. Créer Web Service, connecter GitHub
3. Configurer: `Build: "cd backend && npm install"`, `Start: "cd backend && npm start"`
4. Ajouter variables d'environnement (voir ci-dessus)
5. Déployer
6. **URL résultat:** `https://votre-backend-xxxxx.onrender.com`

### 5️⃣ Connecter Frontend-Backend

Mettre à jour sur Vercel:
```
VITE_API_URL = https://votre-backend-xxxxx.onrender.com/api
```

---

## ✅ Checklist de Vérification

- [ ] Dépôt GitHub créé et poussé
- [ ] Frontend déployé sur Vercel
- [ ] Backend déployé sur Render
- [ ] `VITE_API_URL` pointant vers le bon backend
- [ ] `CORS_ORIGIN` configuré sur le backend
- [ ] Frontend accède au backend sans erreur CORS
- [ ] Authentification fonctionne
- [ ] CRUD (create devis) fonctionne
- [ ] PDF génération fonctionne
- [ ] Base de données persiste les données

---

## 📚 Documents de Référence

| Document | Contenu |
|----------|---------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Guide étape-par-étape complet |
| [ENV-SETUP.md](./ENV-SETUP.md) | Explication détaillée des variables |
| [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) | Checklist complète pré-déploiement |
| [README.md](./README.md) | Guide général du projet |

---

## 🔗 URLs de Déploiement

Une fois déployé, vos URLs seront:

```
Frontend:  https://votre-nom.vercel.app
Backend:   https://votre-backend-xxxxx.onrender.com
API:       https://votre-backend-xxxxx.onrender.com/api
```

Remplacez `votre-nom` et `votre-backend-xxxxx` par vos URLs réelles.

---

## 🆘 Dépannage Rapide

| Problème | Solution |
|----------|----------|
| CORS error | Vérifiez `CORS_ORIGIN` sur Render |
| API 404 | Vérifiez `VITE_API_URL` se termine par `/api` |
| JWT error | Régénérez `JWT_SECRET` |
| Base de données vide | Assurez-vous DB est créée au démarrage |
| Backend en sleep | Utilisez service payant ou KeepAlive |

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

---

## 📞 Support

- **Vercel:** https://vercel.com/docs
- **Render:** https://render.com/docs
- **Documentation du projet:** Voir les fichiers `.md` du dépôt

---

**🎉 Prêt pour le déploiement!**
