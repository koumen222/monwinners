// index.js ou app.js (backend principal)
const express = require('express');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculator');

const app = express();

// CORS
app.use(cors({
  origin: ['https://monwinners-8qxd.vercel.app', 'http://localhost:3000']
}));

app.use(express.json());

// MONTEZ les routes AVEC /api
app.use('/api', calculatorRoutes);  // ← IMPORTANT: /api ici

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API works!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});