# ✅ Checklist Pré-Déploiement

Utilisez cette liste pour vérifier que tout est prêt avant de déployer en ligne.

---

## 📋 Phase 1: Préparation Locale (Avant tout)

- [ ] Le projet est sur GitHub (dépôt créé et poussé)
  - Commande: `git remote -v` devrait afficher votre dépôt

- [ ] Build frontend réussit
  - Commande: `cd frontend && npm run build`
  - Résultat: Pas d'erreurs, dossier `dist/` créé

- [ ] Backend démarre correctement
  - Commande: `cd backend && npm start`
  - Résultat: "Server running on http://localhost:5000"

- [ ] Base de données SQLite existe
  - Fichier: `backend/data/erp.db` existe
  - Ou: Utiliserez PostgreSQL en prod

- [ ] Fichiers sensibles sont dans `.gitignore`
  - Vérifier: `.env` ❌ (pas en git)
  - Vérifier: `node_modules/` ❌ (pas en git)
  - Vérifier: `dist/` ❌ (pas en git)

---

## 🔑 Phase 2: Configuration Environnement

### Frontend (.env.production)

- [ ] Variable `VITE_API_URL` configurée
  - Format: `https://votre-backend.onrender.com/api`
  - ⚠️ Doit se terminer par `/api`

- [ ] Variable `VITE_API_TIMEOUT` définie (optionnel)
  - Valeur recommandée: `30000`

### Backend (.env.production)

- [ ] `NODE_ENV=production`

- [ ] `PORT` configuré
  - Valeur: `5000` ou port assigné par Render

- [ ] `JWT_SECRET` défini (au moins 32 caractères)
  - Généré avec: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

- [ ] `CORS_ORIGIN` configuré
  - Format: `https://votre-frontend.vercel.app` (domaine Vercel)
  - Ou: `https://votre-frontend.vercel.app,http://localhost:3000` (dev + prod)

- [ ] `DB_TYPE` et chemin configurés
  - SQLite: `DB_TYPE=sqlite`, `DB_PATH=./data/erp.db`
  - OU PostgreSQL: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

---

## 🌐 Phase 3: Vercel (Frontend)

- [ ] Compte Vercel créé
  - Site: https://vercel.com

- [ ] Dépôt GitHub connecté à Vercel
  - "New Project" → Importer votre dépôt

- [ ] Framework configuré: **Vite**

- [ ] Build Command configuré
  - Valeur: `cd frontend && npm run build`

- [ ] Output Directory configuré
  - Valeur: `frontend/dist`

- [ ] Variables d'environnement ajoutées
  - [ ] `VITE_API_URL`
  - [ ] `VITE_API_TIMEOUT` (optionnel)

- [ ] Déploiement réussi
  - Statut: "✓ Success" sur le dashboard
  - URL: `https://votre-nom.vercel.app`

- [ ] Page d'accueil accessible
  - Visitez: `https://votre-nom.vercel.app`
  - Résultat: Page chargée sans erreurs blanches

---

## 🔌 Phase 4: Render (Backend)

- [ ] Compte Render créé
  - Site: https://render.com

- [ ] Web Service créé
  - Nombre: 1 service Node.js

- [ ] Dépôt GitHub connecté
  - Service connecté à votre dépôt

- [ ] Configuration du service
  - [ ] **Environment**: Node
  - [ ] **Build Command**: `cd backend && npm install`
  - [ ] **Start Command**: `cd backend && npm start`
  - [ ] **Region**: Europe (ou proche)

- [ ] Variables d'environnement configurées
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000` ou auto-assigné
  - [ ] `JWT_SECRET` (généré)
  - [ ] `CORS_ORIGIN=https://votre-frontend.vercel.app`
  - [ ] `DB_TYPE=sqlite` (ou PostgreSQL)
  - [ ] `DB_PATH=./data/erp.db`

- [ ] Build réussit
  - Logs affichent: "Running on port XXXX"

- [ ] Service actif
  - Statut: "Live" sur le dashboard
  - URL: `https://votre-backend-xxxxx.onrender.com`

---

## 🔗 Phase 5: Intégration & Test

- [ ] Vérifier la connexion backend
  - Visitez: `https://votre-backend-xxxxx.onrender.com/api/health`
  - Attendu: Réponse JSON (200 OK)

- [ ] Tester CORS
  - Visitez le frontend
  - Ouvrez Console (F12)
  - Aucune erreur CORS ne doit apparaître

- [ ] Tester authentification
  - Inscrivez-vous sur le frontend
  - Vérifiez que les tokens JWT fonctionnent
  - Les cookies sont envoyés et reçus

- [ ] Tester une opération CRUD
  - Créez un devis
  - Visualisez-le dans la liste
  - Modifiez-le
  - Supprimez-le

- [ ] Tester PDF
  - Téléchargez un PDF
  - Vérifiez qu'il s'ouvre correctement

---

## 📊 Phase 6: Monitoring & Sécurité

- [ ] Vérifier les logs Render
  - Chercher des erreurs ou warnings
  - S'assurer que pas de crash au démarrage

- [ ] Vérifier les logs Vercel
  - Pas d'erreurs de build
  - Pas d'erreurs 404 ou 500 en production

- [ ] Configuration HTTPS
  - Frontend: ✅ Vercel force HTTPS
  - Backend: ✅ Render force HTTPS
  - Navigation certifiée

- [ ] Vérifier les secrets
  - ❌ Aucun secret en texte brut dans les logs
  - ❌ JWT_SECRET jamais affiché
  - ✅ Tous les secrets via variables d'environnement

- [ ] Vérifier les headers de sécurité
  - Backend utilise Helmet ✅
  - CORS strictement limité ✅

---

## 🚀 Phase 7: Déploiement Continu (Optional)

- [ ] GitHub Actions configuré (optionnel)
  - Fichier: `.github/workflows/deploy.yml`
  - Sur chaque `git push main`, déploiement automatique

- [ ] Webhooks Render configuré (optionnel)
  - Auto-déploiement lors des changements GitHub

---

## ✅ Après Déploiement

- [ ] Partager l'URL du frontend aux utilisateurs
  - URL: `https://votre-frontend.vercel.app`

- [ ] Créer utilisateurs de test
  - Données de test pour démonstration

- [ ] Surveiller les erreurs
  - Mettre en place: Sentry, LogRocket ou autre

- [ ] Faire une sauvegarde
  - Télécharger `backend/data/erp.db`
  - Ou exporter PostgreSQL

- [ ] Documenter les URLs de production
  ```
  Frontend: https://votre-app.vercel.app
  Backend:  https://votre-backend-xxxxx.onrender.com
  API:      https://votre-backend-xxxxx.onrender.com/api
  ```

---

## 🐛 Si Quelque Chose Ne Fonctionne Pas

1. **Vérifier les logs Vercel**
   - Dashboard → Deployments → View Logs

2. **Vérifier les logs Render**
   - Dashboard → Logs

3. **Tester localement d'abord**
   - `npm run dev` en local
   - Reproduire le problème
   - Fixer et repousser

4. **Consulter:**
   - [DEPLOYMENT.md](./DEPLOYMENT.md) pour le guide complet
   - [ENV-SETUP.md](./ENV-SETUP.md) pour les variables
   - Logs de déploiement pour les erreurs spécifiques

---

## ✨ Excellent!

Si toutes les cases sont cochées ✅, votre application est **en ligne et prête pour les utilisateurs!**

🎉 **Déploiement réussi!**
