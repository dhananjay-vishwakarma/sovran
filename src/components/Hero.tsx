import React from 'react';

interface HeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string;
  backgroundImage: string;
  height?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  description, 
  backgroundImage, 
  height = 'h-screen' 
}) => {
  return (
    <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-xl md:text-2xl font-light tracking-wide mb-8 uppercase">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;