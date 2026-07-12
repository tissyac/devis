#!/bin/bash

# 🚀 Script de déploiement Render.com
# Exécuté lors du build et du démarrage du service

set -e

echo "📦 Déploiement Render"
echo "Environnement: $NODE_ENV"

# Initialiser la base de données si elle n'existe pas
if [ ! -f data/erp.db ]; then
    echo "🗂️  Création de la base de données..."
    mkdir -p data
    node -e "
        const db = require('better-sqlite3')('./data/erp.db');
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
            CREATE TABLE IF NOT EXISTS devis_articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                devis_id INTEGER NOT NULL,
                description TEXT NOT NULL,
                quantite INTEGER DEFAULT 1,
                prix_unitaire REAL DEFAULT 0,
                total REAL DEFAULT 0,
                FOREIGN KEY(devis_id) REFERENCES devis(id) ON DELETE CASCADE
            );
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
        console.log('✅ Base de données créée');
        db.close();
    "
fi

echo "✅ Déploiement prêt"
