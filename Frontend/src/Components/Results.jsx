import React, { useState } from 'react';
import axios from '../services/api';
import ProduitsModal from './ProduitsModal';
import './Results.css';

const Results = ({ resultats, error }) => {
  const [recommandations, setRecommandations] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetProducts = async () => {
    if (!resultats) return;

    setIsModalOpen(true);
    setLoadingAI(true);
    setErrorAI('');
    setRecommandations(null);

    try {
      const response = await axios.post('/ai/recommendations', { resultats });
      
      if (response.data.success) {
        const recos = response.data.recommandations;
        setRecommandations(recos);
        // Stockage local pour la page de données
        localStorage.setItem('recommandationsStockees', JSON.stringify(recos));
      } else {
        setErrorAI(response.data.message || 'Erreur lors de la récupération des recommandations');
      }
    } catch (err) {
      console.error('Erreur AI:', err);
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setErrorAI('❌ Impossible de se connecter au serveur.');
      } else {
        const apiMessage = err.response?.data?.message;
        const apiDetail = err.response?.data?.detail;
        // 502: parsing/troncature OpenAI → message actionnable
        if (err.response?.status === 502) {
          setErrorAI(apiDetail ? `${apiMessage}\n${apiDetail}` : (apiMessage || 'Réponse IA invalide. Réessayez.'));
        } else {
          setErrorAI(apiMessage || err.message || 'Erreur lors de la récupération des recommandations');
        }
      }
    } finally {
      setLoadingAI(false);
    }
  };

  // Fonction helper pour formater les nombres en toute sécurité
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) return '0.00';
    return parseFloat(value).toFixed(decimals);
  };

  if (error) {
    return (
      <div className="results-wrapper">
        <div className="error-message">
          <p className="error-title">⚠️ Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!resultats) {
    return (
      <div className="results-wrapper">
        <div className="results-placeholder">
          <p>📊 Les résultats apparaîtront ici après le calcul</p>
        </div>
      </div>
    );
  }

  // Vérification que resultats est un objet valide
  if (typeof resultats !== 'object' || resultats === null) {
    return (
      <div className="results-wrapper">
        <div className="error-message">
          <p className="error-title">⚠️ Erreur</p>
          <p>Format de données invalide</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-wrapper">
      <div className="results-container">
        <h2 className="results-title">📊 Résultats du calcul</h2>
        <div className="results-content">
          <div className="result-item highlight">
            <strong>🛍️ Nombre de produits à acheter :</strong>
            <span className="result-value">{resultats.nombreProduits || 0} produits</span>
          </div>
          <div className="result-item highlight">
            <strong>💰 Prix d'achat (unitaire) :</strong>
            <span className="result-value">{formatNumber(resultats.prixAchat)} FCFA</span>
          </div>
          <div className="result-item highlight">
            <strong>💵 Prix de revente (unitaire) :</strong>
            <span className="result-value">{formatNumber(resultats.prixRevente)} FCFA</span>
          </div>
          <div className="result-item highlight">
            <strong>📢 Budget publicitaire :</strong>
            <span className="result-value">{formatNumber(resultats.budgetPub)} FCFA ({resultats.pourcentagePub || 0}%)</span>
          </div>
          <div className="result-item">
            <strong>💼 Budget produits :</strong>
            <span className="result-value">{formatNumber(resultats.budgetProduits)} FCFA</span>
          </div>
          <div className="result-item">
            <strong>📈 Bénéfice total :</strong>
            <span className="result-value">{formatNumber(resultats.beneficeTotal)} FCFA</span>
          </div>
          <div className="result-item">
            <strong>📊 Bénéfice / jour :</strong>
            <span className="result-value">{formatNumber(resultats.beneficeParJour)} FCFA</span>
          </div>
          <div className="result-item">
            <strong>💹 Marge bénéficiaire (unitaire) :</strong>
            <span className="result-value">{formatNumber(resultats.margeBenefice)} FCFA ({formatNumber(resultats.pourcentageMarge)}%)</span>
          </div>
          <div className="result-item">
            <strong>📅 Budget pub / jour :</strong>
            <span className="result-value">{formatNumber(resultats.budgetPubParJour)} FCFA</span>
          </div>
          <div className="result-item">
            <strong>🛒 Ventes / jour (montant) :</strong>
            <span className="result-value">{formatNumber(resultats.ventesParJour)} FCFA</span>
          </div>
          <div className="result-item highlight">
            <strong>📦 Nombre de ventes / jour :</strong>
            <span className="result-value">{formatNumber(resultats.nombreVentesParJour)} produits</span>
          </div>
          <div className="result-item">
            <strong>⏱️ Période :</strong>
            <span className="result-value">{resultats.periode || 0} jours</span>
          </div>
          <div className="result-item">
            <strong>🎯 Niveau de confiance :</strong>
            <span className="result-value">
              {resultats.niveauConfiance 
                ? resultats.niveauConfiance.charAt(0).toUpperCase() + resultats.niveauConfiance.slice(1)
                : 'Moyen'}
            </span>
          </div>
        </div>

        <button
          onClick={handleGetProducts}
          disabled={loadingAI && isModalOpen}
          className="products-button"
        >
          🤖 Voir les produits recommandés
        </button>
      </div>

      {/* Modal pour afficher les produits */}
      <ProduitsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recommandations={recommandations}
        loading={loadingAI}
        error={errorAI}
      />
    </div>
  );
};

export default Results;
