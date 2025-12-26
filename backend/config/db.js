const mongoose = require('mongoose');

const connectDB = async () => {
  // Si MONGODB_URI n'est pas défini, on saute la connexion (pour le calculateur qui n'en a pas besoin)
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.log('⚠ MongoDB non configuré - Le serveur démarre sans base de données');
    console.log('   (Le calculateur fonctionne sans MongoDB)');
    return;
  }
  
  try {
    console.log('Tentative de connexion à MongoDB...');
    console.log(`URI: ${mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`); // Masque les credentials si présents
    
    await mongoose.connect(mongoURI, {
      // Options pour Mongoose 9.x
    });
    
    console.log(`✓ MongoDB connecté avec succès`);
    console.log(`  - Host: ${mongoose.connection.host}`);
    console.log(`  - Port: ${mongoose.connection.port}`);
    console.log(`  - Base de données: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('✗ Erreur de connexion à MongoDB:');
    console.error(`  - Message: ${error.message}`);
    console.error(`  - URI utilisée: ${mongoURI}`);
    console.error('\n⚠ Le serveur démarre quand même (MongoDB optionnel pour le calculateur)');
    console.error('   Vérifiez que MongoDB est démarré si vous utilisez l\'authentification.');
    // Ne pas lancer l'erreur - permettre au serveur de démarrer quand même
  }
};

module.exports = connectDB;
