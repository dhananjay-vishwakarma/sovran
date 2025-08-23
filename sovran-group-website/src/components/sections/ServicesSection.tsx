import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesSectionProps {
  data: {
    id: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ data }) => {
  return (
    <section id={data.id} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <h2 className="text-4xl md:text-5xl  text-white mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service, index) => (
            <Link 
              to={service.link} 
              key={index} 
              className="reveal-up bg-dark-800 rounded-lg p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl  text-white mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
