# 🐳 Déploiement avec Docker

## Prérequis

- Docker 20+
- Docker Compose 2+

## Démarrage

```bash
# À la racine du projet
docker-compose up -d

# Vérifier que tout fonctionne
docker-compose ps
```

L'application sera accessible sur:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- PostgreSQL: localhost:5432

## Logs

```bash
# Voir tous les logs
docker-compose logs -f

# Logs spécifiques
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## Arrêt

```bash
# Arrêter les conteneurs
docker-compose down

# Arrêter et supprimer les données
docker-compose down -v
```

## Migrations

```bash
# Exécuter les migrations dans le conteneur backend
docker-compose exec backend npm run db:migrate

# Ajouter les données de test
docker-compose exec backend npm run db:seed
```

## Reconstruction

```bash
# Reconstruire les images
docker-compose build

# Reconstruire et redémarrer
docker-compose up --build -d
```

## Variables d'environnement

Les variables sont définies dans `docker-compose.yml`. Pour les modifier:

1. Éditer `docker-compose.yml`
2. Relancer avec `docker-compose up -d`

## Production

Pour un déploiement en production:

1. Changer `JWT_SECRET` par une vraie clé
2. Mettre `NODE_ENV=production`
3. Utiliser des secrets plutôt que des variables en clair
4. Ajouter des volumes persistants
5. Configurer un reverse proxy (nginx)
