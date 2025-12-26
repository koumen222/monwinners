import React, { useState } from 'react';
import axios from '../services/api';
import Results from './Results';
import './Cal.css';

const Cal = () => {
  const [budget, setBudget] = useState('');
  const [revenu, setRevenu] = useState('');
  const [periode, setPeriode] = useState('');
  const [confiance, setConfiance] = useState('moyen');
  const [loading, setLoading] = useState(false);
  const [resultats, setResultats] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validation côté client
    if (!budget || !revenu || !periode) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const budgetValue = parseFloat(budget);
    const revenuValue = parseFloat(revenu);
    const periodeValue = parseFloat(periode);

    if (budgetValue <= 0 || revenuValue <= 0 || periodeValue <= 0) {
      setError('Tous les champs doivent contenir des valeurs positives');
      return;
    }

    setLoading(true);
    setError('');
    setResultats(null);
    
    try {
      const formData = {
        budgetTotal: budgetValue,
        revenuSouhaite: revenuValue,
        periode: periodeValue,
        confiance: confiance
      };

      const response = await axios.post('/calculator/calculate', formData);
      
      console.log('Réponse du serveur:', response.data);
      
      if (response.data && response.data.success) {
        if (response.data.resultats) {
          setResultats(response.data.resultats);
        } else {
          setError('Les résultats sont vides');
        }
      } else {
        setError(response.data?.message || 'Erreur lors du calcul');
      }
    } catch (err) {
      console.error('Erreur:', err);
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('❌ Impossible de se connecter au serveur. Assurez-vous que le backend est démarré.');
      } else {
        setError(err.response?.data?.message || err.message || 'Erreur lors du calcul');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-layout">
      <div className="calculator-container">
        <h1 className="calculator-title">💰 Calculateur E-commerce</h1>

        <form className="calculator-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="budget">Budget total (FCFA)</label>
          <input
            id="budget"
            type="number"
            step="0.01"
            placeholder="Ex: 50000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="revenu">Revenu souhaité (FCFA)</label>
          <input
            id="revenu"
            type="number"
            step="0.01"
            placeholder="Ex: 100000"
            value={revenu}
            onChange={(e) => setRevenu(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="periode">Période (jours)</label>
          <input
            id="periode"
            type="number"
            placeholder="Ex: 30"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confiance">Niveau de confiance pub</label>
          <select
            id="confiance"
            value={confiance}
            onChange={(e) => setConfiance(e.target.value)}
          >
            <option value="faible">Faible</option>
            <option value="moyen">Moyen</option>
            <option value="élevé">Élevé</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? '⏳ Calcul en cours...' : '🚀 Calculer'}
        </button>
      </form>
      </div>

      <Results resultats={resultats} error={error} />
    </div>
  );
};

export default Cal;
