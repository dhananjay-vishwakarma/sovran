import React from 'react';
import RandomDoodle from '../RandomDoodle';

interface ContentSectionProps {
  title: string;
  introduction: string;
  sections: {
    title: string;
    content: string;
  }[];
  featuredProjects: {
    title: string;
    description: string;
    image: string;
  }[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, introduction, sections, featuredProjects }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 opacity-10 transform rotate-12">
        <RandomDoodle />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl lg:text-6xl  mb-8 reveal-up">{title}</h2>
          <div className="prose prose-lg max-w-none reveal-up">
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-lato">{introduction}</p>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {sections.map((section, index) => (
            <div key={index} className="reveal-up">
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">{section.title}</h3>
              <p className="text-gray-600 text-lg">{section.content}</p>
            </div>
          ))}
        </div>
        
        {/* Featured Projects */}
        {featuredProjects && featuredProjects.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-semibold text-gray-800 mb-12 reveal-up">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredProjects.map((project, index) => (
                <div key={index} className="reveal-image rounded-lg overflow-hidden shadow-xl bg-white">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10 transform -rotate-6">
        <RandomDoodle />
      </div>
    </section>
  );
};

export default ContentSection;
