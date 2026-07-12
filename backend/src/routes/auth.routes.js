/**
 * Routes d'authentification
 * ==========================
 * 
 * - POST /register - Inscription
 * - POST /login - Connexion
 * - POST /refresh - Rafraîchissement du token
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');

// Inscription
router.post('/register', authController.register);

// Connexion
router.post('/login', authController.login);

// Rafraîchissement du token (à implémenter)
router.post('/refresh', verifyToken, authController.refresh);

// Récupère l'utilisateur courant
router.get('/me', verifyToken, authController.getCurrentUser);

// Déconnexion
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
