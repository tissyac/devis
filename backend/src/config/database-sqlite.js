/**
 * Configuration SQLite pour développement
 * ========================================
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Crée le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialise la base de données
const dbPath = path.join(dataDir, 'erp.db');
const db = new Database(dbPath);

// Active les clés étrangères
db.pragma('foreign_keys = ON');

/**
 * Teste la connexion
 */
function testConnection() {
  try {
    db.exec('SELECT 1');
    console.log('✅ Connexion à la base de données SQLite réussie');
    console.log(`📁 Base de données: ${dbPath}`);
    return true;
  } catch (err) {
    console.error('❌ Erreur de connexion:', err.message);
    return false;
  }
}

/**
 * Exécute une requête avec gestion des paramètres
 */
function query(sql, params = []) {
  try {
    // Pour SQLite, on utilise les paramètres avec ? ou $1, $2, etc.
    // better-sqlite3 utilise la notation ? par défaut
    const modifiedSql = sql.replace(/\$(\d+)/g, '?');
    
    if (sql.includes('INSERT') || sql.includes('UPDATE') || sql.includes('DELETE')) {
      const stmt = db.prepare(modifiedSql);
      const result = stmt.run(...params);
      return {
        rows: [{ id: result.lastInsertRowid, changes: result.changes }],
        rowCount: result.changes
      };
    } else {
      const stmt = db.prepare(modifiedSql);
      const rows = stmt.all(...params);
      return {
        rows: rows || [],
        rowCount: rows ? rows.length : 0
      };
    }
  } catch (err) {
    console.error('❌ Erreur requête:', err.message);
    throw err;
  }
}

/**
 * Ferme la connexion
 */
function closeConnection() {
  try {
    db.close();
    console.log('✅ Connexion à la base de données fermée');
  } catch (err) {
    console.error('❌ Erreur fermeture:', err.message);
  }
}

module.exports = {
  db,
  query,
  testConnection,
  closeConnection
};
