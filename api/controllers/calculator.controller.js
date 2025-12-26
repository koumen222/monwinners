exports.calculate = async (req, res) => {
  try {
    const { 
      budgetTotal,      // Budget total disponible
      revenuSouhaite,  // Revenu souhaité
      periode,         // Période en jours
      confiance        // Niveau de confiance pub (faible, moyen, élevé)
    } = req.body;

    // Validation des données
    if (!budgetTotal || !revenuSouhaite || !periode) {
      return res.status(400).json({ 
        success: false,
        message: "Budget total, revenu souhaité et période sont requis" 
      });
    }

    const budget = parseFloat(budgetTotal);
    const revenu = parseFloat(revenuSouhaite);
    const jours = parseFloat(periode);
    const niveauConfiance = confiance || 'moyen';

    if (budget <= 0 || revenu <= 0 || jours <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Les valeurs doivent être positives" 
      });
    }

    // Calcul du pourcentage de budget pub selon le niveau de confiance
    let pourcentagePub = 0.2; // 20% par défaut (moyen)
    if (niveauConfiance === 'faible') {
      pourcentagePub = 0.1; // 10%
    } else if (niveauConfiance === 'élevé') {
      pourcentagePub = 0.3; // 30%
    }

    // Calcul du budget pub
    const budgetPub = budget * pourcentagePub;
    const budgetProduits = budget - budgetPub;

    // Prix d'achat aléatoire entre 2000 et 6000 FCFA
    const prixAchatMin = 2000;
    const prixAchatMax = 6000;
    const prixAchat = Math.floor(Math.random() * (prixAchatMax - prixAchatMin + 1)) + prixAchatMin;

    // Calcul du nombre de produits à acheter
    const nombreProduits = Math.floor(budgetProduits / prixAchat);

    if (nombreProduits <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Le budget est insuffisant pour acheter des produits" 
      });
    }

    // Calcul du prix de revente pour atteindre le revenu souhaité
    const prixRevente = revenu / nombreProduits;

    // Vérification que le prix de revente est supérieur au prix d'achat
    if (prixRevente <= prixAchat) {
      return res.status(400).json({ 
        success: false,
        message: "Le revenu souhaité est trop faible par rapport au budget" 
      });
    }

    // Calculs supplémentaires avec variations aléatoires
    const margeBenefice = prixRevente - prixAchat;
    const beneficeTotal = margeBenefice * nombreProduits;
    const beneficeParJour = beneficeTotal / jours;
    const budgetPubParJour = budgetPub / jours;
    const ventesParJour = (prixRevente * nombreProduits) / jours;
    const nombreVentesParJour = nombreProduits / jours;

    // Ajout de variations aléatoires pour rendre les calculs plus réalistes
    const variation = 0.05; // 5% de variation
    const randomFactor = 1 + (Math.random() * 2 - 1) * variation;

    // Résultats avec variations
    const resultats = {
      // Informations principales
      nombreProduits: nombreProduits,
      prixAchat: parseFloat(prixAchat.toFixed(2)),
      prixRevente: parseFloat((prixRevente * randomFactor).toFixed(2)),
      budgetPub: parseFloat(budgetPub.toFixed(2)),
      budgetProduits: parseFloat(budgetProduits.toFixed(2)),
      
      // Calculs financiers
      beneficeTotal: parseFloat((beneficeTotal * randomFactor).toFixed(2)),
      beneficeParJour: parseFloat((beneficeParJour * randomFactor).toFixed(2)),
      margeBenefice: parseFloat((margeBenefice * randomFactor).toFixed(2)),
      budgetPubParJour: parseFloat(budgetPubParJour.toFixed(2)),
      ventesParJour: parseFloat((ventesParJour * randomFactor).toFixed(2)),
      nombreVentesParJour: parseFloat(nombreVentesParJour.toFixed(2)),
      
      // Informations complémentaires
      periode: jours,
      niveauConfiance: niveauConfiance,
      budgetTotal: parseFloat(budget.toFixed(2)),
      revenuSouhaite: parseFloat(revenu.toFixed(2)),
      
      // Pourcentages
      pourcentageMarge: parseFloat(((margeBenefice / prixAchat) * 100).toFixed(2)),
      pourcentagePub: parseFloat((pourcentagePub * 100).toFixed(1))
    };

    res.status(200).json({
      success: true,
      resultats
    });
  } catch (error) {
    console.error('Erreur dans le calculateur:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: "Erreur lors du calcul" 
    });
  }
};
