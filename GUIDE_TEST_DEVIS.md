# Guide de Test - Module Devis
## ERP Sara Decorex

---

## ✅ Checklist Pre-Test

### 1. **Installer les dépendances**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. **Démarrer les serveurs**

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```
Attendez: ✅ Connexion à la base de données SQLite réussie

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```
Attendez: ✅ Page disponible sur http://localhost:3000

---

## 🧪 Scénario Test 1 : Authentification

### Étapes
1. Naviguez vers http://localhost:3000
2. Cliquez sur "S'inscrire"
3. Remplissez le formulaire:
   - **Nom**: Dupont
   - **Prénom**: Jean
   - **Email**: jean@test.com
   - **Mot de passe**: test123456
   - **Confirmer**: test123456
4. Cliquez "S'inscrire"

### Résultat attendu
- ✅ Message "Inscription réussie"
- ✅ Redirection vers page Login
- ✅ Formulaire de connexion affiché

### Connexion
1. Email: jean@test.com
2. Mot de passe: test123456
3. Cliquez "Connexion"

### Résultat attendu
- ✅ Redirection vers tableau de bord
- ✅ Sidebar visible avec navigation
- ✅ Lien "Devis" visible dans la sidebar

---

## 🧪 Scénario Test 2 : Création d'un Devis

### Étapes
1. Cliquez sur "Devis" dans la sidebar
2. Observez la page de création de devis

### Validation UI
- ✅ **En-tête**:
  - Logo/nom: "SARA DECOREX"
  - Adresse: "VILLAGE IRYAHEN COMMUNE TALA HAMZA..."
  - Téléphone: "034 18 12 92"
  - Numéro généré: "DEV-[timestamp]"

- ✅ **Section Client**:
  - Champ "Nom" (obligatoire)
  - Champ "Prénom" (obligatoire)
  - Champ "Adresse"
  - Champ "Téléphone" (obligatoire)

- ✅ **Section Articles**:
  - Tableau avec colonnes: N°, Désignation, Quantité, Prix Unitaire, Total, Action
  - 1 ligne par défaut
  - Bouton "Ajouter un article"

- ✅ **Section TVA**:
  - Bouton radio "Sans TVA" (0%) - sélectionné par défaut
  - Bouton radio "TVA 9%"
  - Bouton radio "TVA 19%"

- ✅ **Section Totaux**:
  - "Montant H.T : 0,00 DA"
  - TVA/TTC visibles uniquement si TVA > 0

- ✅ **Section Conditions**:
  - Délai de livraison: "15 à 60 jours après le versement"
  - Modalité de paiement: 50%, 45%, 5%
  - Durée: "Valable 30 jours après l'obtention du devis"

### Remplissage du Formulaire
1. **Client**:
   - Nom: SAMIR
   - Prénom: Ahmed
   - Adresse: 123 Rue des Fleurs, Alger
   - Téléphone: 0661234567

2. **Articles**:
   - Cliquez sur la première ligne "Désignation"
   - Saisissez: "Consultation architecture"
   - Quantité: 1
   - Prix Unitaire: 50000
   - **Résultat attendu**: Total = 50,000.00

3. **Ajouter un 2ème article**:
   - Cliquez "Ajouter un article"
   - Désignation: "Plan 3D"
   - Quantité: 1
   - Prix Unitaire: 75000
   - **Résultat attendu**: Total = 75,000.00

4. **H.T calculé**:
   - Doit afficher: 125,000.00 DA

5. **Sélectionner TVA 19%**:
   - Cliquez sur "TVA 19%"
   - **Résultat attendu**:
     - TVA affiché: 23,750.00 DA
     - TTC affiché: 148,750.00 DA

### Vérification Calculs
| Étape | Montant H.T | TVA | TTC |
|-------|------------|-----|-----|
| 1 article (50k) | 50,000 | - | - |
| 2 articles (125k) | 125,000 | - | - |
| Avec TVA 19% | 125,000 | 23,750 | 148,750 |

### Soumission
1. Cliquez le bouton vert "Créer le Devis"

### Résultat attendu
- ✅ Message "Devis créé avec succès !"
- ✅ Formulaire réinitialisé après 1.5s
- ✅ Nouveau numéro généré
- ✅ Articles vidés (1 ligne vide restante)

---

## 🧪 Scénario Test 3 : Validation des Erreurs

### Test Erreur 1: Nombre d'articles
1. Essayez de supprimer l'unique article (bouton poubelle)
2. **Résultat attendu**: Bouton désactivé (gris) - cannot delete

### Test Erreur 2: Soumission incomplète
1. Laissez tous les champs vides
2. Cliquez "Créer le Devis"
3. **Résultat attendu**: Message d'erreur "Les informations client sont requises"

