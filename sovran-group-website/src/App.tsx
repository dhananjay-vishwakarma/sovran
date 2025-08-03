import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import SovranBuildersPage from './pages/SovranBuildersPage';
import SovranDesignPage from './pages/SovranDesignPage';
import SovranInteriorsTemplate from './templates/SovranInteriorsTemplate';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/sovran-builders" element={<SovranBuildersPage />} />
          <Route path="/sovran-design" element={<SovranDesignPage />} />
          
          {/* Sovran Interiors Dynamic Routes */}
          <Route path="/sovran-interiors" element={<SovranInteriorsTemplate pageType="main" />} />
          <Route path="/sovran-interiors/:categoryId" element={<SovranInteriorsTemplate pageType="category" />} />
          <Route path="/sovran-interiors/:categoryId/:subcategoryId" element={<SovranInteriorsTemplate pageType="subcategory" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
