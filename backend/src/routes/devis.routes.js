/**
 * Routes pour la gestion des devis
 * ==================================
 * 
 * - GET /       - Lister tous les devis
 * - GET /:id    - Détails d'un devis
 * - POST /      - Créer un devis
 * - PUT /:id    - Modifier un devis
 * - DELETE /:id - Supprimer un devis
 * - GET /:id/pdf - Générer PDF
 */

const express = require('express');
const router = express.Router();

const devisController = require('../controllers/devis.controller');
const { verifyToken } = require('../middleware/auth');

// Toutes les routes devis nécessitent une authentification
router.use(verifyToken);

// Lister les devis
router.get('/', devisController.listDevis);

// Détails d'un devis
router.get('/:id', devisController.getDevis);

// Créer un devis
router.post('/', devisController.createDevis);

// Modifier un devis
router.put('/:id', devisController.updateDevis);

// Supprimer un devis
router.delete('/:id', devisController.deleteDevis);

// Générer PDF
router.get('/:id/pdf', devisController.generatePDF);

module.exports = router;
