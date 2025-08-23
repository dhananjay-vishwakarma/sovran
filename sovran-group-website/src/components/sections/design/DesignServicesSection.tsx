import React from 'react';

const DesignServicesSection: React.FC = () => {
  const services = [
    {
      title: "Architectural Design & Planning",
      description: "Comprehensive architectural solutions from concept to final drawings, tailored to your specific needs and vision.",
      icon: "🏛️",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg"
    },
    {
      title: "3D Visualization & Rendering",
      description: "Photo-realistic 3D renders that bring your project to life before construction begins, allowing for better decision-making.",
      icon: "🖼️",
      image: "/assets/images/Taaj-kitchens-German-FLUTED-KITCHEN_05.jpg"
    },
    {
      title: "Technical Drawings & Blueprints",
      description: "Precise technical documentation and detailed blueprints that meet all regulatory requirements and building codes.",
      icon: "📐",
      image: "/assets/images/traditional-kitchen-extension.jpg"
    },
    {
      title: "Planning Permission Assistance",
      description: "Expert guidance through the planning permission process, increasing your chances of approval.",
      icon: "📋",
      image: "/assets/images/home-builder-2.jpg"
    },
    {
      title: "Interior Design Consultation",
      description: "Collaborative interior design services that seamlessly integrate with your architectural vision.",
      icon: "🪑",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg"
    },
    {
      title: "Virtual Reality Walkthroughs",
      description: "Immersive VR experiences that allow you to explore your future space before construction begins.",
      icon: "🥽",
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="overview">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Architectural Services Overview</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sovran Design offers comprehensive architectural design and 3D visualization services tailored to your unique vision and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl  text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignServicesSection;
