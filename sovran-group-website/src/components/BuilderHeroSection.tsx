import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
}

const BuilderHeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description, 
  backgroundImage,
  ctaText,
  ctaLink
}) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ivymode-regular">
          {title}
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          {description}
        </p>
        
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default BuilderHeroSection;
