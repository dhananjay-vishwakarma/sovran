import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../LazyImage';

const InteriorsHeroSection: React.FC = () => {
  return (
    <div className="relative bg-dark-900 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 to-dark-900/70 z-10"></div>
        <LazyImage 
          src="/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg"
          alt="Sovran Interiors" 
          className="w-full h-full object-cover object-center"
          startLoading={true}
          priority={1}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl  ivymode-regular mb-6">
            Sovran Interiors: Crafting Exquisite Living Spaces
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 font-lato mb-8">
            Blending artistic vision with exceptional craftsmanship to create bespoke interiors
            that reflect your unique style and elevate your everyday living experience.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors font-lato font-medium"
            >
              Request Consultation
            </Link>
            
            <Link 
              to="/sovran-interiors/projects" 
              className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md transition-colors font-lato font-medium"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteriorsHeroSection;
