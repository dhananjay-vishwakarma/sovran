import React from 'react';

const InteriorsProcessSection: React.FC = () => {
  const processSteps = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "We meet to discuss your requirements, preferences, and budget to understand your vision fully."
    },
    {
      number: 2,
      title: "Design & Planning",
      description: "Our designers create detailed plans and 3D visualizations to ensure they meet your expectations."
    },
    {
      number: 3,
      title: "Material Selection",
      description: "Choose from our premium materials, finishes, and hardware options for your project."
    },
    {
      number: 4,
      title: "Crafting & Construction",
      description: "Our skilled craftsmen build your custom components with precision and attention to detail."
    },
    {
      number: 5,
      title: "Installation",
      description: "Professional installation team carefully completes your project, ensuring perfect fit and functionality."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-black ivymode-regular mb-4">Our Design Process</h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            From initial concept to final installation, our comprehensive process ensures your vision becomes reality.
          </p>
        </div>
        
        <div className="relative">
          {/* Process connector line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center mb-4 text-xl ">
                    {step.number}
                  </div>
                  <h3 className="text-xl text-black font-medium mb-3 ivymode-regular text-center">{step.title}</h3>
                  <p className="text-gray-600 font-lato text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorsProcessSection;
