import React from 'react';
import RandomDoodle from '../RandomDoodle';

interface SpecificationsSectionProps {
  specifications: {
    category: string;
    items: {
      name: string;
      value: string;
    }[];
  }[];
}

const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({ specifications }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black relative overflow-hidden">
      <div className="absolute top-10 left-5 w-48 h-48 opacity-10">
        <RandomDoodle />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl  mb-4">Product Specifications</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Detailed specifications of our premium materials and craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {specifications.map((spec, index) => (
            <div key={index} className="reveal-up">
              <h3 className="text-2xl  mb-6 text-gray-800">{spec.category}</h3>
              <table className="w-full border-collapse">
                <tbody>
                  {spec.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-4 px-6 font-medium">{item.name}</td>
                      <td className="py-4 px-6">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 right-5 w-40 h-40 opacity-10 transform rotate-45">
        <RandomDoodle />
      </div>
    </section>
  );
};

export default SpecificationsSection;
