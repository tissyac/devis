# 🏗️ Architecture ERP

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR (Client)                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (React + Tailwind CSS)                 │
│  - Pages: Dashboard, Devis, Factures, Bons, etc             │
│  - Composants réutilisables                                 │
│  - État global (Zustand)                                    │
│  - Appels API (Axios)                                       │
└─────────────────────────────────────────────────────────────┘
                    HTTP/REST (Port 3000)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           BACKEND (Node.js + Express)                        │
│  - Routes API (RESTful)                                     │
│  - Contrôleurs (logique métier)                             │
│  - Middlewares (auth, errors)                               │
│  - Services (business logic)                                │
│  - Modèles (data layer)                                     │
└─────────────────────────────────────────────────────────────┘
                    SQL (Port 5432)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           BASE DE DONNÉES (PostgreSQL)                       │
│  - Tables: users, devis, factures, etc                      │
│  - Index pour performances                                  │
│  - Relations FK                                             │
└─────────────────────────────────────────────────────────────┘
```

## Flux d'authentification

```
1. Utilisateur → Page Login
                    ↓
2. Soumet (email + password)
                    ↓
3. Frontend → POST /api/auth/login
                    ↓
4. Backend:
   - Valide email
   - Vérifie password (bcrypt)
   - Crée JWT token
                    ↓
5. Retourne token
                    ↓
6. Frontend stocke token (localStorage)
                    ↓
7. Ajoute token aux requêtes: Authorization: Bearer <token>
```

## Flux CRUD Devis

```
Frontend (React)
├── Affiche formulaire
├── Valide données
└── POST /api/devis {numero, client, montant}
                    ↓
Backend (Express)
├── Valide requête
├── Vérifie JWT
├── Valide métier
└── INSERT INTO devis
                    ↓
Database (PostgreSQL)
├── Insère nouvelle ligne
├── Crée ID UUID
└── Retourne l'objet
                    ↓
Backend répond 201 Created
                    ↓
Frontend affiche succès
```

## Structure des données

### Utilisateur
```
{
  id: UUID,
  nom: String,
  prenom: String,
  email: String (unique),
  password: String (bcrypt),
  role: String,
  is_active: Boolean,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Devis, Factures, Bons
```
{
  id: UUID,
  numero: String (unique),
  [client|fournisseur]: String,
  montant: Decimal,
  description: Text,
  statut: String (BROUILLON, ENVOYÉ, ACCEPTÉ, REFUSÉ),
  date_[document]: Timestamp,
  user_id: UUID (FK users),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

## Sécurité

### Authentification
- **JWT** pour les requêtes API
- Token stocké côté client (localStorage)
- Token envoyé dans header Authorization
- Tokens non révocables (stateless)

### Mots de passe
- **Bcrypt** pour le hachage
- Coût: 10 tours
- Jamais stocké en clair

### Protection
- **CORS** configuré
- **Helmet** pour headers sécurité
- **Validation** des entrées
- **Gestion d'erreurs** cohérente

## Performance

### Frontend
- **Vite** pour build rapide
- **React Router** pour SPA
- **Zustand** léger pour état
- **CSS utilitaires** (Tailwind)

### Backend
- **Express** léger et rapide
- **Connection pooling** PostgreSQL
- **Index** sur clés étrangères
- **Pagination** pour listes

### Base de données
- **Index** sur recherches fréquentes
- **Constraints** pour intégrité
- **Foreign Keys** pour relations
- **Timestamps** pour audit

## Scalabilité

### Court terme (Phase 2-3)
- Ajouter modules CRUD complets
- Générer PDFs
- Imports/Exports
- Recherche/Filtres

### Moyen terme
- Cache Redis
- Queues (jobs async)
- Multi-tenancy
- Roles/Permissions avancées

### Long terme
- API GraphQL
- Microservices
- Événements temps réel
- Mobile app

## Code Quality

### Standards
- Code commenté en français
- Structure uniforme
- Nommage explicite
- Gestion d'erreurs centralisée

### Testing
- Jest pour unit tests
- Supertest pour API tests
- Couverture 70%+

### CI/CD
- GitHub Actions
- Linting (ESLint)
- Tests automatiques
- Build automatique

## Déploiement

### Développement
- Backend sur :5000
- Frontend sur :3000
- DB locale

### Production
- Docker containers
- Reverse proxy (nginx)
- PostgreSQL manigé
- SSL/TLS
- Backups automatiques
