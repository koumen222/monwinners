const app = require('../app');
const connectDB = require('./config/db');

// Vercel Serverless Function handler
// - Ne pas faire app.listen()
// - Réutiliser la connexion DB si possible
let dbInitPromise;
async function ensureDbOnce() {
  if (!dbInitPromise) {
    dbInitPromise = connectDB();
  }
  return dbInitPromise;
}

module.exports = async (req, res) => {
  await ensureDbOnce();
  return app(req, res);
};

