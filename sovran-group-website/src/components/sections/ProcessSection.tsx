import React from 'react';
import RandomDoodle from '../RandomDoodle';

interface ProcessSectionProps {
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-48 h-48 opacity-10 transform -translate-y-1/2">
        <RandomDoodle />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl  mb-4">Our Process</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We follow a structured approach to ensure your project is delivered to perfection.
          </p>
        </div>
        
        <div className="relative">
          {/* Process line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center mb-16 lg:mb-24 reveal-up ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'} lg:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                <div className="mb-6 lg:mb-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl  mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl lg:text-3xl  mb-4">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center justify-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary-600 border-4 border-white"></div>
              </div>
              
              <div className="lg:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 transform rotate-12">
        <RandomDoodle />
      </div>
    </section>
  );
};

export default ProcessSection;
