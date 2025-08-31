import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ExitIntentPopup from './components/ExitIntentPopup';
import { setupImageCompression } from './utils/ImageCompressor';
import './App.css';
import './styles/media-cards.css';

function App() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  
  // Initialize global image compression
  useEffect(() => {
    // Setup global image compression
    const cleanup = setupImageCompression();
    
    // Cleanup when component unmounts
    return cleanup;
  }, []);
  
  // Check if the popup should be shown based on localStorage
  const shouldShowPopup = useCallback(() => {
    // Don't show on contact page
    if (window.location.pathname.includes('/contact')) {
      return false;
    }
    
    const exitPopupShown = localStorage.getItem('exitPopupShown');
    const exitPopupShownDate = localStorage.getItem('exitPopupShownDate');
    
    // If never shown before, show it
    if (!exitPopupShown) {
      return true;
    }
    
    // If shown before, check if it's been at least 7 days
    if (exitPopupShownDate) {
      const lastShown = new Date(exitPopupShownDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastShown.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Show again after 7 days
      return diffDays >= 7;
    }
    
    return false;
  }, []);
  
  // Set up exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 5 && shouldShowPopup()) {
        setShowExitPopup(true);
      }
    };
    
    // Add event listener for mouse leave
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldShowPopup]);
  
  // Handle closing the popup
  const handleClosePopup = () => {
    setShowExitPopup(false);
  };
  
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
        
        {/* Exit Intent Popup */}
        {showExitPopup && <ExitIntentPopup onClose={handleClosePopup} />}
      </div>
    </Router>
  );
}

export default App;
