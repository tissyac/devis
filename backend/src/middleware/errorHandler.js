/**
 * Middleware de gestion des erreurs
 * ==================================
 * 
 * Capture et formate les erreurs
 * Envoie des réponses cohérentes au client
 */

/**
 * Classe d'erreur personnalisée
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Middleware de gestion des erreurs
 * @param {Error} err - L'erreur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Erreur serveur';

  // Erreur mauvais ID MongoDB
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée. Invalid: ${err.path}`;
    err = new AppError(message, 400);
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON Web Token invalide';
    err = new AppError(message, 400);
  }

  // Erreur JWT expiré
  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token expiré';
    err = new AppError(message, 400);
  }

  // Erreur validation Joi
  if (err.details && err.details[0]) {
    const message = err.details[0].message;
    err = new AppError(message, 400);
  }

  // Retour de l'erreur
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = {
  errorHandler,
  AppError
};
