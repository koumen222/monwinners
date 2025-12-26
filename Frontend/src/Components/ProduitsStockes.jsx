import React, { useEffect, useState, useCallback } from 'react';
import './ProduitsStockes.css';

// Exemple de données pour pré-remplir la page si besoin
const exempleRecommandations = { "niches": [ { "nomNiche": "Gadgets & accessoires pratiques", "produits": [ { "nom": "Mini aspirateur sans fil", "problemeClient": "Difficulté à nettoyer les petits espaces.", "type": "Winner", "adsActives7j": "25", "adsActives14j": "45", "adsActives30j": "80", "dureeMoyenneDiffusion": "14 jours", "engagementMoyen": "300/25/50", "annonceurs": "10", "plateformePrincipale": "FB | IG", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Nigeria", "Ghana", "Côte d'Ivoire"], "prixPsychologique": "10000 - 12000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "moyen", "niveauComprehension": "simple", "score": { "potentielVente": 8, "faciliteScaling": 7, "compatibiliteAfrique": 9, "dureeDeVieProduit": 8 }, "prixAchatEstime": "4500 FCFA", "prixReventeEstime": "11000 FCFA", "margeEstimee": "144.44%" }, { "nom": "Chargeur solaire portable", "problemeClient": "Besoin d'énergie lors des déplacements.", "type": "Scaling", "adsActives7j": "30", "adsActives14j": "50", "adsActives30j": "90", "dureeMoyenneDiffusion": "20 jours", "engagementMoyen": "400/30/70", "annonceurs": "12", "plateformePrincipale": "FB | TikTok", "typeCreatif": "UGC", "saturation": "moyen", "paysCibles": ["Senegal", "Mali", "Kenya"], "prixPsychologique": "12000 - 15000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 9, "faciliteScaling": 8, "compatibiliteAfrique": 9, "dureeDeVieProduit": 9 }, "prixAchatEstime": "5000 FCFA", "prixReventeEstime": "14000 FCFA", "margeEstimee": "180%" }, { "nom": "Organisateur de câbles", "problemeClient": "Câbles désordonnés et enchevêtrés.", "type": "Evergreen", "adsActives7j": "20", "adsActives14j": "30", "adsActives30j": "60", "dureeMoyenneDiffusion": "10 jours", "engagementMoyen": "250/20/40", "annonceurs": "8", "plateformePrincipale": "IG | FB", "typeCreatif": "Avant/Après soft", "saturation": "faible", "paysCibles": ["Togo", "Burkina Faso", "Tunisie"], "prixPsychologique": "5000 - 7000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 7, "faciliteScaling": 6, "compatibiliteAfrique": 8, "dureeDeVieProduit": 7 }, "prixAchatEstime": "4000 FCFA", "prixReventeEstime": "6000 FCFA", "margeEstimee": "50%" }, { "nom": "Lampe LED rechargeable", "problemeClient": "Pannes de courant fréquentes.", "type": "Winner", "adsActives7j": "15", "adsActives14j": "35", "adsActives30j": "75", "dureeMoyenneDiffusion": "18 jours", "engagementMoyen": "350/20/60", "annonceurs": "9", "plateformePrincipale": "FB | IG", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Ghana", "Nigeria", "Côte d'Ivoire"], "prixPsychologique": "8000 - 10000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "moyen", "niveauComprehension": "simple", "score": { "potentielVente": 8, "faciliteScaling": 7, "compatibiliteAfrique": 9, "dureeDeVieProduit": 8 }, "prixAchatEstime": "4500 FCFA", "prixReventeEstime": "9000 FCFA", "margeEstimee": "100%" }, { "nom": "Support de téléphone flexible", "problemeClient": "Difficulté à tenir le téléphone lors de la visualisation.", "type": "Scaling", "adsActives7j": "10", "adsActives14j": "20", "adsActives30j": "50", "dureeMoyenneDiffusion": "12 jours", "engagementMoyen": "200/15/30", "annonceurs": "6", "plateformePrincipale": "IG | TikTok", "typeCreatif": "UGC", "saturation": "moyen", "paysCibles": ["Kenya", "Uganda", "Tanzanie"], "prixPsychologique": "3000 - 5000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 6, "faciliteScaling": 7, "compatibiliteAfrique": 8, "dureeDeVieProduit": 6 }, "prixAchatEstime": "2000 FCFA", "prixReventeEstime": "4500 FCFA", "margeEstimee": "125%" }, { "nom": "Bouteille d'eau pliable", "problemeClient": "Difficulté à transporter des bouteilles en voyage.", "type": "Evergreen", "adsActives7j": "20", "adsActives14j": "30", "adsActives30j": "40", "dureeMoyenneDiffusion": "15 jours", "engagementMoyen": "150/10/20", "annonceurs": "5", "plateformePrincipale": "FB | IG", "typeCreatif": "Avant/Après soft", "saturation": "faible", "paysCibles": ["Nigeria", "Ghana", "Côte d'Ivoire"], "prixPsychologique": "4000 - 6000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 5, "faciliteScaling": 6, "compatibiliteAfrique": 7, "dureeDeVieProduit": 7 }, "prixAchatEstime": "3500 FCFA", "prixReventeEstime": "5000 FCFA", "margeEstimee": "42.86%" }, { "nom": "Tapis de souris ergonomique", "problemeClient": "Inconfort lors de l'utilisation prolongée d'un ordinateur.", "type": "Winner", "adsActives7j": "18", "adsActives14j": "30", "adsActives30j": "55", "dureeMoyenneDiffusion": "16 jours", "engagementMoyen": "220/15/25", "annonceurs": "7", "plateformePrincipale": "IG | FB", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Tunisie", "Maroc", "Algérie"], "prixPsychologique": "6000 - 8000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 7, "faciliteScaling": 7, "compatibiliteAfrique": 8, "dureeDeVieProduit": 8 }, "prixAchatEstime": "4200 FCFA", "prixReventeEstime": "7500 FCFA", "margeEstimee": "78.57%" }, { "nom": "Coussin de soutien lombaire", "problemeClient": "Douleurs au dos lors de longues assises.", "type": "Scaling", "adsActives7j": "12", "adsActives14j": "22", "adsActives30j": "40", "dureeMoyenneDiffusion": "14 jours", "engagementMoyen": "180/20/10", "annonceurs": "8", "plateformePrincipale": "FB | IG", "typeCreatif": "UGC", "saturation": "moyen", "paysCibles": ["Côte d'Ivoire", "Sénégal", "Ghana"], "prixPsychologique": "7000 - 9000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 6, "faciliteScaling": 6, "compatibiliteAfrique": 8, "dureeDeVieProduit": 7 }, "prixAchatEstime": "3800 FCFA", "prixReventeEstime": "8500 FCFA", "margeEstimee": "123.68%" } ] }, { "nomNiche": "Maison & organisation", "produits": [ { "nom": "Étagère modulable", "problemeClient": "Manque d'espace de rangement.", "type": "Winner", "adsActives7j": "20", "adsActives14j": "40", "adsActives30j": "60", "dureeMoyenneDiffusion": "15 jours", "engagementMoyen": "350/20/30", "annonceurs": "10", "plateformePrincipale": "FB | IG", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Nigeria", "Ghana", "Côte d'Ivoire"], "prixPsychologique": "12000 - 15000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "moyen", "niveauComprehension": "simple", "score": { "potentielVente": 9, "faciliteScaling": 8, "compatibiliteAfrique": 9, "dureeDeVieProduit": 8 }, "prixAchatEstime": "5000 FCFA", "prixReventeEstime": "13000 FCFA", "margeEstimee": "160%" }, { "nom": "Boîte de rangement pliable", "problemeClient": "Difficulté à garder les espaces organisés.", "type": "Scaling", "adsActives7j": "15", "adsActives14j": "25", "adsActives30j": "50", "dureeMoyenneDiffusion": "10 jours", "engagementMoyen": "200/15/25", "annonceurs": "8", "plateformePrincipale": "FB | IG", "typeCreatif": "UGC", "saturation": "faible", "paysCibles": ["Tunisie", "Algérie", "Maroc"], "prixPsychologique": "5000 - 7000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 7, "faciliteScaling": 7, "compatibiliteAfrique": 8, "dureeDeVieProduit": 7 }, "prixAchatEstime": "3500 FCFA", "prixReventeEstime": "6000 FCFA", "margeEstimee": "71.43%" }, { "nom": "Cintres antidérapants", "problemeClient": "Vêtements qui tombent des cintres.", "type": "Evergreen", "adsActives7j": "10", "adsActives14j": "20", "adsActives30j": "30", "dureeMoyenneDiffusion": "12 jours", "engagementMoyen": "150/10/15", "annonceurs": "5", "plateformePrincipale": "IG | FB", "typeCreatif": "Avant/Après soft", "saturation": "moyen", "paysCibles": ["Côte d'Ivoire", "Ghana", "Nigeria"], "prixPsychologique": "3000 - 5000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 6, "faciliteScaling": 5, "compatibiliteAfrique": 7, "dureeDeVieProduit": 6 }, "prixAchatEstime": "2000 FCFA", "prixReventeEstime": "4500 FCFA", "margeEstimee": "125%" }, { "nom": "Tapis de bain antidérapant", "problemeClient": "Chutes fréquentes dans la salle de bain.", "type": "Winner", "adsActives7j": "18", "adsActives14j": "30", "adsActives30j": "60", "dureeMoyenneDiffusion": "10 jours", "engagementMoyen": "220/30/40", "annonceurs": "7", "plateformePrincipale": "FB | IG", "typeCreatif": "UGC", "saturation": "faible", "paysCibles": ["Côte d'Ivoire", "Nigeria", "Ghana"], "prixPsychologique": "5000 - 8000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 8, "faciliteScaling": 7, "compatibiliteAfrique": 9, "dureeDeVieProduit": 8 }, "prixAchatEstime": "4000 FCFA", "prixReventeEstime": "7000 FCFA", "margeEstimee": "75%" }, { "nom": "Porte-manteau mural", "problemeClient": "Manque d'espace pour accrocher des vêtements.", "type": "Scaling", "adsActives7j": "16", "adsActives14j": "28", "adsActives30j": "50", "dureeMoyenneDiffusion": "14 jours", "engagementMoyen": "180/15/20", "annonceurs": "6", "plateformePrincipale": "FB | IG", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Tunisie", "Maroc", "Algérie"], "prixPsychologique": "8000 - 10000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "moyen", "niveauComprehension": "simple", "score": { "potentielVente": 7, "faciliteScaling": 6, "compatibiliteAfrique": 8, "dureeDeVieProduit": 7 }, "prixAchatEstime": "4500 FCFA", "prixReventeEstime": "9000 FCFA", "margeEstimee": "100%" }, { "nom": "Panier à linge pliable", "problemeClient": "Difficulté à ranger le linge sale.", "type": "Evergreen", "adsActives7j": "12", "adsActives14j": "20", "adsActives30j": "35", "dureeMoyenneDiffusion": "12 jours", "engagementMoyen": "160/12/18", "annonceurs": "5", "plateformePrincipale": "FB | IG", "typeCreatif": "Avant/Après soft", "saturation": "faible", "paysCibles": ["Côte d'Ivoire", "Sénégal", "Ghana"], "prixPsychologique": "4000 - 6000 FCFA", "faciliteLivraison": "élevé", "risqueRetour": "faible", "niveauComprehension": "simple", "score": { "potentielVente": 6, "faciliteScaling": 6, "compatibiliteAfrique": 7, "dureeDeVieProduit": 7 }, "prixAchatEstime": "3200 FCFA", "prixReventeEstime": "5200 FCFA", "margeEstimee": "62.5%" }, { "nom": "Organisateur de placard extensible", "problemeClient": "Espace limité dans les placards.", "type": "Scaling", "adsActives7j": "14", "adsActives14j": "24", "adsActives30j": "45", "dureeMoyenneDiffusion": "16 jours", "engagementMoyen": "190/14/22", "annonceurs": "6", "plateformePrincipale": "FB | IG", "typeCreatif": "Démo", "saturation": "moyen", "paysCibles": ["Nigeria", "Ghana", "Côte d'Ivoire"], "prixPsychologique": "9000 - 12000 FCFA", "faciliteLivraison": "moyen", "risqueRetour": "moyen", "niveauComprehension": "simple", "score": { "potentielVente": 7, "faciliteScaling": 6, "compatibiliteAfrique": 8, "dureeDeVieProduit": 7 }, "prixAchatEstime": "4800 FCFA", "prixReventeEstime": "10000 FCFA", "margeEstimee": "108.33%" } ] } ] };

