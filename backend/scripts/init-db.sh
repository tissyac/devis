#!/bin/bash

# 📦 Script d'initialisation de base de données
# Crée la structure SQLite ou PostgreSQL selon la configuration

set -e

echo "🗂️  Initialisation de la base de données..."

cd "$(dirname "$0")"

# Charger les variables d'environnement
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
fi

# Configuration par défaut
DB_TYPE=${DB_TYPE:-sqlite}
DB_PATH=${DB_PATH:-./data/erp.db}
NODE_ENV=${NODE_ENV:-development}

echo "Configuration:"
echo "  - Type: $DB_TYPE"
echo "  - Environnement: $NODE_ENV"

if [ "$DB_TYPE" = "sqlite" ]; then
    echo "  - Chemin SQLite: $DB_PATH"
    
    # Créer le dossier data s'il n'existe pas
    mkdir -p data
    
    # Initialiser la base de données via Node
    node -e "
        const db = require('better-sqlite3')('$DB_PATH');
        
        // Créer les tables si elles n'existent pas
        console.log('📊 Création des tables...');
        
        // Users
        db.exec(\`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        \`);
        
        // Devis
        db.exec(\`
            CREATE TABLE IF NOT EXISTS devis (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                numero TEXT UNIQUE NOT NULL,
                client_nom TEXT NOT NULL,
                client_email TEXT,
                client_phone TEXT,
                montant_ht REAL DEFAULT 0,
                montant_tva REAL DEFAULT 0,
                montant_ttc REAL DEFAULT 0,
                description TEXT,
                statut TEXT DEFAULT 'brouillon',
                date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
                date_modification DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        \`);
        
        // Articles Devis
        db.exec(\`
            CREATE TABLE IF NOT EXISTS devis_articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                devis_id INTEGER NOT NULL,
                description TEXT NOT NULL,
                quantite INTEGER DEFAULT 1,
                prix_unitaire REAL DEFAULT 0,
                total REAL DEFAULT 0,
                FOREIGN KEY(devis_id) REFERENCES devis(id) ON DELETE CASCADE
            );
        \`);
        
        // Factures
        db.exec(\`
            CREATE TABLE IF NOT EXISTS factures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                numero TEXT UNIQUE NOT NULL,
                client_nom TEXT NOT NULL,
                montant_ht REAL DEFAULT 0,
                montant_tva REAL DEFAULT 0,
                montant_ttc REAL DEFAULT 0,
                statut TEXT DEFAULT 'draft',
                date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        \`);
        
        // Bons de Commande
        db.exec(\`
            CREATE TABLE IF NOT EXISTS bons_commande (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                numero TEXT UNIQUE NOT NULL,
                fournisseur TEXT NOT NULL,
                montant_ht REAL DEFAULT 0,
                montant_tva REAL DEFAULT 0,
                montant_ttc REAL DEFAULT 0,
                statut TEXT DEFAULT 'draft',
                date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        \`);
        
        // Bons de Versement
        db.exec(\`
            CREATE TABLE IF NOT EXISTS bons_versement (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                numero TEXT UNIQUE NOT NULL,
                client_nom TEXT NOT NULL,
                montant_total REAL DEFAULT 0,
                montant_verse REAL DEFAULT 0,
                description TEXT,
                statut TEXT DEFAULT 'en_attente',
                date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        \`);
        
        console.log('✅ Base de données initialisée avec succès');
        db.close();
    "
    
elif [ "$DB_TYPE" = "postgresql" ]; then
    echo "  - Host: $DB_HOST"
    echo "  - Database: $DB_NAME"
    echo ""
    echo "⚠️  PostgreSQL n'est pas encore supporté en auto-init"
    echo "Veuillez créer manuellement la base et exécuter les migrations"
fi

echo ""
echo "✅ Initialisation terminée!"
echo ""
echo "Prochaines étapes:"
echo "  1. Créer un utilisateur: npm run db:seed"
echo "  2. Démarrer le serveur: npm start"
