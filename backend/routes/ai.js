const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/ai.controller');

// Route POST pour envoyer les résultats à ChatGPT et obtenir des recommandations
router.post('/recommendations', getRecommendations);

module.exports = router;