### Test Erreur 3: Article sans désignation
1. Remplissez Client (Nom, Prénom, Tél)
2. Laissez la Désignation vide
3. Cliquez "Créer le Devis"
4. **Résultat attendu**: Message "Au moins un article avec une désignation est requis"

---

## 🧪 Scénario Test 4 : Vérification Backend

### Vérification Logs Backend
Observez les logs du backend (Terminal 1):

**Création réussie**:
```
POST /api/devis 201 Created
```

**Erreur authentification**:
```
POST /api/devis 401 Unauthorized
```

### Vérification Base de Données
```bash
# Windows PowerShell
sqlite3 backend/data/erp.db

# Requêtes de test
SELECT * FROM devis;
SELECT * FROM devis_articles;
```

**Résultat attendu**:
- Table `devis` a 1+ enregistrement
- Table `devis_articles` a 2+ enregistrements (pour le test à 2 articles)

---

## 📊 Données de Test Recommandées

### Devis 1 (Simple)
- Client: Martin Lefevre
- Articles:
  - Devis de projet - 1 x 10,000 DA = 10,000 DA
- TVA: 0%
- Total: 10,000 DA

### Devis 2 (Moyen)
- Client: Sophie Bernard
- Articles:
  - Conception 3D - 1 x 30,000 DA = 30,000 DA
  - Rendu haute qualité - 2 x 15,000 DA = 30,000 DA
- TVA: 9%
- Total H.T: 60,000 DA
- Total TTC: 65,400 DA

### Devis 3 (Complet)
- Client: Mohammed Brahimi
- Adresse: Villa Royale, Kouba, Alger
- Articles:
  - Étude de faisabilité - 1 x 50,000 DA = 50,000 DA
  - Conception architecturale - 1 x 75,000 DA = 75,000 DA
  - Plans techniques - 3 x 20,000 DA = 60,000 DA
  - Devis détaillé - 1 x 15,000 DA = 15,000 DA
- TVA: 19%
- Total H.T: 200,000 DA
- Total TVC: 238,000 DA

---

## 🔍 Points de Contrôle Critiques

### Backend
- ✅ Routes `/api/devis` POST/GET/PUT/DELETE fonctionnelles
- ✅ Authentification JWT requise
- ✅ SQLite écrit/lit correctement
- ✅ Calculs serveur corrects (optionnel)
- ✅ Articles stockés séparément avec relations

### Frontend
- ✅ Formulaire affiche tous les champs
- ✅ Calculs auto en temps réel
- ✅ TVA/TTC visibles uniquement quand TVA > 0
- ✅ Conditions fixes affichées
- ✅ Messages d'erreur/succès clairs
- ✅ Boutons désactivés pendant la requête

### Base de Données
- ✅ Tables `devis` et `devis_articles` créées
- ✅ Clé étrangère avec CASCADE DELETE
- ✅ Indexes créés pour performances

---

## 🐛 Dépannage

### Erreur: "Impossible de se connecter"
```
Solution: Vérifiez que le backend est en cours d'exécution
- Terminal backend doit afficher: ✅ Serveur lancé sur le port 5000
```

### Erreur: "401 Unauthorized"
```
Solution: Token JWT manquant ou expiré
- Reconnectez-vous
- Vérifiez que le token est stocké dans localStorage
```

### Erreur: "Table devis not found"
```
Solution: Réinitialisez la base de données
- Arrêtez le serveur
- Supprimez backend/data/erp.db
- Redémarrez le serveur (crée novo les tables)
```

### Les calculs ne s'affichent pas
```
Solution: Vérifiez la sélection de TVA
- TVA/TTC ne s'affichent que si TVA > 0
- Sélectionnez "TVA 9%" ou "TVA 19%" pour voir les calculs
```

---

## ✨ Prochaines Étapes

1. **Implémenter Factures** (même structure que Devis)
2. **Implémenter Bons de Commande**
3. **Implémenter Bons de Versement**
4. **Génération PDF** avec PDFKit
5. **Export CSV/Excel**
6. **Historique et audit**

---

## 📋 Checklist Final Test

- [ ] Authentification fonctionne
- [ ] Page Devis se charge
- [ ] Formulaire client se remplit
- [ ] Articles s'ajoutent/supprimés
- [ ] TVA/TTC calculés correctement
- [ ] Devis créé avec succès
- [ ] Base de données mise à jour
- [ ] Messages d'erreur clairs
- [ ] Logs backend sans erreur
- [ ] Conditions fixes affichées

---

**Date de création**: 2025-01-15
**Version**: 1.0
**Statut**: ✅ Prêt pour test

