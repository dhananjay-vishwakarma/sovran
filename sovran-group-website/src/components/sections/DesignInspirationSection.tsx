import React from 'react';
import { Link } from 'react-router-dom';
import RandomDoodle from '../RandomDoodle';

interface DesignInspirationSectionProps {
  designs: {
    title: string;
    image: string;
    description: string;
    link?: string;
  }[];
}

const DesignInspirationSection: React.FC<DesignInspirationSectionProps> = ({ designs }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#081E27] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10 transform -rotate-12">
        <RandomDoodle />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl  mb-4">Design Inspiration</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Browse through our curated collection of inspirational designs and ideas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-lg reveal-up">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#081E27] bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {design.link && (
                    <Link 
                      to={design.link} 
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl  mb-2">{design.title}</h3>
                <p className="text-gray-700">{design.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 transform rotate-45">
        <RandomDoodle />
      </div>
    </section>
  );
};

export default DesignInspirationSection;
