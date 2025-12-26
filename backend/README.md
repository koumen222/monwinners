# Guide de démarrage du Backend

## Démarrage rapide (sans MongoDB)

Le serveur peut maintenant démarrer **sans MongoDB** pour utiliser le calculateur.

### 1. Installer les dépendances (si pas déjà fait)

```bash
npm install
```

### 2. Démarrer le serveur

Depuis la racine du projet :
```bash
npm start
```

Ou depuis le dossier backend :
```bash
cd backend
node server.js
```

### 3. Vérifier que le serveur fonctionne

Vous devriez voir :
```
✅ Serveur Express démarré avec succès!
📡 Serveur lancé sur le port 5000
🌐 http://localhost:5000
```

## Configuration optionnelle

### Avec MongoDB (pour l'authentification)

Créez un fichier `.env` dans le dossier `backend` :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calclateur-ecom
JWT_SECRET=votre_cle_secrete_jwt
OPENAI_API_KEY=sk-votre_cle_openai
```

### Sans MongoDB (pour le calculateur uniquement)

Le serveur fonctionne sans fichier `.env` - MongoDB est optionnel.

## Routes disponibles

- `POST /api/calculator/calculate` - Calculer les résultats
- `POST /api/ai/recommendations` - Obtenir des recommandations IA
- `POST /api/auth/register` - Inscription (nécessite MongoDB)
- `POST /api/auth/login` - Connexion (nécessite MongoDB)

