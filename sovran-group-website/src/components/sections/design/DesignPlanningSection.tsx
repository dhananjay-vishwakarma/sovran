import React from 'react';

const DesignPlanningSection: React.FC = () => {
  const planningServices = [
    {
      title: "Planning Application Support",
      description: "Our team handles all aspects of the planning application process, from initial drawings to submission and liaison with local authorities.",
      icon: "📋",
      image: "/assets/images/home-builder-2.jpg"
    },
    {
      title: "Building Regulations Compliance",
      description: "We ensure all designs comply with current building regulations, preparing detailed technical drawings that meet all legal requirements.",
      icon: "📝",
      image: "/assets/images/home-Builder-2.jpg"
    },
    {
      title: "Listed Building & Conservation",
      description: "Specialized expertise in navigating the complexities of listed buildings and conservation areas, preserving character while enabling modernization.",
      icon: "🏛️",
      image: "/assets/images/Traditional-Craftmanship-Taaj-kitchens-Homepage-1.png"
    },
    {
      title: "Party Wall Agreements",
      description: "Expert assistance with party wall matters, ensuring smooth relationships with neighbors and compliance with the Party Wall Act.",
      icon: "🏠",
      image: "/assets/images/traditional-kitchen-extension.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white" id="planning">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Planning & Building Regulations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Navigating the complexities of planning permissions and building regulations with expert guidance and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {planningServices.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex">
              <div className="w-1/3 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 w-2/3">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-xl text-amber-800 mb-4">Planning Permission Success Rate</h3>
          <div className="flex flex-col md:flex-row items-center justify-around py-4">
            <div className="text-center mb-6 md:mb-0">
              <div className="text-4xl font-bold text-amber-600">94%</div>
              <p className="text-gray-700">First-time approval rate</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <div className="text-4xl font-bold text-amber-600">100+</div>
              <p className="text-gray-700">Planning applications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">15+</div>
              <p className="text-gray-700">London boroughs covered</p>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            Our team's deep understanding of local planning regulations and requirements ensures a smooth process and high approval rate for all our projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DesignPlanningSection;
