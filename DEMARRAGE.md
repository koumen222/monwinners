# 🚀 Guide de démarrage rapide

## ⚠️ IMPORTANT : Démarrer le backend AVANT le frontend

### Étape 1 : Démarrer le backend

Ouvrez un **premier terminal** et exécutez :

```bash
cd "C:\Users\Morgan\Desktop\Calclateur ecom"
npm start
```

Vous devriez voir :
```
✅ Serveur Express démarré avec succès!
📡 Serveur lancé sur le port 5000
🌐 http://localhost:5000
```

**⚠️ Ne fermez PAS ce terminal !** Le serveur doit rester en cours d'exécution.

### Étape 2 : Démarrer le frontend

Ouvrez un **deuxième terminal** et exécutez :

```bash
cd "C:\Users\Morgan\Desktop\Calclateur ecom\Frontend"
npm run dev
```

### Étape 3 : Tester la connexion

1. Ouvrez votre navigateur sur `http://localhost:5173` (ou le port affiché par Vite)
2. Remplissez le formulaire de calcul
3. Cliquez sur "Calculer"

## 🔧 Vérification que le serveur fonctionne

Testez dans votre navigateur :
```
http://localhost:5000/api/health
```

Vous devriez voir :
```json
{
  "success": true,
  "message": "Serveur opérationnel",
  "timestamp": "..."
}
```

## ❌ Si vous voyez "Failed to fetch"

Cela signifie que le backend n'est pas démarré. Vérifiez :
1. ✅ Le terminal du backend est ouvert et affiche "Serveur lancé sur le port 5000"
2. ✅ Aucune erreur dans le terminal du backend
3. ✅ Le port 5000 n'est pas utilisé par un autre programme

## 📝 Notes

- **MongoDB n'est PAS requis** pour le calculateur
- Le serveur démarre même sans MongoDB
- MongoDB est nécessaire uniquement pour l'authentification (register/login)

