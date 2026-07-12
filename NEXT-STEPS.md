# 🎯 ACTIONS IMMÉDIATES - Déploiement en Ligne

**Votre projet est PRÊT! Voici ce qu'il faut faire maintenant:**

---

## ✅ Avant de Commencer

Assurez-vous d'avoir:
- [ ] Un compte **GitHub** gratuit: https://github.com/signup
- [ ] Un compte **Vercel** gratuit: https://vercel.com/signup
- [ ] Un compte **Render** gratuit: https://render.com/signup

**Durée totale: ~20-30 minutes**

---

## 📝 Étape 1: Créer Dépôt GitHub (2 minutes)

### 1.1 Créer le dépôt

1. Allez sur: https://github.com/new
2. Remplissez:
   - **Repository name**: `gestion-commercial`
   - **Description**: "ERP Sara Decorex - Système de Gestion Commerciale"
   - **Public/Private**: Public (ou Private)
   - **Initialize**: Non (on a déjà Git)
3. Cliquez **Create repository**

### 1.2 Pousser le code

Exécutez dans le terminal:

```bash
cd c:\Users\HP\OneDrive\Desktop\dv

git remote add origin https://github.com/VOTRE_USERNAME/gestion-commercial.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE_USERNAME` par votre username GitHub.

### ✅ Vérification
Allez sur votre dépôt GitHub. Vous devriez voir:
- ✓ Tous vos fichiers
- ✓ 3 commits dans l'historique
- ✓ Code poussé avec succès

**État après étape 1:**
```
Dépôt local ✓
Dépôt GitHub ✓
Code synchronisé ✓
```

---

## 🌐 Étape 2: Déployer Frontend sur Vercel (5 minutes)

### 2.1 Connecter Vercel

1. Allez sur: https://vercel.com/dashboard
2. Cliquez **Add New...** → **Project**
3. Cliquez **Import Git Repository**
4. Sélectionnez votre dépôt `gestion-commercial`

### 2.2 Configurer Build

1. **Framework**: Vite (détecté automatiquement)
2. **Build Command**:
   ```
   cd frontend && npm run build
   ```
3. **Output Directory**:
   ```
   frontend/dist
   ```
4. Cliquez **Continue**

### 2.3 Configurer Variables

Dans **Environment Variables**, ajoutez:

```
VITE_API_URL = https://placeholder-change-later.onrender.com/api
VITE_API_TIMEOUT = 30000
```

⚠️ **Important**: Vous changerez `VITE_API_URL` après le déploiement du backend!

### 2.4 Déployer

1. Cliquez **Deploy**
2. Attendez ~3-5 minutes
3. Vous verrez: **"Congratulations! Your project has been successfully deployed"**

### ✅ Vérification

Visitez votre URL frontend (ex: `https://gestion-commercial.vercel.app`)

Vous devriez voir:
- ✓ Page de login
- ✓ Pas d'erreurs blanches
- ✓ Pas d'erreurs dans la console (F12)

**Notez votre URL:**
```
Frontend URL: https://_____.vercel.app
```

**État après étape 2:**
```
Frontend déployé ✓
URL Vercel obtenue ✓
Prêt pour intégration ✓
```

---

## 🔌 Étape 3: Déployer Backend sur Render (10 minutes)

### 3.1 Créer Service

1. Allez sur: https://dashboard.render.com
2. Cliquez **New** → **Web Service**
3. Cliquez **Connect your own repository**
4. Sélectionnez `gestion-commercial`

### 3.2 Configurer Service

Remplissez les champs:

| Champ | Valeur |
|-------|--------|
| **Name** | `erp-backend` |
| **Environment** | Node |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |
| **Region** | `Oregon` (ou proche) |
| **Plan** | Free |

### 3.3 Ajouter Variables d'Environnement

Dans **Environment**, cliquez **Add Environment Variable** et ajoutez:

```
NODE_ENV                production
PORT                    5000
JWT_SECRET              (laissez vide, Render le génère)
CORS_ORIGIN             https://VOTRE_NOM.vercel.app
DB_TYPE                 sqlite
DB_PATH                 ./data/erp.db
```

Remplacez `VOTRE_NOM` par le début de votre URL Vercel (ex: si votre URL est `https://gestion-commercial.vercel.app`, mettez `https://gestion-commercial.vercel.app`).

### 3.4 Déployer

1. Cliquez **Create Web Service**
2. Attendez ~5-10 minutes (le premier build est plus lent)
3. Vous verrez: **"Live"** avec une URL verte

### ✅ Vérification

