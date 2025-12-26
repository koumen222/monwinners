const express = require('express');
const router = express.Router();
const { calculate } = require('../controllers/calculator.controller');

// Route POST pour recevoir le formulaire et calculer
router.post('/calculator/calculate', calculate);

module.exports = router;

