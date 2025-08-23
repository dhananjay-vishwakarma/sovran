import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Import section components for Interiors
import InteriorsHeroSection from '../components/sections/interiors/InteriorsHeroSection';
import InteriorsServicesSection from '../components/sections/interiors/InteriorsServicesSection';
import InteriorsProcessSection from '../components/sections/interiors/InteriorsProcessSection';
import InteriorsFeaturedProjectsSection from '../components/sections/interiors/InteriorsFeaturedProjectsSection';
import InteriorsTestimonialsSection from '../components/sections/interiors/InteriorsTestimonialsSection';
import InteriorsGallerySection from '../components/sections/interiors/InteriorsGallerySection';
import InteriorsCtaSection from '../components/sections/interiors/InteriorsCtaSection';
import InteriorsContactSection from '../components/sections/interiors/InteriorsContactSection';

const SovranInteriorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Black Background */}
      <InteriorsHeroSection />
      
      {/* Services Section - Light Gray Background */}
      <InteriorsServicesSection />
      
      {/* Process Section - White Background */}
      <InteriorsProcessSection />
      
      {/* Featured Projects Section - Light Gray Background */}
      <InteriorsFeaturedProjectsSection />
      
      {/* Testimonials Section - White Background */}
      <InteriorsTestimonialsSection />
      
      {/* Gallery Section - Light Gray Background */}
      <InteriorsGallerySection />
      
      {/* CTA Section - White Background */}
      <InteriorsCtaSection />
      
      {/* Contact Section - White Background */}
      <InteriorsContactSection />

      <Footer />
    </div>
  );
};

export default SovranInteriorsPage;
