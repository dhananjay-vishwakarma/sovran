import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import SovranBuildersPage from './pages/SovranBuildersPage';
import SovranDesignPage from './pages/SovranDesignPage';
import SovranInteriorsPage from './pages/SovranInteriorsPage';
import SovranInteriorsTemplate from './templates/SovranInteriorsTemplate';
import SovranBuildersTemplate from './templates/SovranBuildersTemplate';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <div className="page-content">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/sovran-builders" element={<SovranBuildersPage />} />
          <Route path="/sovran-design" element={<SovranDesignPage />} />
          
          {/* Sovran Interiors Routes */}
          <Route path="/sovran-interiors" element={<SovranInteriorsPage />} />
          <Route path="/sovran-interiors/:categoryId" element={<SovranInteriorsTemplate pageType="category" />} />
          <Route path="/sovran-interiors/:categoryId/:subcategoryId" element={<SovranInteriorsTemplate pageType="subcategory" />} />
          
          {/* Sovran Builders Routes */}
          <Route path="/sovran-builders/residential" element={<SovranBuildersPage section="residential" />} />
          <Route path="/sovran-builders/residential/:categoryId" element={<SovranBuildersTemplate />} />
          <Route path="/sovran-builders/commercial" element={<SovranBuildersPage section="commercial" />} />
          <Route path="/sovran-builders/process" element={<SovranBuildersPage section="process" />} />
          <Route path="/sovran-builders/portfolio" element={<SovranBuildersPage section="portfolio" />} />
          <Route path="/sovran-builders/testimonials" element={<SovranBuildersPage section="testimonials" />} />
          <Route path="/sovran-builders/faq" element={<SovranBuildersPage section="faq" />} />
          <Route path="/sovran-builders/contact" element={<SovranBuildersPage section="contact" />} />
          
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
