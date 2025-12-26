const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB (optionnelle) puis démarrage du serveur
const startServer = async () => {
  try {
    // Tenter de se connecter à MongoDB (optionnel)
    await connectDB();
    
    // Démarrer le serveur même si MongoDB n'est pas disponible
    app.listen(PORT, () => {
      console.log('\n✅ Serveur Express démarré avec succès!');
      console.log(`📡 Serveur lancé sur le port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
      console.log(`\n📋 Routes disponibles:`);
      console.log(`   - GET  /api/health (test de santé)`);
      console.log(`   - POST /api/calculator/calculate`);
      console.log(`   - POST /api/ai/recommendations`);
      console.log(`   - POST /api/auth/register`);
      console.log(`   - POST /api/auth/login`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error.message);
    // Démarrer quand même le serveur pour le calculateur
    app.listen(PORT, () => {
      console.log(`\n⚠️  Serveur démarré avec des avertissements sur le port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  }
};

startServer();
