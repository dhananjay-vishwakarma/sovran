import React from 'react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface GallerySectionProps {
  data: {
    id: string;
    title: string;
    description: string;
    items: GalleryItem[];
  };
}

const GallerySection: React.FC<GallerySectionProps> = ({ data }) => {
  return (
    <section id={data.id} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <h2 className="text-4xl md:text-5xl  text-white mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.items.map((project, index) => (
            <div key={index} className="reveal-image rounded-lg overflow-hidden  bg-[#081E27]">
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl  text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <Link to={project.link} className="text-primary-400 hover:text-primary-300 font-medium flex items-center">
                  View Project Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
