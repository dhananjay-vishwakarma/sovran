import React from 'react';

const DesignFeaturedProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Kensington Residence",
      category: "Modern Architecture",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg",
      description: "A contemporary home design that seamlessly blends indoor and outdoor spaces."
    },
    {
      title: "London Penthouse",
      category: "Interior Design",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg",
      description: "Luxury penthouse renovation with bespoke features and premium materials."
    },
    {
      title: "Grand Design",
      category: "Architectural Visualization",
      image: "/assets/images/Grand-design-in-earthy-tones-by-Taaj-kitchens-5.jpg",
      description: "Photo-realistic 3D visualization for a high-end residential project."
    },
    {
      title: "Traditional Renovation",
      category: "Heritage Restoration",
      image: "/assets/images/traditional-shaker-kitchen.jpg",
      description: "Careful restoration and modernization of a heritage property."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of exceptional architectural designs and 3D visualizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-sm px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl  text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="text-amber-600 font-medium hover:text-amber-700 flex items-center">
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignFeaturedProjectsSection;
