# 🧪 Guide de Test - Système de Recommandation de Produits

## Prérequis

✅ Backend lancé (`npm start` dans le dossier backend)
✅ Frontend lancé (`npm run dev` dans le dossier Frontend)
✅ Clé OpenAI configurée dans `.env`

## Test 1 : Petit Budget

### Étape 1 : Faire un calcul
```
Budget total : 30 000 FCFA
Revenu souhaité : 60 000 FCFA
Période : 30 jours
Confiance pub : Moyen
```

### Étape 2 : Résultats attendus
- Prix d'achat : ~3 000 FCFA
- Prix de revente : ~9 000 FCFA
- Nombre de produits : ~9

### Étape 3 : Cliquer sur "🤖 Voir les produits recommandés"

### Étape 4 : Vérifier la modal
✅ Modal s'ouvre avec animation
✅ Affiche "🔍 Analyse en cours par l'IA..."
✅ Après 3-5 secondes, affiche 5-10 produits
✅ Chaque produit a :
   - Numéro (#1, #2, etc.)
   - Nom du produit
   - Badge de marge (%)
   - Badge de niche
   - Description
   - Raison de recommandation
   - Prix d'achat (~3 000 FCFA)
   - Prix de revente (~9 000 FCFA)

### Produits attendus (exemples)
- Lunettes anti-lumière bleue
- Ceinture sans boucle
- Gourde intelligente
- Bavoir silicone
- Bandes élastiques fitness

---

## Test 2 : Budget Moyen

### Étape 1 : Faire un calcul
```
Budget total : 100 000 FCFA
Revenu souhaité : 200 000 FCFA
Période : 30 jours
Confiance pub : Élevé
```

### Étape 2 : Résultats attendus
- Prix d'achat : ~10 000 FCFA
- Prix de revente : ~30 000 FCFA
- Nombre de produits : ~9

### Étape 3 : Produits attendus (exemples)
- Lampe LED flottante
- Humidificateur flamme
- Montre connectée
- Écouteurs sans fil
- Pistolet de massage

---

## Test 3 : Gros Budget

### Étape 1 : Faire un calcul
```
Budget total : 300 000 FCFA
Revenu souhaité : 600 000 FCFA
Période : 30 jours
Confiance pub : Élevé
```

### Étape 2 : Résultats attendus
- Prix d'achat : ~30 000 FCFA
- Prix de revente : ~90 000 FCFA
- Nombre de produits : ~9

### Étape 3 : Produits attendus (exemples)
- Mini projecteur portable
- Drone avec caméra
- Robot aspirateur
- Imprimante 3D mini
- Console de jeu portable

---

## Test 4 : Fermeture de la Modal

### Actions à tester
✅ Cliquer sur le bouton "✕" en haut à droite
✅ Cliquer sur le bouton "Fermer" en bas
✅ Cliquer en dehors de la modal (sur l'overlay)
✅ Appuyer sur la touche "Escape"

**Résultat attendu :** Modal se ferme avec animation

---

## Test 5 : Gestion des Erreurs

### Test 5.1 : Pas de clé OpenAI
1. Supprimer `OPENAI_API_KEY` du `.env`
2. Redémarrer le backend
3. Faire un calcul et cliquer sur "Voir les produits"

**Résultat attendu :**
```
⚠️ Clé API OpenAI non configurée. 
Ajoutez OPENAI_API_KEY dans votre fichier .env
```

### Test 5.2 : Backend arrêté
1. Arrêter le backend
2. Faire un calcul et cliquer sur "Voir les produits"

**Résultat attendu :**
```
❌ Impossible de se connecter au serveur.
```

---

## Test 6 : Responsive Design

### Desktop (>1024px)
✅ Modal centrée, max-width 900px
✅ Produits en grille 2-3 colonnes

### Tablet (768px - 1024px)
✅ Modal adaptée
✅ Produits en grille 2 colonnes

### Mobile (<768px)
✅ Modal plein écran (avec marges)
✅ Produits en 1 colonne
✅ Boutons tactiles faciles à cliquer

---

## Checklist Finale

- [ ] Modal s'ouvre correctement
- [ ] Animation de chargement visible
- [ ] Produits affichés avec toutes les infos
- [ ] Prix correspondent au calcul (±10%)
- [ ] Niches variées
- [ ] Descriptions pertinentes
- [ ] Modal se ferme correctement
- [ ] Pas d'erreurs dans la console
- [ ] Design responsive
- [ ] Scroll fonctionne si beaucoup de produits

---

## 🐛 Problèmes connus

### Problème : "Erreur lors de la communication avec ChatGPT"
**Solution :** Vérifier la clé API OpenAI et le crédit disponible

### Problème : Produits ne correspondent pas aux prix
**Solution :** L'IA peut avoir une marge d'erreur de ±10%, c'est normal

### Problème : Temps de chargement long (>10 secondes)
**Solution :** Normal, l'API OpenAI peut prendre du temps. Patienter.

---

## 📝 Notes

- L'IA génère des produits **différents** à chaque fois
- Les prix peuvent varier légèrement (±10%)
- Plus le budget est élevé, plus les produits sont premium
- L'IA prend en compte les tendances actuelles du marché

