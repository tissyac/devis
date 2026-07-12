/**
 * Script de migration de base de données
 * ========================================
 * 
 * À exécuter pour initialiser les tables
 * npm run db:migrate
 */

const { pool } = require('../src/config/database');

/**
 * Schéma de la base de données
 */
const schema = `
  -- Table Utilisateurs
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Table Devis
  CREATE TABLE IF NOT EXISTS devis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero VARCHAR(50) UNIQUE NOT NULL,
    client VARCHAR(255) NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    description TEXT,
    statut VARCHAR(50) DEFAULT 'BROUILLON',
    date_devis TIMESTAMP DEFAULT NOW(),
    date_validite TIMESTAMP,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Table Factures
  CREATE TABLE IF NOT EXISTS factures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero VARCHAR(50) UNIQUE NOT NULL,
    client VARCHAR(255) NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    description TEXT,
    statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
    date_facture TIMESTAMP DEFAULT NOW(),
    date_echeance TIMESTAMP,
    montant_paye DECIMAL(12, 2) DEFAULT 0,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Table Bons de Commande
  CREATE TABLE IF NOT EXISTS bons_commande (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero VARCHAR(50) UNIQUE NOT NULL,
    fournisseur VARCHAR(255) NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    description TEXT,
    statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
    date_commande TIMESTAMP DEFAULT NOW(),
    date_livraison TIMESTAMP,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Table Bons de Versement
  CREATE TABLE IF NOT EXISTS bons_versement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero VARCHAR(50) UNIQUE NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    description TEXT,
    statut VARCHAR(50) DEFAULT 'EN_ATTENTE',
    date_versement TIMESTAMP DEFAULT NOW(),
    date_reception TIMESTAMP,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Index pour améliorer les performances
  CREATE INDEX IF NOT EXISTS idx_devis_statut ON devis(statut);
  CREATE INDEX IF NOT EXISTS idx_devis_user_id ON devis(user_id);
  CREATE INDEX IF NOT EXISTS idx_devis_created_at ON devis(created_at);

  CREATE INDEX IF NOT EXISTS idx_factures_statut ON factures(statut);
  CREATE INDEX IF NOT EXISTS idx_factures_user_id ON factures(user_id);
  CREATE INDEX IF NOT EXISTS idx_factures_created_at ON factures(created_at);

  CREATE INDEX IF NOT EXISTS idx_bons_commande_statut ON bons_commande(statut);
  CREATE INDEX IF NOT EXISTS idx_bons_commande_user_id ON bons_commande(user_id);

  CREATE INDEX IF NOT EXISTS idx_bons_versement_statut ON bons_versement(statut);
  CREATE INDEX IF NOT EXISTS idx_bons_versement_user_id ON bons_versement(user_id);

  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;

/**
 * Exécute les migrations
 */
async function migrate() {
  console.log('🔄 Démarrage des migrations...');

  try {
    await pool.query(schema);
    console.log('✅ Migrations complétées avec succès');
    console.log('📊 Tables créées:');
    console.log('   - users');
    console.log('   - devis');
    console.log('   - factures');
    console.log('   - bons_commande');
    console.log('   - bons_versement');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur migration:', err);
    process.exit(1);
  }
}

migrate();
