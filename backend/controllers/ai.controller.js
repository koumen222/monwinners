const OpenAI = require('openai');

exports.getRecommendations = async (req, res) => {
  try {
    const { resultats } = req.body;

    // Vérifier que les résultats sont fournis
    if (!resultats) {
      return res.status(400).json({
        success: false,
        message: "Les résultats du calculateur sont requis. Veuillez d'abord effectuer un calcul."
      });
    }

    // Vérifier que les résultats contiennent au moins les champs essentiels
    // Accepter soit les nouveaux champs, soit les anciens pour compatibilité
    const hasNewFormat = resultats.nombreProduits !== undefined && resultats.prixAchat !== undefined && resultats.beneficeTotal !== undefined;
    const hasOldFormat = resultats.benefice !== undefined && resultats.ventesTotal !== undefined;
    
    if (!hasNewFormat && !hasOldFormat) {
      return res.status(400).json({
        success: false,
        message: "Les résultats du calcul sont incomplets. Veuillez d'abord effectuer un calcul complet."
      });
    }

    // Vérifier que la clé API OpenAI est configurée
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans votre fichier .env du dossier backend"
      });
    }

    // Initialiser OpenAI (après vérification de la clé)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Construire le prompt pour ChatGPT avec les données disponibles
    let promptData = '';
    
    if (hasNewFormat) {
      // Nouveau format
      promptData = `
- Nombre de produits à acheter : ${resultats.nombreProduits || 'N/A'}
- Prix d'achat unitaire : ${resultats.prixAchat || 'N/A'} FCFA
- Prix de revente unitaire : ${resultats.prixRevente || 'N/A'} FCFA
- Budget publicitaire : ${resultats.budgetPub || 'N/A'} FCFA
- Budget produits : ${resultats.budgetProduits || 'N/A'} FCFA
- Bénéfice total : ${resultats.beneficeTotal || 'N/A'} FCFA
- Bénéfice par jour : ${resultats.beneficeParJour || 'N/A'} FCFA
- Marge bénéficiaire : ${resultats.margeBenefice || 'N/A'} FCFA (${resultats.pourcentageMarge || 'N/A'}%)
- Nombre de ventes par jour : ${resultats.nombreVentesParJour || 'N/A'} produits
- Période : ${resultats.periode || 'N/A'} jours
- Niveau de confiance pub : ${resultats.niveauConfiance || 'N/A'}`;
    } else {
      // Ancien format (pour compatibilité)
      promptData = `
- Bénéfice : ${resultats.benefice || 'N/A'} FCFA
- Ventes totales : ${resultats.ventesTotal || 'N/A'} FCFA
- Ventes par jour : ${resultats.ventesParJour || 'N/A'} FCFA
- Dépenses totales : ${resultats.depensesTotal || 'N/A'} FCFA
- Dépenses par jour : ${resultats.depensesParJour || 'N/A'} FCFA
${resultats.nombreJours ? `- Période : ${resultats.nombreJours} jours` : ''}`;
    }

    const prompt = `PROMPT ULTRA-AVANCÉ – PRODUCT RESEARCH B2C AFRIQUE (STYLE MINEA)

Rôle :

Tu es un expert senior en product research B2C pour le marché africain, utilisant une méthodologie data-driven inspirée de Minea, Facebook Ads Library, TikTok Creative Center et Google Trends.

Objectif :

Identifier des produits B2C à TRÈS FORT potentiel de vente en Afrique, validés par des signaux publicitaires réels (ads actives, scaling, engagement, répétition par plusieurs annonceurs).

Marché ciblé :

Afrique (priorité : Afrique de l'Ouest & du Nord)
Modèle : B2C uniquement
Canaux : Facebook / Instagram / TikTok Ads
Paiement : Cash on Delivery friendly

Données financières à respecter ABSOLUMENT pour chaque produit :
${promptData}

📌 NICHES À ANALYSER (OBLIGATOIRE)

Analyse 5 niches, avec 2 produits par niche (10 produits au total) :

1) Gadgets & accessoires pratiques (2 produits)
2) Maison & organisation (2 produits)
3) Cuisine & ustensiles intelligents (2 produits)
4) Beauté & soin personnel (non médical) (2 produits)
5) Santé & bien-être (non médical, sans promesses interdites) (2 produits)

🔍 MÉTHODOLOGIE TYPE MINEA (À RESPECTER)

Pour CHAQUE produit, base-toi sur des signaux simulés réalistes :

- Nombre d'ads actives (7 / 14 / 30 jours)
- Durée moyenne de diffusion des ads
- Engagement moyen (likes, commentaires, partages)
- Nombre d'annonceurs différents
- Plateforme dominante (FB / IG / TikTok)
- Type de créatif (UGC, démonstration, avant/après soft)
- Niveau de saturation réel

IMPORTANT : Chaque produit doit respecter les contraintes de prix :
- Prix d'achat estimé : proche de ${resultats.prixAchat} FCFA (±12%)
- Prix de revente estimé : proche de ${resultats.prixRevente} FCFA (±12%)
- Marge estimée : proche de ${resultats.pourcentageMarge}% (±5%)

🧠 STRUCTURE À PRODUIRE

Produis UNIQUEMENT un JSON strict (pas de markdown, pas de texte supplémentaire) avec la structure suivante :

{
  "niches": [
    {
      "nomNiche": "Nom de la niche",
      "produits": [
        {
          "nom": "Produit exact, trouvable sur Alibaba/AliExpress",
          "problemeClient": "Problème client clair (1 phrase)",
          "type": "Winner | Scaling | Evergreen",
          "adsActives7j": "ex: 12",
          "adsActives14j": "ex: 24",
          "adsActives30j": "ex: 45",
          "dureeMoyenneDiffusion": "ex: 15 jours",
          "engagementMoyen": "ex: 850/120/95",
          "annonceurs": "ex: 6",
          "plateformePrincipale": "FB | IG | TikTok",
          "typeCreatif": "UGC | Démo | Avant/Après soft",
          "saturation": "faible | moyen | élevé",
          "paysCibles": ["pays africains adaptés"],

          "prixPsychologique": "fourchette acceptée en FCFA (ex: 5000-7000 FCFA)",
          "faciliteLivraison": "faible | moyen | élevé",
          "risqueRetour": "faible | moyen | élevé",
          "niveauComprehension": "simple | moyen | complexe",

          "score": {
            "potentielVente": 0-10,
            "faciliteScaling": 0-10,
            "compatibiliteAfrique": 0-10,
            "dureeDeVieProduit": 0-10
          },

          "prixAchatEstime": "proche de ${resultats.prixAchat} FCFA (±12%)",
          "prixReventeEstime": "proche de ${resultats.prixRevente} FCFA (±12%)",
          "margeEstimee": "proche de ${resultats.pourcentageMarge}% (±5%)"
        }
      ]
    }
  ],
  "top5": [
    {
      "nom": "Nom du produit",
      "niche": "Sa niche",
      "raison": "Pourquoi il performe (signaux data concrets)",
      "angle": "Hook publicitaire gagnant",
      "creatif": "Type de créatif recommandé",
      "erreursAEviter": "Erreurs courantes à éviter en Afrique pour ce produit"
    }
  ]
}

RÈGLES STRICTES :
1. EXACTEMENT 10 produits (2 par niche)
2. Chaque produit doit avoir tous les champs ci-dessus
3. Les prix doivent correspondre aux contraintes financières fournies
4. Les produits doivent être réalistes et vendables en Afrique
5. Zéro théorie, uniquement des produits actionnables
6. Format JSON PUR sans texte autour`;

    // Schéma JSON corrigé avec additionalProperties au niveau racine
    const responseSchema = {
      name: "RecommandationsProduits",
      strict: true,
      schema: {
        type: "object",
        additionalProperties: false, // AJOUTÉ : manquait au niveau racine
        properties: {
          niches: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                nomNiche: { type: "string" },
                produits: {
                  type: "array",
                  minItems: 2,
                  maxItems: 2,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      nom: { type: "string", maxLength: 80 },
                      problemeClient: { type: "string", maxLength: 120 },
                      type: { type: "string", maxLength: 20 },
                      adsActives7j: { type: "number", minimum: 0, maximum: 999 },
                      adsActives30j: { type: "number", minimum: 0, maximum: 999 },
                      plateformePrincipale: { type: "string", maxLength: 20 },
                      saturation: { type: "string", maxLength: 10 },
                      paysCibles: { 
                        type: "array", 
                        items: { type: "string", maxLength: 24 },
                        minItems: 2,
                        maxItems: 4
                      },
                      prixPsychologique: { type: "string", maxLength: 30 },
                      score: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          potentielVente: { type: "number", minimum: 0, maximum: 10 },
                          faciliteScaling: { type: "number", minimum: 0, maximum: 10 },
                          compatibiliteAfrique: { type: "number", minimum: 0, maximum: 10 },
                          dureeDeVieProduit: { type: "number", minimum: 0, maximum: 10 }
                        },
                        required: ["potentielVente", "faciliteScaling", "compatibiliteAfrique", "dureeDeVieProduit"]
                      },
                      prixAchatEstime: { type: "string", maxLength: 20 },
                      prixReventeEstime: { type: "string", maxLength: 20 },
                      margeEstimee: { type: "string", maxLength: 12 }
                    },
                    required: [
                      "nom",
                      "problemeClient",
                      "type",
                      "adsActives7j",
                      "adsActives30j",
                      "plateformePrincipale",
                      "saturation",
                      "paysCibles",
                      "prixPsychologique",
                      "score",
                      "prixAchatEstime",
                      "prixReventeEstime",
                      "margeEstimee"
                    ]
                  }
                }
              },
              required: ["nomNiche", "produits"]
            }
          },
          top5: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                nom: { type: "string", maxLength: 80 },
                niche: { type: "string", maxLength: 40 },
                raison: { type: "string", maxLength: 160 },
                angle: { type: "string", maxLength: 120 },
                creatif: { type: "string", maxLength: 60 },
                erreursAEviter: { type: "string", maxLength: 140 }
              },
              required: ["nom", "niche", "raison", "angle", "creatif", "erreursAEviter"]
            }
          }
        },
        required: ["niches", "top5"]
      }
    };

    // Appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es un expert senior en product research B2C pour le marché africain. 
                    Tu utilises une méthodologie data-driven basée sur les signaux publicitaires réels. 
                    Tu es spécialisé dans l'identification de produits gagnants pour Facebook/Instagram/TikTok Ads. 
                    Tu réponds UNIQUEMENT en JSON pur, strictement selon le schéma fourni, sans aucun texte supplémentaire.
                    
                    IMPORTANT : 
                    - Produis EXACTEMENT 10 produits (2 par niche)
                    - Respecte les contraintes de prix : achat ~${resultats.prixAchat} FCFA, revente ~${resultats.prixRevente} FCFA
                    - Sois réaliste pour le marché africain
                    - Simule des données de type Minea (ads actives, engagement, saturation)
                    - Les notes de score doivent être entre 0 et 10
                    - Réponses courtes : pas de paragraphes, pas de guillemets dans les valeurs, pas de retours à la ligne dans les strings`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 3500,
      response_format: {
        type: "json_schema",
        json_schema: responseSchema
      }
    });

    // Extraire la réponse
    const responseContent = completion.choices[0].message.content;

    // Essayer de parser le JSON de la réponse
    let produitsRecommandes;
    try {
      produitsRecommandes = JSON.parse(responseContent);
      
      // Validation basique de la structure
      if (!produitsRecommandes.niches || !Array.isArray(produitsRecommandes.niches)) {
        throw new Error("Structure de réponse invalide - 'niches' manquant ou incorrect");
      }
      
      // Vérifier qu'on a bien 5 niches
      if (produitsRecommandes.niches.length !== 5) {
        console.warn(`Attention: ${produitsRecommandes.niches.length} niches au lieu de 5`);
      }
      
      // Vérifier qu'on a bien des produits
      const totalProduits = produitsRecommandes.niches.reduce((total, niche) => {
        return total + (niche.produits ? niche.produits.length : 0);
      }, 0);
      
      if (totalProduits === 0) {
        throw new Error("Aucun produit retourné");
      }
      
      // Vérifier qu'on a bien environ 10 produits
      if (totalProduits < 8) {
        console.warn(`Attention: seulement ${totalProduits} produits (attendu: 10)`);
      }
      
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      
      // En cas d'erreur, essayer d'extraire le JSON si présent dans du texte
      try {
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          produitsRecommandes = JSON.parse(jsonMatch[0]);
          console.log('JSON récupéré après extraction du texte');
        } else {
          throw new Error("Aucun JSON trouvé dans la réponse");
        }
      } catch (secondError) {
        console.error('Erreur récupération JSON:', secondError);
        return res.status(502).json({
          success: false,
          message: "Impossible de parser la réponse OpenAI (JSON tronqué ou invalide). Réessayez.",
          detail: secondError.message || parseError.message || "Parse error",
          raw: responseContent?.substring(0, 800) || ""
        });
      }
    }

    // Calculer le nombre total de produits
    const totalProduits = produitsRecommandes.niches.reduce((total, niche) => {
      return total + (niche.produits ? niche.produits.length : 0);
    }, 0);

    res.status(200).json({
      success: true,
      resultats: resultats,
      recommandations: produitsRecommandes,
      meta: {
        totalProduits: totalProduits,
        totalNiches: produitsRecommandes.niches ? produitsRecommandes.niches.length : 0,
        hasTop5: !!(produitsRecommandes.top5 && produitsRecommandes.top5.length > 0),
        produitsParNiche: produitsRecommandes.niches ? produitsRecommandes.niches.map(n => n.produits.length) : []
      }
    });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    
    // Gestion spécifique des erreurs d'API OpenAI
    if (error.status === 400) {
      if (error.error && error.error.code === 'invalid_schema') {
        return res.status(400).json({
          success: false,
          message: "Erreur de configuration du schéma JSON",
          detail: error.error.message || "Le schéma de réponse JSON est invalide"
        });
      } else if (error.error && error.error.type === 'invalid_request_error') {
        return res.status(400).json({
          success: false,
          message: "Requête invalide vers OpenAI",
          detail: error.error.message || "Vérifiez les paramètres de la requête"
        });
      }
    }
    
    // Gestion des erreurs de quota ou d'authentification
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Quota API dépassé",
        detail: "Vous avez dépassé votre quota d'appels à l'API OpenAI. Veuillez réessayer plus tard."
      });
    }
    
    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Clé API OpenAI invalide",
        detail: "Vérifiez que votre clé API est correcte et valide."
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Erreur lors de la génération des recommandations"
    });
  }
};