1. Visitez: `https://votre-backend-xxxxx.onrender.com/api/health`
   - Vous devriez voir une réponse JSON (ou 404, c'est normal)
   
2. Vérifiez les logs:
   - Pas d'erreur "CORS"
   - Pas d'erreur "Database"

**Notez votre URL:**
```
Backend URL: https://erp-backend-xxxxx.onrender.com
API URL:    https://erp-backend-xxxxx.onrender.com/api
```

**État après étape 3:**
```
Backend déployé ✓
URL Render obtenue ✓
Variables configurées ✓
```

---

## 🔗 Étape 4: Connecter Frontend et Backend (2 minutes)

### 4.1 Mettre à Jour Vercel

1. Allez sur **Vercel Dashboard** → Votre projet
2. Allez à **Settings** → **Environment Variables**
3. Modifiez `VITE_API_URL`:
   ```
   https://erp-backend-xxxxx.onrender.com/api
   ```
4. Sauvegardez

### 4.2 Redéployer Frontend

1. Allez à **Deployments**
2. Cliquez sur le plus récent déploiement
3. Cliquez **Redeploy**
4. Attendez ~2-3 minutes

### ✅ Vérification

1. Allez sur votre frontend: `https://VOTRE_NOM.vercel.app`
2. Ouvrez la **Console** (F12)
3. Vérifiez:
   - ✓ Pas d'erreur CORS
   - ✓ Pas d'erreur "Cannot POST"
4. Essayez de vous inscrire

**État après étape 4:**
```
Frontend-Backend connectés ✓
Communication API OK ✓
CORS configuré ✓
```

---

## 🧪 Étape 5: Tester l'Application (5 minutes)

### 5.1 Test d'Authentification

1. Allez sur `https://VOTRE_NOM.vercel.app`
2. Cliquez **S'inscrire**
3. Remplissez avec:
   - **Nom**: "Test User"
   - **Email**: "test@example.com"
   - **Mot de passe**: "Password123!"
4. Cliquez **S'inscrire**

**Résultat attendu:**
- ✓ Redirection vers le dashboard
- ✓ Pas d'erreur

### 5.2 Test de Création de Devis

1. Sur le dashboard, cliquez **Devis** → **Créer un Devis**
2. Remplissez les champs:
   - **Client**: "Test Client"
   - **Email**: "client@example.com"
   - Ajoutez un article
3. Cliquez **Créer**

**Résultat attendu:**
- ✓ Devis créé
- ✓ Redirection vers la liste

### 5.3 Test de Téléchargement PDF

1. Dans la liste des devis, cliquez **PDF** sur un devis
2. Attendez que le fichier se télécharge
3. Ouvrez le PDF

**Résultat attendu:**
- ✓ PDF généré
- ✓ Contient les informations du devis

### 5.4 Tester les Autres Modules

Répétez avec:
- [ ] Factures
- [ ] Bons de Commande
- [ ] Bons de Versement

---

## ✅ Checklist Final

- [ ] Dépôt GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Frontend déployé sur Vercel
- [ ] Backend déployé sur Render
- [ ] Variables d'environnement configurées
- [ ] Frontend et Backend connectés
- [ ] Test d'authentification ✓
- [ ] Test de création de devis ✓
- [ ] Test de PDF ✓

**Si tout est coché:** 🎉 **DÉPLOIEMENT RÉUSSI!**

---

## 🐛 Si Quelque Chose Ne Fonctionne Pas

### Erreur CORS
```
Access to XMLHttpRequest from origin blocked by CORS policy
```
**Solution:**
1. Vérifiez `CORS_ORIGIN` sur Render
2. Doit être exactement: `https://votre-nom.vercel.app`
3. Redéployez le backend

### Erreur API 404
```
Cannot POST /api/devis
```
**Solution:**
1. Vérifiez `VITE_API_URL` sur Vercel
2. Doit se terminer par `/api`
3. Redéployez le frontend

### Page Blanche
**Solution:**
1. Ouvrez la Console (F12)
2. Cherchez les erreurs
3. Vérifiez les logs Vercel

### Backend Lent/Endormi
- Render Free tier s'endort après 15 min
- Cliquez sur votre app pour réveiller
- Ou upgrade vers un plan payant

**Pour plus d'aide:** Consultez [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📞 Ressources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Fichier Local**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Fichier Local**: [ENV-SETUP.md](./ENV-SETUP.md)

---

## 🎯 URLs de Votre Application

Une fois terminé, partager ces URLs:

```
🌐 Application Frontend: https://_____.vercel.app
🔌 Backend API:         https://erp-backend-_____.onrender.com/api
```

---

## 🎉 C'est Fait!

Votre application ERP Sara Decorex est maintenant **EN LIGNE** et accessible à tous! 🚀

**Prochaines étapes:**
- Créer des données réelles
- Inviter des utilisateurs
- Surveiller les performances
- Faire des sauvegardes régulières

**Félicitations!** 🎊

---

**Besoin d'aide?** Consultez les fichiers `.md` du projet ou les logs de Vercel/Render.
