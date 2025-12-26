const express = require('express');
const cors = require('cors');

// Optional: loads .env locally; on Render/Vercel you should use dashboard env vars.
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur opérationnel',
    timestamp: new Date().toISOString()
  });
});

// API root (useful when visiting /api in a browser)
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API OK',
    endpoints: [
      'GET  /api/health',
      'POST /api/calculator/calculate',
      'POST /api/ai/recommendations',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// Routes (kept inside /api folder)
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/calculator', require('./api/routes/calculator'));
app.use('/api/ai', require('./api/routes/ai'));

module.exports = app;


