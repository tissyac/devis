/**
 * Routes pour la gestion des bons de versement
 * =============================================
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

const bonVersionmentController = require('../controllers/bon-versement.controller');
const { verifyToken } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(verifyToken);

// Lister les bons de versement
router.get('/', bonVersionmentController.listBons);

// Détails d'un bon
router.get('/:id', bonVersionmentController.getBon);

// Créer un bon
router.post('/', bonVersionmentController.createBon);

// Modifier un bon
router.put('/:id', bonVersionmentController.updateBon);

// Supprimer un bon
router.delete('/:id', bonVersionmentController.deleteBon);

// Générer PDF
router.get('/:id/pdf', bonVersionmentController.generatePDF);

module.exports = router;
