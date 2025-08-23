import React from 'react';
import LazyImage from '../../LazyImage';

const InteriorsFeaturedProjectsSection: React.FC = () => {
  const featuredProjects = [
    {
      title: "Kensington Luxury Residence",
      description: "Complete interior transformation with bespoke cabinetry, custom kitchens and wardrobes.",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg",
      category: "Complete Home Solution"
    },
    {
      title: "Chelsea Penthouse Kitchen",
      description: "Modern luxury kitchen with premium materials and integrated smart home features.",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg",
      category: "Kitchen Design"
    },
    {
      title: "Mayfair Entertainment Unit",
      description: "Custom media wall with integrated wine storage and display cabinets.",
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg",
      category: "Bespoke Rooms"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-black ivymode-regular mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            Explore our most celebrated interior designs that showcase our expertise, creativity, and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  startLoading={true}
                  priority={index + 1}
                />
                <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-4 py-1 text-sm">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 ivymode-regular">{project.title}</h3>
                <p className="text-gray-600 font-lato mb-4">{project.description}</p>
                <a 
                  href="/sovran-interiors/projects" 
                  className="inline-flex items-center text-primary-600 font-lato font-medium hover:text-primary-800 transition-colors"
                >
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/sovran-interiors/projects" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md transition-colors font-lato font-medium"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteriorsFeaturedProjectsSection;
