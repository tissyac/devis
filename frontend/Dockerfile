/**
 * Dockerfile pour le frontend React
 * ===================================
 */

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app/frontend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

# Copier le build depuis le stage 1
COPY --from=builder /app/frontend/dist ./dist

# Expose le port
EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]
