# 🚀 Démarrage Rapide - Déploiement en Ligne

Félicitations! Votre projet ERP Sara Decorex est maintenant prêt pour être déployé en ligne.

## ⏱️ Durée estimée: 15-20 minutes

---

## 📋 Avant de commencer

Vous avez besoin de:
- ✅ Un compte **GitHub** (gratuit)
- ✅ Un compte **Vercel** (gratuit) 
- ✅ Un compte **Render** (gratuit)

---

## 🎯 3 Étapes Simples

### 1️⃣ Créer un Dépôt GitHub (3 minutes)

```bash
# Le projet est déjà initialisé avec Git!
# Allez sur https://github.com/new
# Créez un nouveau dépôt: "gestion-commercial"
```

Puis connectez votre code:

```bash
git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
git branch -M main
git push -u origin main
```

✅ **Vérifie sur GitHub** que ton code est là!

---

### 2️⃣ Déployer Frontend sur Vercel (5 minutes)

1. Allez sur **[vercel.com](https://vercel.com)**
2. Cliquez **"New Project"**
3. **Connectez votre dépôt GitHub** `gestion-commercial`
4. Configuration:
   - **Framework**: Vite
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
5. **Environment Variables**:
   - `VITE_API_URL` = `https://votre-backend.onrender.com/api`
   - (Vous verrez le bon URL après le déploiement backend)
6. Cliquez **"Deploy"** ✅

**URL Frontend**: `https://votre-nom.vercel.app` (attendre ~3 min)

---

### 3️⃣ Déployer Backend sur Render (5 minutes)

1. Allez sur **[render.com](https://render.com)**
2. Cliquez **"New"** → **"Web Service"**
3. **Connectez votre dépôt GitHub**
4. Configuration:
   - **Name**: `erp-backend`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. **Environment Variables** (ajouter):

```
NODE_ENV=production
PORT=5000
JWT_SECRET=generé automatiquement
CORS_ORIGIN=https://votre-frontend.vercel.app
DB_TYPE=sqlite
DB_PATH=./data/erp.db
```

Pour `JWT_SECRET`, Render le génère automatiquement ou vous pouvez utiliser:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

6. Cliquez **"Create Web Service"** ✅

**URL Backend**: `https://votre-backend-xxxxx.onrender.com` (attendre ~5 min)

---

## 🔗 Connecter Frontend et Backend

Une fois le backend déployé:

1. Allez sur **Vercel** → Votre projet → **Settings**
2. Allez à **Environment Variables**
3. Mettez à jour `VITE_API_URL`:
   ```
   VITE_API_URL = https://votre-backend-xxxxx.onrender.com/api
   ```
4. **Redéployez** en allant dans **Deployments** → cliquez sur le plus récent → **Redeploy**

---

## ✅ Tester l'Application

1. Ouvrez: `https://votre-nom.vercel.app`
2. Inscrivez-vous avec:
   - **Nom**: Test
   - **Email**: test@example.com
   - **Mot de passe**: AnyPassword123!
3. Créez un devis
4. Téléchargez le PDF
5. ✅ Tout fonctionne!

---

## 🐛 Si ça ne marche pas

| Problème | Solution |
|----------|----------|
| **CORS error** | Vérifiez `CORS_ORIGIN` sur Render |
| **API 404** | Vérifiez `VITE_API_URL` se termine par `/api` |
| **Page blanche** | Attendez 5-10 minutes, Render met du temps au démarrage |
| **JWT error** | Régénérez `JWT_SECRET` |

**Voir:** [DEPLOYMENT.md](./DEPLOYMENT.md) pour un guide complet.

---

## 📖 Documentation Complète

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide détaillé étape-par-étape
- **[ENV-SETUP.md](./ENV-SETUP.md)** - Explication des variables d'environnement
- **[PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)** - Checklist complète
- **[DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md)** - Résumé config

---

## 📱 URLs de Votre Application

Une fois déployée, partager ces URLs:

```
🌐 Application:  https://votre-nom.vercel.app
🔌 API Backend:  https://votre-backend-xxxxx.onrender.com/api
```

---

## 🎉 Vous Avez Réussi!

Votre application est maintenant en ligne et accessible à tous! 🚀

**Prochaines étapes:**
- [ ] Partager le lien avec vos utilisateurs
- [ ] Créer les premiers devis
- [ ] Surveiller les logs pour les erreurs
- [ ] Faire une sauvegarde régulière de la base de données

---

## 💡 Astuces

- **Render Free tier s'endort après 15 min inactivité:** Visitez votre app régulièrement
- **SQLite s'efface en redémarrage:** Utilisez PostgreSQL pour la production (payant)
- **Déploiement auto:** Chaque `git push` redéploie automatiquement

---

**Besoin d'aide?** Consultez les fichiers de documentation ou les logs de déploiement sur Vercel/Render.

**Succès! 🎉**
