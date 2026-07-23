# 🔧 Configuration Render - Guide Complet

**Lien Render**: https://render.com

---

## 📋 Configuration Render Étape-par-Étape

### 1️⃣ Créer un Web Service

1. Allez sur: https://dashboard.render.com
2. Cliquez **"New"** (coin supérieur droit)
3. Sélectionnez **"Web Service"**

---

## 2️⃣ Connecter GitHub

1. Cliquez **"Connect your own repository"**
2. Autorisez Render à accéder à GitHub
3. Cherchez: **`saradecorex`**
4. Cliquez **"Connect"**

---

## 3️⃣ Configuration de Base

Remplissez **EXACTEMENT** comme suit:

| Champ | Valeur |
|-------|--------|
| **Name** | `erp-backend` |
| **Environment** | `Node` |
| **Region** | `Oregon` ou `EU (Frankfurt)` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

---

## 4️⃣ Configuration Avancée

### 4.1 Root Directory (IMPORTANT!)

```
backend
```

⚠️ **CECI EST TRÈS IMPORTANT!** Le backend est dans le dossier `backend/`, pas à la racine.

### 4.2 Build Command

```
npm install
```

Ou si vous voulez aussi vérifier les erreurs:

```
npm install && npm run lint --if-present
```

### 4.3 Start Command

```
npm start
```

C'est équivalent à: `node src/index.js`

### 4.4 Plan

Choisir: **Free** (gratuit avec 750 heures/mois)

---

## 5️⃣ Variables d'Environnement (TRÈS IMPORTANT!)

Cliquez **"Add Environment Variable"** et ajoutez **CHAQUE** variable:

### 5.1 Node Environment

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |

### 5.2 Port

| Key | Value |
|-----|-------|
| `PORT` | `5000` |

### 5.3 JWT Secret

| Key | Value |
|-----|-------|
| `JWT_SECRET` | Une clé aléatoire longue (obligatoire) |

Ou générez-le vous-même:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Résultat exemple:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### 5.4 CORS Origin

| Key | Value |
|-----|-------|
| `CORS_ORIGIN` | `https://votre-frontend.vercel.app` |

⚠️ Remplacez cette valeur par l'URL Vercel réelle de votre frontend.

### 5.5 Base de Données

| Key | Value |
|-----|-------|
| `DB_TYPE` | `sqlite` |
| `DB_PATH` | `./data/erp.db` |

---

## 6️⃣ Liste Complète des Variables

Copier-coller cette liste:

```
NODE_ENV = production
JWT_SECRET = (une clé aléatoire longue, obligatoire)
CORS_ORIGIN = https://votre-frontend.vercel.app
DB_TYPE = sqlite
DB_PATH = ./data/erp.db
```

---

## 7️⃣ Déployer

