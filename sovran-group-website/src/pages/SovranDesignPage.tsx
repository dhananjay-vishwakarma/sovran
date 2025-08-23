import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SubcategoryNav from '../components/SubcategoryNav';
import DesignHeroSection from '../components/sections/design/DesignHeroSection';
import DesignServicesSection from '../components/sections/design/DesignServicesSection';
import DesignProcessSection from '../components/sections/design/DesignProcessSection';
import DesignFeaturedProjectsSection from '../components/sections/design/DesignFeaturedProjectsSection';
import DesignTestimonialsSection from '../components/sections/design/DesignTestimonialsSection';
import DesignTechnologySection from '../components/sections/design/DesignTechnologySection';
import DesignTeamSection from '../components/sections/design/DesignTeamSection';
import DesignRendersSection from '../components/sections/design/DesignRendersSection';
import DesignPortfolioSection from '../components/sections/design/DesignPortfolioSection';
import DesignEngineeringSection from '../components/sections/design/DesignEngineeringSection';
import DesignCtaSection from '../components/sections/design/DesignCtaSection';
import DesignContactSection from '../components/sections/design/DesignContactSection';

const SovranDesignPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('home');
  
  // Define subcategories for the design page
  const designSubcategories = [
    { id: 'home', title: 'Overview', link: '#home' },
    { id: 'services', title: 'Services', link: '#services' },
    { id: 'process', title: 'Our Process', link: '#process' },
    { id: 'projects', title: 'Featured Projects', link: '#projects' },
    { id: 'technology', title: 'Technology', link: '#technology' },
    { id: 'team', title: 'Our Team', link: '#team' },
    { id: 'engineering', title: 'Engineering', link: '#engineering' },
    { id: 'renders', title: '3D Renders', link: '#renders' },
    { id: 'portfolio', title: 'Portfolio', link: '#portfolio' },
    { id: 'contact', title: 'Contact', link: '#contact' }
  ];
  
  // Add scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 'services', 'process', 'projects', 
        'technology', 'team', 'engineering', 'renders', 'portfolio', 'contact'
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
    <div className="min-h-screen bg-white">
      <Navigation />
    
      
      {/* Hero Section - Dark Background */}
      <div id="home">
        <DesignHeroSection />
      </div>
      
      {/* Services Section - Light Gray Background */}
      <div id="services">
        <DesignServicesSection />
      </div>
      
      {/* Process Section - White Background */}
      <div id="planning">
        <DesignProcessSection />
      </div>
      
      {/* Featured Projects Section - Light Gray Background */}
      <div id="projects">
        <DesignFeaturedProjectsSection />
      </div>
      
      {/* Testimonials Section with Social Proof - White Background */}
      <DesignTestimonialsSection />
      
      {/* Technology Section - Light Gray Background */}
      <div id="technology">
        <DesignTechnologySection />
      </div>
      
      {/* Team Section - Light Gray Background */}
      <div id="team">
        <DesignTeamSection />
      </div>
      
      {/* Engineering Section - Light Gray Background */}
      <div id="engineering">
        <DesignEngineeringSection />
      </div>
      
      {/* 3D Renders & Visualization Section - White Background */}
      <div id="renders">
        <DesignRendersSection />
      </div>
      
      {/* Portfolio Section - Light Gray Background */}
      <div id="portfolio">
        <DesignPortfolioSection />
      </div>
      
      {/* CTA Section - White Background */}
      <DesignCtaSection />
      
      {/* Contact Section - White Background */}
      <div id="contact">
        <DesignContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default SovranDesignPage;
