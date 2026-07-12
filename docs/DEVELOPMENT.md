# 📚 Ressources & Guides de Développement

## 🎓 Apprentissage

### React & Frontend
- [Documentation React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev)

### Node.js & Backend
- [Documentation Node.js](https://nodejs.org/docs)
- [Express Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [JWT.io](https://jwt.io)
- [Bcrypt Guide](https://github.com/kelektiv/node.bcrypt.js)

### DevOps
- [Docker Docs](https://docs.docker.com)
- [Docker Compose](https://docs.docker.com/compose)

## 🛠️ Outils recommandés

### IDE
- **VS Code** (recommandé)
  - Extensions: ES7+ React/Redux/React-Native snippets
  - Thunder Client ou REST Client pour tester l'API

### API Testing
- **Postman** - Gratuit pour tests API
- **Insomnia** - Alternative moderne
- **Thunder Client** - Directement dans VS Code

### Base de données
- **pgAdmin** - Interface PostgreSQL
- **DBeaver** - Client SQL multi-DB

### Autres
- **Git** pour versioning
- **Figma** pour mockups (optionnel)
- **Notion** pour documentation

## 📝 Conventions de code

### Dossiers et fichiers

```
✅ Bon:
backend/
  src/
    controllers/
      user.controller.js
    routes/
      user.routes.js

❌ Mauvais:
backend/
  src/
    Controllers/       # Capital
      UserController.js  # Mauvais nom
```

### Naming

```javascript
// ✅ Variables & Fonctions (camelCase)
const userName = "Jean";
function getUserList() {}

// ✅ Classes & Composants (PascalCase)
class User {}
function UserComponent() {}

// ✅ Constantes (UPPER_SNAKE_CASE)
const MAX_LOGIN_ATTEMPTS = 5;

// ❌ Éviter
const user_name = "Jean";      // snake_case en JS
const GetUsers = () => {};      // Fonction capitalisée
const maxAttempts = "5";        // String au lieu de number
```

### Commentaires

```javascript
// ✅ Bon
/**
 * Récupère la liste des utilisateurs
 * @param {number} page - Numéro de page
 * @param {number} limit - Nombre d'éléments par page
 * @returns {Promise<Array>} Liste des utilisateurs
 */
async function getUserList(page = 1, limit = 20) {
  // Logique...
}

// ❌ Mauvais
// get users
function get_users() {}
```

## 🔄 Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/nom-feature

# 2. Commit réguliers
git add .
git commit -m "feat: description claire"

# 3. Pousser
git push origin feature/nom-feature

# 4. Pull Request
# Sur GitHub créer une PR

# 5. Fusionner après review
git merge feature/nom-feature
```

Commit types:
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

## 🧪 Testing

### Backend - Jest

```bash
# Installer
npm install --save-dev jest supertest

# Créer test
__tests__/controllers/user.test.js

# Lancer
npm test
```

Exemple:
```javascript
describe('Auth Controller', () => {
  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password' });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
```

### Frontend - Vitest

```bash
npm install --save-dev vitest @testing-library/react
```

## 📊 Monitoring

### Logs

```javascript
// ✅ Bon
console.log('✅ Utilisateur créé:', userId);
console.error('❌ Erreur DB:', error);
console.warn('⚠️  Performance lente');

// ❌ Mauvais
console.log('ok');
console.log(error);  // Affiche objet complexe
```

### Performance

```javascript
// Mesurer le temps
const start = Date.now();
// ... opération
const duration = Date.now() - start;
if (duration > 1000) console.warn('⚠️  Lent:', duration + 'ms');
```

## 🐛 Debugging

### Backend
```javascript
// Utiliser nodemon en dev
npm run dev

// Debugger Node.js
node --inspect src/index.js
// Chrome DevTools sur chrome://inspect
```

### Frontend
```javascript
// React DevTools Chrome Extension
// Redux DevTools (pour Zustand)
// Network tab pour API calls
// Console pour logs

// Utiliser console.log avec emojis
console.log('📝 État:', state);
console.log('🔗 API Call:', url);
console.log('✅ Succès');
```

## 🚀 Optimisations

### Frontend

```javascript
// ✅ Lazy loading
const DevisPage = lazy(() => import('./pages/DevisPage'));

// ✅ Memoization
const Component = memo(({ data }) => {
  return <div>{data}</div>;
});

// ✅ Dépendances useEffect
useEffect(() => {
  // fetch...
}, [id]); // N'exécuter que si id change
```

### Backend

```javascript
// ✅ Index dans DB
CREATE INDEX idx_users_email ON users(email);

// ✅ Connection pooling
const pool = new Pool({ max: 20 });

// ✅ Pagination
SELECT * FROM users LIMIT 20 OFFSET 0;

// ✅ Caching
const cache = new Map();
if (cache.has(key)) return cache.get(key);
```

## 📈 Progression

### Jour 1-2: Setup
- [ ] Cloner projet
- [ ] Configurer BD
- [ ] Démarrer backend/frontend
- [ ] Test login

### Semaine 1: Fondations
- [ ] Lire architecture
- [ ] Explorer le code
- [ ] Comprendre flux authentification
- [ ] Ajouter premier test

### Semaine 2-4: Modules
- [ ] Implémenter CRUD complet
- [ ] Ajouter validations
- [ ] Tester endpoints
- [ ] Générer PDFs

### Mois 2: Avancé
- [ ] Recherche/Filtres
- [ ] Imports/Exports
- [ ] Dashboard avancé
- [ ] Multi-utilisateurs

## 🎯 Conseils

1. **Lire le code existant** avant de coder
2. **Tester en local** avant de pousser
3. **Commenter le code complexe** mais pas l'évident
4. **Petit commits** plutôt que gros
5. **Demander de l'aide** en cas de blocage
6. **Garder les logs propres** en production
7. **Documenter les décisions** architecturales

## ⚠️ Pièges courants

```javascript
// ❌ ÉVITER: SQL Injection
const query = `SELECT * FROM users WHERE id = ${id}`;

// ✅ FAIRE: Paramètres
const query = 'SELECT * FROM users WHERE id = $1';
pool.query(query, [id]);

// ❌ ÉVITER: Sync/await oubliés
function fetchUsers() {
  // fetch sans return
}

// ✅ FAIRE: Async/await
async function fetchUsers() {
  return await api.getUsers();
}

// ❌ ÉVITER: État global sans limite
// Tout dans Zustand

// ✅ FAIRE: État local + global
// État local pour forme, global pour user
```

## 📞 Besoin d'aide?

1. Vérifiez la documentation (README, QUICKSTART)
2. Cherchez sur Google/Stack Overflow
3. Lisez les logs d'erreur
4. Demandez en code review
5. Créez une issue sur GitHub

---

**Bonne chance! 🚀**
