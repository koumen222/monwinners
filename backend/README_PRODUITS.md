# Système de Recommandation de Produits

## Comment ça fonctionne

Le système recommande des produits **dynamiquement** en fonction des résultats du calculateur :

### 1. L'utilisateur fait un calcul
- Budget total : 50 000 FCFA
- Revenu souhaité : 100 000 FCFA
- Période : 30 jours

### 2. Le calculateur retourne
- Prix d'achat unitaire : **8 500 FCFA**
- Prix de revente unitaire : **25 000 FCFA**
- Marge : **194%**
- Nombre de produits : 5

### 3. L'IA recommande des produits
Quand l'utilisateur clique sur "Voir les produits recommandés", l'IA (ChatGPT) analyse les résultats et recommande des produits réels qui correspondent exactement aux prix calculés.

**Exemple de recommandations :**
- Lampe LED Flottante (8 000 → 25 000 FCFA)
- Montre Connectée (7 500 → 23 000 FCFA)
- Écouteurs Bluetooth (8 200 → 24 500 FCFA)
- etc.

## Avantages de cette approche

✅ **Personnalisé** : Chaque utilisateur reçoit des recommandations adaptées à son budget
✅ **Dynamique** : Les produits changent selon les calculs
✅ **Intelligent** : L'IA suggère des produits réels et vendables
✅ **Pas de base de données** : Pas besoin de maintenir une liste de produits
✅ **Toujours à jour** : L'IA connaît les tendances actuelles du marché

## Configuration requise

Dans le fichier `.env` du backend :
```
OPENAI_API_KEY=votre_clé_api_openai
```

## Test

1. Lancez le backend : `npm start` (dans le dossier backend)
2. Lancez le frontend : `npm run dev` (dans le dossier Frontend)
3. Faites un calcul avec le calculateur
4. Cliquez sur "🤖 Voir les produits recommandés"
5. Une modal s'ouvre avec 5-10 produits adaptés à vos prix !

## Format de réponse de l'IA

```json
{
  "produits": [
    {
      "nom": "Lampe LED Flottante",
      "description": "Lampe magnétique lévitante design futuriste",
      "niche": "Maison & Déco",
      "raison": "Prix d'achat de 8000 FCFA correspond parfaitement au budget calculé",
      "margeEstimee": "212%",
      "prixAchatEstime": "8 000 FCFA",
      "prixReventeEstime": "25 000 FCFA"
    }
  ]
}
```