1. Vérifiez tout:
   - [ ] Name: `erp-backend`
   - [ ] Root Directory: `backend`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`
   - [ ] 6 variables d'env configurées

2. Cliquez **"Create Web Service"**

3. Attendez **5-10 minutes** (premier build est lent)

---

## 8️⃣ Vérifier le Déploiement

### Statut

Vous verrez dans le dashboard:

```
State:  Live ✓  (vert)
```

### Logs

1. Allez dans **"Logs"**
2. Cherchez:
   ```
   Server running on http://localhost:5000
   ```

### URL Backend

Votre URL sera: 

```
https://erp-backend-xxxxx.onrender.com
```

(Visible dans le dashboard)

---

## 9️⃣ Tester la Connexion

### Test Simple

Visitez:
```
https://erp-backend-xxxxx.onrender.com/api/health
```

Vous devriez voir une réponse (200 OK ou 404, c'est normal).

### Test Depuis Frontend

1. Allez sur Vercel
2. Mettez à jour `VITE_API_URL`:
   ```
   https://erp-backend-xxxxx.onrender.com/api
   ```
3. Redéployez
4. Testez l'authentification

---

## 📝 Tableau de Référence Rapide

### Build Configuration

```
Root Directory: backend
Build Command: npm install
Start Command: npm start
Environment: Node
Region: Oregon (ou EU)
```

### Environment Variables (Complète)

```
NODE_ENV          → production
JWT_SECRET        → une clé aléatoire longue
CORS_ORIGIN       → https://votre-frontend.vercel.app
DB_TYPE           → sqlite
DB_PATH           → ./data/erp.db
```

---

## ❓ FAQ Render

### Q: C'est quoi le "Root Directory"?

**R**: C'est le dossier où se trouve le `package.json` du backend.
```
saradecorex/
├── backend/          ← Mettre "backend" ici
│   ├── package.json
│   └── src/
├── frontend/
└── ...
```

### Q: Pourquoi "backend" et pas la racine?

**R**: Car le backend est dans un sous-dossier. Render doit savoir où regarder.

### Q: Qu'est-ce que "Build Command"?

**R**: La commande pour installer les dépendances:
```
npm install
```

### Q: Qu'est-ce que "Start Command"?

**R**: La commande pour démarrer le serveur:
```
npm start
```

Qui exécute: `node src/index.js`

### Q: CORS_ORIGIN c'est quoi?

**R**: C'est le domaine de votre frontend. Sans ça, le frontend et backend ne peuvent pas communiquer.

```
Exemple: https://saradecorex.vercel.app
```

### Q: JWT_SECRET c'est quoi?

**R**: Une clé secrète pour sécuriser les tokens.

Render la génère automatiquement. Vous pouvez aussi la fournir:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Q: Pourquoi c'est lent au premier démarrage?

**R**: Render télécharge Node, installe les dépendances, etc. C'est normal (5-10 min).

### Q: Mon app s'endort après 15 min?

**R**: C'est le Free Tier qui met en sleep. Visitez votre app régulièrement pour la réveiller.

### Q: Mes données vont où?

**R**: Dans `/backend/data/erp.db`. C'est un fichier SQLite local.

⚠️ **Attention**: En Free Tier, le fichier peut être effacé au redémarrage.

### Q: Comment faire une sauvegarde?

**R**: Téléchargez `/backend/data/erp.db` régulièrement.

---

## ✅ Checklist Final Avant de Cliquer "Create"

- [ ] **Name**: `erp-backend`
- [ ] **Root Directory**: `backend`
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Region**: `Oregon` ou Europe
- [ ] **Plan**: `Free`
- [ ] **NODE_ENV**: `production`
- [ ] **JWT_SECRET**: une clé aléatoire longue
- [ ] **CORS_ORIGIN**: l'URL Vercel réelle
- [ ] **DB_TYPE**: `sqlite`
- [ ] **DB_PATH**: `./data/erp.db`

---

## 🚀 Après le Déploiement

### 1. Attendre le déploiement (5-10 min)

### 2. Vérifier les logs

```
✓ "Server running on http://localhost:5000"
✗ "Error: Cannot find module" → problème d'install
✗ "CORS error" → vérifier CORS_ORIGIN
```

### 3. Noter l'URL

```
https://erp-backend-xxxxx.onrender.com
```

### 4. Mettre à jour Vercel

Allez sur Vercel et changez `VITE_API_URL`:

```
https://erp-backend-xxxxx.onrender.com/api
```

### 5. Redéployer Frontend

Cliquez "Redeploy" sur Vercel.

### 6. Tester!

Allez sur votre frontend et testez l'authentification.

---

## 📞 En Cas de Problème

### Erreur: "Cannot find module"

**Cause**: Les dépendances ne se sont pas installées.

**Solution**:
1. Allez dans **Logs**
2. Cherchez l'erreur exacte
3. Verifiez que `Root Directory` = `backend`

### Erreur: "CORS policy blocked"

**Cause**: `CORS_ORIGIN` incorrect ou manquant.

**Solution**:
1. Vérifiez que `CORS_ORIGIN` = votre URL Vercel exacte
2. Redéployez le backend

### Erreur: "Connect ECONNREFUSED"

**Cause**: Le backend ne démarre pas.

**Solution**:
1. Vérifiez les logs
2. Vérifiez que `PORT` = `5000`
3. Vérifiez que `Start Command` = `npm start`

### Page blanche sur Frontend

**Cause**: Le frontend ne peut pas accéder au backend.

**Solution**:
1. Vérifiez `VITE_API_URL` sur Vercel
2. Doit se terminer par `/api`
3. Redéployez

---

## 🎯 Résumé Complet

```
┌─────────────────────────────────┐
│     CONFIGURATION RENDER        │
├─────────────────────────────────┤
│ Name: erp-backend               │
│ Environment: Node               │
│ Region: Oregon                  │
│ Root Directory: backend         │
│ Build Command: npm install      │
│ Start Command: npm start        │
├─────────────────────────────────┤
│ NODE_ENV=production             │
│ PORT=5000                       │
│ JWT_SECRET=(auto)               │
│ CORS_ORIGIN=vercel-url          │
│ DB_TYPE=sqlite                  │
│ DB_PATH=./data/erp.db           │
└─────────────────────────────────┘
```

---

## ✨ Prêt!

C'est tout ce qu'il faut! 

**Cliquez "Create Web Service" et attendez.**

**Résultat**: Votre backend sera disponible à:
```
https://erp-backend-xxxxx.onrender.com
```

**Succès! 🚀**