const ProduitsStockes = () => {
  const [recommandations, setRecommandations] = useState(null);

  const loadFromStorage = useCallback(() => {
    const saved = localStorage.getItem('recommandationsStockees');
    if (saved) {
      try {
        setRecommandations(JSON.parse(saved));
      } catch (e) {
        console.warn('Impossible de parser les recommandations stockées', e);
      }
    } else {
      setRecommandations(null);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleLoadExample = () => {
    localStorage.setItem('recommandationsStockees', JSON.stringify(exempleRecommandations));
    loadFromStorage();
  };

  const niches = Array.isArray(recommandations?.niches) ? recommandations.niches : [];
  const top5 = Array.isArray(recommandations?.top5) ? recommandations.top5 : [];
  const legacyProduits = Array.isArray(recommandations?.produits) ? recommandations.produits : [];

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h1>📂 Produits sauvegardés</h1>
        <p>Dernières recommandations générées par l'IA</p>
        <div className="saved-actions">
          <button className="btn-secondary" onClick={handleLoadExample}>
            Charger un exemple
          </button>
          <button className="btn-ghost" onClick={() => { localStorage.removeItem('recommandationsStockees'); setRecommandations(null); }}>
            Vider
          </button>
        </div>
      </div>

      {!recommandations && (
        <div className="saved-empty">
          <span className="empty-icon">📦</span>
          <p>Aucune recommandation sauvegardée pour l’instant</p>
        </div>
      )}

      {/* Nouveau format */}
      {niches.length > 0 && (
        <div className="saved-niches">
          {niches.map((niche, idx) => (
            <div key={idx} className="saved-niche-card">
              <div className="saved-niche-header">
                <h3>{niche.nomNiche || 'Niche'}</h3>
                <span>{(niche.produits?.length || 0)} produit{(niche.produits?.length || 0) > 1 ? 's' : ''}</span>
              </div>

              <div className="saved-products-grid">
                {(niche.produits || []).map((p, i) => (
                  <div key={i} className="saved-product">
                    <div className="saved-product-title">
                      <h4>{p.nom}</h4>
                      {p.type && <span className="tag">{p.type}</span>}
                    </div>
                    <p className="saved-product-desc">{p.problemeClient || p.description}</p>
                    <div className="saved-meta">
                      {p.plateformePrincipale && <span>📱 {p.plateformePrincipale}</span>}
                      {p.saturation && <span>🔥 {p.saturation}</span>}
                      {p.annonceurs && <span>🧑‍💼 {p.annonceurs} annonceurs</span>}
                    </div>
                    <div className="saved-prices">
                      <span>💰 Achat: {p.prixAchatEstime || 'N/A'}</span>
                      <span>💵 Revente: {p.prixReventeEstime || 'N/A'}</span>
                      {p.margeEstimee && <span>📈 Marge: {p.margeEstimee}</span>}
                    </div>
                    {p.paysCibles && p.paysCibles.length > 0 && (
                      <div className="saved-extra">🌍 {p.paysCibles.join(', ')}</div>
                    )}
                    {p.score && (
                      <div className="saved-score">
                        <span>⭐ Vente: {p.score.potentielVente}/10</span>
                        <span>🚀 Scaling: {p.score.faciliteScaling}/10</span>
                        <span>🌐 Marché: {p.score.compatibiliteAfrique}/10</span>
                        <span>⏳ Durée: {p.score.dureeDeVieProduit}/10</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {top5.length > 0 && (
        <div className="saved-top5">
          <h3>🏆 Top 5</h3>
          <div className="saved-products-grid">
            {top5.map((item, idx) => (
              <div key={idx} className="saved-product">
                <h4>{item.nom}</h4>
                {item.raison && <p>💡 {item.raison}</p>}
                {item.angle && <p>🎯 {item.angle}</p>}
                {item.creatif && <p>🎬 {item.creatif}</p>}
                {item.erreursAEviter && <p>⚠️ {item.erreursAEviter}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ancien format fallback */}
      {niches.length === 0 && legacyProduits.length > 0 && (
        <div className="saved-niches">
          <div className="saved-niche-card">
            <div className="saved-niche-header">
              <h3>Produits</h3>
              <span>{legacyProduits.length}</span>
            </div>
            <div className="saved-products-grid">
              {legacyProduits.map((p, i) => (
                <div key={i} className="saved-product">
                  <h4>{p.nom}</h4>
                  <p className="saved-product-desc">{p.description}</p>
                  <div className="saved-prices">
                    <span>💰 Achat: {p.prixAchatEstime || 'N/A'}</span>
                    <span>💵 Revente: {p.prixReventeEstime || 'N/A'}</span>
                  </div>
                  {p.raison && <p>💡 {p.raison}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduitsStockes;

