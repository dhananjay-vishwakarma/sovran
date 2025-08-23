import React from 'react';

const DesignRendersSection: React.FC = () => {
  const renderServices = [
    {
      title: "Photorealistic Exterior Renders",
      description: "Stunning exterior visualizations that bring your building's design to life with realistic materials, lighting, and surroundings.",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg"
    },
    {
      title: "Interior Visualization",
      description: "Detailed interior renders that help you visualize spaces, materials, lighting, and furnishings before construction begins.",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg"
    },
    {
      title: "Virtual Reality Experiences",
      description: "Immersive VR walkthroughs that allow clients to experience and explore their future spaces in 3D before they're built.",
      image: "/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Bushra Kitchen View.jpg"
    },
    {
      title: "Animation & Flythrough",
      description: "Dynamic animations that showcase your project from multiple angles, both inside and outside, creating a compelling narrative.",
      image: "/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Pawan Kitchen render.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white" id="renders">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">3D Renders & Visualization</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience your space before it's built with our cutting-edge 3D visualization services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl text-center text-gray-900 mb-8">Our Visualization Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Concept Discussion</h4>
              <p className="text-gray-600">We gather your requirements and design preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Initial 3D Modeling</h4>
              <p className="text-gray-600">Creating the basic structure and spatial layout</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Material & Lighting</h4>
              <p className="text-gray-600">Adding realistic materials, textures, and lighting</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Final Rendering</h4>
              <p className="text-gray-600">High-resolution outputs and optional VR conversion</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
            Request 3D Visualization
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignRendersSection;
