/**
 * Routes pour la gestion des bons de commande
 * ============================================
 * 
 * - GET /       - Lister tous les bons
 * - GET /:id    - Détails d'un bon
 * - POST /      - Créer un bon
 * - PUT /:id    - Modifier un bon
 * - DELETE /:id - Supprimer un bon
 * - GET /:id/pdf - Générer PDF
 */

const express = require('express');
const router = express.Router();

const bonCommandeController = require('../controllers/bon-commande.controller');
const { verifyToken } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(verifyToken);

// Lister les bons de commande
router.get('/', bonCommandeController.listBons);

// Détails d'un bon
router.get('/:id', bonCommandeController.getBon);

// Créer un bon
router.post('/', bonCommandeController.createBon);

// Modifier un bon
router.put('/:id', bonCommandeController.updateBon);

// Supprimer un bon
router.delete('/:id', bonCommandeController.deleteBon);

// Générer PDF
router.get('/:id/pdf', bonCommandeController.generatePDF);

module.exports = router;
