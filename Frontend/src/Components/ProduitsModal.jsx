import React, { useEffect } from 'react';
import './ProduitsModal.css';

const ProduitsModal = ({ isOpen, onClose, recommandations, loading, error }) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const niches = Array.isArray(recommandations?.niches) ? recommandations.niches : [];
  const top5 = Array.isArray(recommandations?.top5) ? recommandations.top5 : [];
  const legacyProduits = Array.isArray(recommandations?.produits) ? recommandations.produits : [];

  const renderMetrics = (produit) => {
    const metrics = [
      produit.adsActives7j ? `7j: ${produit.adsActives7j}` : null,
      produit.adsActives14j ? `14j: ${produit.adsActives14j}` : null,
      produit.adsActives30j ? `30j: ${produit.adsActives30j}` : null,
      produit.dureeMoyenneDiffusion ? `Durée: ${produit.dureeMoyenneDiffusion}` : null,
    ].filter(Boolean);

    const creatives = [
      produit.typeCreatif ? `Créatif: ${produit.typeCreatif}` : null,
      produit.engagementMoyen ? `Engagement: ${produit.engagementMoyen}` : null,
      produit.type ? `Type: ${produit.type}` : null,
    ].filter(Boolean);

    return (
      <div className="product-compact-meta">
        {produit.plateformePrincipale && <span>📱 {produit.plateformePrincipale}</span>}
        {produit.saturation && <span>🔥 Saturation: {produit.saturation}</span>}
        {produit.annonceurs && <span>🧑‍💼 {produit.annonceurs} annonceurs</span>}
        {metrics.length > 0 && <span>📊 {metrics.join(' • ')}</span>}
        {creatives.length > 0 && <span>🎬 {creatives.join(' • ')}</span>}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <h2>🤖 Produits Recommandés par l'IA</h2>
          <p className="modal-subtitle">Suggestions personnalisées basées sur votre budget</p>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="modal-loading">
              <div className="spinner"></div>
              <p>🔍 Analyse en cours par l'IA...</p>
            </div>
          )}

          {error && (
            <div className="modal-error">
              <span className="error-icon">⚠️</span>
              <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
            </div>
          )}

          {/* Nouveau format niches + top5 */}
          {!loading && !error && niches.length > 0 && (
            <>
              <div className="products-by-niche">
                {niches.map((niche, nicheIndex) => (
                  <div key={nicheIndex} className="niche-section" style={{ animationDelay: `${nicheIndex * 0.12}s` }}>
                    <div className="niche-header">
                      <h3 className="niche-title">{niche.nomNiche || 'Niche'}</h3>
                      <span className="niche-count">
                        {(niche.produits?.length || 0)} produit{(niche.produits?.length || 0) > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="niche-products-grid">
                      {(niche.produits || []).map((produit, index) => (
                        <div key={index} className="product-modal-card compact">
                          <div className="product-compact-header">
                            <h4 className="product-compact-name">{produit.nom}</h4>
                            {produit.type && <span className="marge-tag-small">{produit.type}</span>}
                          </div>

                          <p className="product-compact-description">{produit.problemeClient || produit.description}</p>

                          {renderMetrics(produit)}

                          <div className="product-compact-prices">
                            <div className="price-row">
                              <span className="price-label-small">💰 Achat</span>
                              <span className="price-value-small">{produit.prixAchatEstime || 'N/A'}</span>
                            </div>
                            <div className="price-row">
                              <span className="price-label-small">💵 Revente</span>
                              <span className="price-value-small">{produit.prixReventeEstime || 'N/A'}</span>
                            </div>
                            {produit.margeEstimee && (
                              <div className="price-row">
                                <span className="price-label-small">📈 Marge</span>
                                <span className="price-value-small">{produit.margeEstimee}</span>
                              </div>
                            )}
                          </div>

                          {produit.prixPsychologique && (
                            <div className="product-compact-reason">
                              <span className="reason-icon-small">🎯</span>
                              <span className="reason-text-small">Prix psycho : {produit.prixPsychologique}</span>
                            </div>
                          )}

                          {produit.paysCibles && produit.paysCibles.length > 0 && (
                            <div className="product-compact-reason">
                              <span className="reason-icon-small">🌍</span>
                              <span className="reason-text-small">Pays: {produit.paysCibles.join(', ')}</span>
                            </div>
                          )}

                          {produit.score && (
                            <div className="product-compact-score">
                              <span>⭐ Vente: {produit.score.potentielVente}/10</span>
                              <span>🚀 Scaling: {produit.score.faciliteScaling}/10</span>
                              <span>🌐 Marché: {produit.score.compatibiliteAfrique}/10</span>
                              <span>⏳ Durée: {produit.score.dureeDeVieProduit}/10</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {top5.length > 0 && (
                <div className="top5-section">
                  <h3>🏆 Top 5 produits</h3>
                  <div className="top5-grid">
                    {top5.map((item, idx) => (
                      <div key={idx} className="product-modal-card compact">
                        <div className="product-compact-header">
                          <h4 className="product-compact-name">{item.nom}</h4>
                        </div>
                        {item.raison && (
                          <div className="product-compact-reason">
                            <span className="reason-icon-small">💡</span>
                            <span className="reason-text-small">{item.raison}</span>
                          </div>
                        )}
                        {item.angle && (
                          <div className="product-compact-reason">
                            <span className="reason-icon-small">🎯</span>
                            <span className="reason-text-small">Angle: {item.angle}</span>
                          </div>
                        )}
                        {item.creatif && (
                          <div className="product-compact-reason">
                            <span className="reason-icon-small">🎬</span>
                            <span className="reason-text-small">Créatif: {item.creatif}</span>
                          </div>
                        )}
                        {item.erreursAEviter && (
                          <div className="product-compact-reason">
                            <span className="reason-icon-small">⚠️</span>
                            <span className="reason-text-small">{item.erreursAEviter}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Ancien format (fallback) */}
          {!loading && !error && niches.length === 0 && legacyProduits && legacyProduits.length > 0 && (() => {
            const produitsParNiche = {};
            legacyProduits.forEach(produit => {
              const niche = produit.niche || 'Autres';
              if (!produitsParNiche[niche]) {
                produitsParNiche[niche] = [];
              }
              if (produitsParNiche[niche].length < 2) {
                produitsParNiche[niche].push(produit);
              }
            });

            return (
              <div className="products-by-niche">
                {Object.entries(produitsParNiche).map(([niche, nicheProduits], nicheIndex) => (
                  <div key={nicheIndex} className="niche-section" style={{ animationDelay: `${nicheIndex * 0.15}s` }}>
                    <div className="niche-header">
                      <h3 className="niche-title">{niche}</h3>
                      <span className="niche-count">{nicheProduits.length} produit{nicheProduits.length > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="niche-products-grid">
                      {nicheProduits.map((produit, index) => (
                        <div key={index} className="product-modal-card compact">
                          <div className="product-compact-header">
                            <h4 className="product-compact-name">{produit.nom}</h4>
                            {produit.margeEstimee && (
                              <span className="marge-tag-small">{produit.margeEstimee}</span>
                            )}
                          </div>
                          
                          <p className="product-compact-description">{produit.description}</p>
                          
                          <div className="product-compact-prices">
                            <div className="price-row">
                              <span className="price-label-small">💰 Achat</span>
                              <span className="price-value-small">{produit.prixAchatEstime || 'N/A'}</span>
                            </div>
                            <div className="price-row">
                              <span className="price-label-small">💵 Revente</span>
                              <span className="price-value-small">{produit.prixReventeEstime || 'N/A'}</span>
                            </div>
                          </div>
                          
                          {produit.raison && (
                            <div className="product-compact-reason">
                              <span className="reason-icon-small">💡</span>
                              <span className="reason-text-small">{produit.raison}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {!loading && !error && niches.length === 0 && (!legacyProduits || legacyProduits.length === 0) && (
            <div className="modal-empty">
              <span className="empty-icon">📦</span>
              <p>Aucun produit recommandé pour le moment</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduitsModal;

