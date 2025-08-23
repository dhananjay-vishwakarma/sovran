import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ title, description, backgroundImage, ctaText, ctaLink }, ref) => {
    return (
      <section 
        ref={ref} 
        className="relative pt-24 pb-20 md:pt-32 md:pb-24"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl  text-white mb-6 reveal-up">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 reveal-up">
              {description}
            </p>
            {ctaText && ctaLink && (
              <Link to={ctaLink} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 reveal-up inline-block">
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }
);

export default HeroSection;
