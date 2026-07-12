/**
 * Routes pour la gestion des factures
 * ====================================
 * 
 * - GET /       - Lister toutes les factures
 * - GET /:id    - Détails d'une facture
 * - POST /      - Créer une facture
 * - PUT /:id    - Modifier une facture
 * - DELETE /:id - Supprimer une facture
 * - GET /:id/pdf - Générer PDF
 */

const express = require('express');
const router = express.Router();

const factureController = require('../controllers/facture.controller');
const { verifyToken } = require('../middleware/auth');

// Toutes les routes facture nécessitent une authentification
router.use(verifyToken);

// Lister les factures
router.get('/', factureController.listFactures);

// Détails d'une facture
router.get('/:id', factureController.getFacture);

// Créer une facture
router.post('/', factureController.createFacture);

// Modifier une facture
router.put('/:id', factureController.updateFacture);

// Supprimer une facture
router.delete('/:id', factureController.deleteFacture);

// Générer PDF
router.get('/:id/pdf', factureController.generatePDF);

module.exports = router;
