import React from 'react';
import { Link } from 'react-router-dom';
import RandomDoodle from '../RandomDoodle';

interface FinalCtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  background?: string;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  secondaryText,
  secondaryLink,
  background = 'white'
}) => {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-${background} text-[#081E27] relative overflow-hidden`}>
      <div className="absolute top-0 left-1/4 w-40 h-40 opacity-10 transform -rotate-6">
        <RandomDoodle />
      </div>
      
      <div className="absolute bottom-0 right-1/4 w-48 h-48 opacity-10 transform rotate-12">
        <RandomDoodle />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl  mb-6">{title}</h2>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">{description}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            to={buttonLink} 
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md text-lg transition duration-300 transform hover:scale-105"
          >
            {buttonText}
          </Link>
          
          {secondaryText && secondaryLink && (
            <Link 
              to={secondaryLink}
              className="px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 hover:bg-gray-50 font-medium rounded-md text-lg transition duration-300"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
