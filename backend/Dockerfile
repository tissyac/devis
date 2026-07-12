/**
 * Dockerfile pour le backend Node.js
 * ====================================
 */

FROM node:18-alpine

WORKDIR /app/backend

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY src ./src

# Expose le port
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
