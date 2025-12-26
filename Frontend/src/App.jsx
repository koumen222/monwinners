import React from 'react';
import Cal from './Components/Cal';
import ProduitsStockes from './Components/ProduitsStockes';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="app-nav">
          <Link to="/">Calculateur</Link>
          <Link to="/data">Produits sauvegardés</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Cal />} />
          <Route path="/data" element={<ProduitsStockes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;