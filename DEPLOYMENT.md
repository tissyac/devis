# 🚀 Guide de Déploiement - ERP Sara Decorex

## Vue d'ensemble

Ce projet utilise:
- **Frontend**: React + Vite sur **Vercel**
- **Backend**: Node.js + Express sur **Render** (ou Railway)
- **Base de données**: SQLite (incluse)

---

## 📋 Prérequis

- Compte GitHub (pour connecter le dépôt)
- Compte [Vercel](https://vercel.com) (gratuit)
- Compte [Render](https://render.com) (gratuit) ou [Railway](https://railway.app)

---

## 🔧 Préparation locale

### 1. Initialiser Git (si pas encore fait)

```bash
cd c:\Users\HP\OneDrive\Desktop\dv
git init
git add .
git commit -m "Initial commit: ERP Sara Decorex"
```

### 2. Créer un dépôt GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Créez un dépôt `gestion-commercial` (ou similaire)
3. Connectez votre dépôt local:

```bash
git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
git branch -M main
git push -u origin main
```

---

## 🌐 Déploiement Frontend sur Vercel

### Étape 1: Connecter Vercel à GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez **"New Project"**
3. **Importez votre dépôt GitHub** `gestion-commercial`
4. Sélectionnez **Framework**: Vite
5. Configuration du build:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`

### Étape 2: Variables d'environnement

Dans **Settings > Environment Variables**, ajoutez:

```
VITE_API_URL = https://votre-backend.render.com/api
VITE_API_TIMEOUT = 30000
```

### Étape 3: Déployer

Cliquez **"Deploy"** ✅

**URL Frontend**: `https://votre-nom.vercel.app`

---

## 🔌 Déploiement Backend sur Render

### Étape 1: Créer un Web Service

1. Allez sur [render.com](https://render.com)
2. Cliquez **"New +"** → **"Web Service"**
3. **Connectez votre dépôt GitHub**
4. Configuration:
   - **Name**: `erp-backend` (ou similaire)
   - **Environment**: `Node`
   - **Region**: `Oregon` (ou proche)
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### Étape 2: Variables d'environnement

Dans **Environment**, ajoutez:

```
NODE_ENV=production
PORT=5000
DB_TYPE=sqlite
DB_PATH=./data/erp.db
JWT_SECRET=votre_clé_très_secrète_ici
CORS_ORIGIN=https://votre-nom.vercel.app
```

**Générez une clé JWT aléatoire:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Étape 3: Déployer

Cliquez **"Create Web Service"** ✅

**URL Backend**: `https://votre-backend-xxxxx.onrender.com`

---

## 🔗 Connecter Frontend et Backend

Après le déploiement du backend sur Render:

### 1. Mettre à jour Vercel

1. Allez dans **Settings** de votre projet Vercel
2. **Environment Variables**
3. Mettez à jour `VITE_API_URL`:
   ```
   VITE_API_URL = https://votre-backend-xxxxx.onrender.com/api
   ```
4. **Redéployez** (Git → Push ou via le dashboard Vercel)

### 2. Vérifier la connexion

1. Ouvrez votre frontend: `https://votre-nom.vercel.app`
2. Inscrivez-vous et testez

---

## 🗄️ Base de données

### SQLite (Recommandé pour Free)

La base de données SQLite est incluse et fonctionne sans configuration supplémentaire.

**Localisation**: `/backend/data/erp.db`

⚠️ **Note**: Sur Render Free, les fichiers sont éphémères. Les données peuvent être perdues lors du redémarrage.

### PostgreSQL (Optionnel - Production)

Pour une base de données persistante:

1. Créez un **PostgreSQL Database** sur [Render](https://render.com)
2. Copiez les variables de connexion
3. Mettez à jour les variables d'environnement du backend:
   ```
   DB_HOST=xxx.render.com
   DB_PORT=5432
   DB_NAME=xxx
   DB_USER=xxx
   DB_PASSWORD=xxx
   ```

---

## 📦 Alternative: Railway ou Heroku

### Railway (Gratuit avec crédit)

```bash
npm install -g @railway/cli
railway init
railway deploy
```

### Heroku (Payant)

```bash
heroku create votre-app
git push heroku main
heroku config:set NODE_ENV=production
```

---

## ✅ Checklist Final

- [ ] Dépôt GitHub créé et poussé
- [ ] Frontend déployé sur Vercel
- [ ] Backend déployé sur Render
- [ ] Variables d'environnement configurées
- [ ] `VITE_API_URL` pointant vers le backend
- [ ] `CORS_ORIGIN` pointant vers le frontend
- [ ] Test d'authentification (inscription + connexion)
- [ ] Test de création d'un devis
- [ ] Test de téléchargement PDF

---

## 🐛 Dépannage

### "CORS error"
- Vérifiez `CORS_ORIGIN` dans les variables du backend
- Assurez-vous qu'il contient l'URL complète du frontend

### "API 404"
- Vérifiez `VITE_API_URL` dans Vercel
- L'URL doit se terminer par `/api`

### "Base de données vide"
- Vérifiez que `DB_PATH` pointe vers `./data/erp.db`
- Sur Render, les fichiers peuvent être ephemères en Free

### Backend en sleep
- Le plan Render Free se met en veille après inactivité
- Utilisez [KeepAlive](https://uptimerobot.com) pour garder actif

---

## 📞 Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Render](https://render.com/docs)
- [Problèmes GitHub](https://github.com/tissyac/gestion-commercial/issues)

---

**Bon déploiement! 🚀**
