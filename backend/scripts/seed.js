/**
 * Script de seed - Données de test
 * ==================================
 * 
 * À exécuter pour ajouter des données de test
 * npm run db:seed
 */

const { pool } = require('../src/config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Insère les données de test
 */
async function seed() {
  console.log('🌱 Démarrage du seed...');

  try {
    // Utilisateur de test
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash('password123', 10);

    await pool.query(
      `INSERT INTO users (id, nom, prenom, email, password) 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [userId, 'Dupont', 'Jean', 'jean.dupont@example.com', hashedPassword]
    );

    // Devis de test
    for (let i = 1; i <= 5; i++) {
      await pool.query(
        `INSERT INTO devis (id, numero, client, montant, description, statut, user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [
          uuidv4(),
          `DEV-2024-${String(i).padStart(4, '0')}`,
          `Client ${i}`,
          Math.random() * 10000 + 5000,
          `Aménagement client ${i}`,
          ['BROUILLON', 'ENVOYÉ', 'ACCEPTÉ', 'REFUSÉ'][Math.floor(Math.random() * 4)],
          userId
        ]
      );
    }

    // Factures de test
    for (let i = 1; i <= 3; i++) {
      await pool.query(
        `INSERT INTO factures (id, numero, client, montant, description, statut, user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [
          uuidv4(),
          `FAC-2024-${String(i).padStart(4, '0')}`,
          `Client ${i}`,
          Math.random() * 5000 + 2000,
          `Facture client ${i}`,
          ['EN_ATTENTE', 'PAYÉE', 'ANNULÉE'][Math.floor(Math.random() * 3)],
          userId
        ]
      );
    }

    console.log('✅ Seed complété');
    console.log('📊 Données insérées:');
    console.log('   - 1 utilisateur (jean.dupont@example.com / password123)');
    console.log('   - 5 devis');
    console.log('   - 3 factures');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur seed:', err);
    process.exit(1);
  }
}

seed();
