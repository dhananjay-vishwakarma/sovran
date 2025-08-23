import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SubcategoryNav from '../components/SubcategoryNav';

// Import section components
import BuilderHeroSection from '../components/sections/BuilderHeroSection';
import BuilderPromoBanner from '../components/sections/BuilderPromoBanner';
import BuilderAboutSection from '../components/sections/BuilderAboutSection';
import BuilderFeaturedWorksSection from '../components/sections/BuilderFeaturedWorksSection';
import BuilderTestimonialsSection from '../components/sections/BuilderTestimonialsSection';
import BuilderBookingSection from '../components/sections/BuilderBookingSection';
import BuilderFaqSection from '../components/sections/BuilderFaqSection';
import BuilderContactSection from '../components/sections/BuilderContactSection';

// Import new builder sections
import BuilderResidentialSection from '../components/sections/builder/BuilderResidentialSection';
import BuilderCommercialSection from '../components/sections/builder/BuilderCommercialSection';
import BuilderProcessSection from '../components/sections/builder/BuilderProcessSection';
import BuilderPortfolioSection from '../components/sections/builder/BuilderPortfolioSection';

interface SovranBuildersPageProps {
  section?: string;
}

const SovranBuildersPage: React.FC<SovranBuildersPageProps> = ({ section }) => {
  const [currentSection, setCurrentSection] = useState(section || 'home');
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    residential: useRef<HTMLDivElement>(null),
    commercial: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };
  
  // Define subcategories for the builders page
  const buildersSubcategories = [
    { id: 'home', title: 'Overview', link: '/sovran-builders' },
    { id: 'residential', title: 'Residential', link: '/sovran-builders/residential' },
    { id: 'commercial', title: 'Commercial', link: '/sovran-builders/commercial' },
    { id: 'process', title: 'Our Process', link: '/sovran-builders/process' },
    { id: 'portfolio', title: 'Portfolio', link: '/sovran-builders/portfolio' },
    { id: 'testimonials', title: 'Testimonials', link: '/sovran-builders/testimonials' },
    { id: 'faq', title: 'FAQ', link: '/sovran-builders/faq' },
    { id: 'contact', title: 'Contact', link: '/sovran-builders/contact' }
  ];
  
  // Scroll to section when component mounts
  useEffect(() => {
    if (section && sectionRefs[section as keyof typeof sectionRefs]?.current) {
      setTimeout(() => {
        sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [section]);
  
  // Add scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 'residential', 'commercial', 'process', 
        'portfolio', 'testimonials', 'faq', 'contact'
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section - White background */}
      <div id="home" ref={sectionRefs.home}>
        <BuilderHeroSection />
      </div>
      
      {/* Colored promo banner */}
      <BuilderPromoBanner />

      {/* About Section - Light gray background */}
      <BuilderAboutSection />

      {/* Residential Construction Section - White background */}
      <div id="residential" ref={sectionRefs.residential}>
        <BuilderResidentialSection />
      </div>

      {/* Commercial Construction Section - Light gray background */}
      <div id="commercial" ref={sectionRefs.commercial}>
        <BuilderCommercialSection />
      </div>

      {/* Process Section - White background */}
      <div id="process" ref={sectionRefs.process}>
        <BuilderProcessSection />
      </div>

      {/* Portfolio Section - White background */}
      <div id="portfolio" ref={sectionRefs.portfolio}>
        <BuilderPortfolioSection />
      </div>

      {/* Testimonials Section - Light gray background */}
      <div id="testimonials" ref={sectionRefs.testimonials}>
        <BuilderTestimonialsSection />
      </div>

      {/* Booking Section - White background */}
      <BuilderBookingSection />

      {/* FAQ Section - Light gray background */}
      <div id="faq" ref={sectionRefs.faq}>
        <BuilderFaqSection />
      </div>

      {/* Contact Section - White background */}
      <div id="contact" ref={sectionRefs.contact}>
        <BuilderContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default SovranBuildersPage;
