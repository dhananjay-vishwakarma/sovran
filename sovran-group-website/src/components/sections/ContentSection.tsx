import React from 'react';

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
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl ivymode-regular font-bold text-white mb-6 reveal-up">{title}</h2>
          <div className="prose prose-lg prose-invert max-w-none reveal-up">
            <p className="text-xl text-gray-300 leading-relaxed mb-8 font-lato">{introduction}</p>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="reveal-up">
              <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
              <p className="text-gray-300">{section.content}</p>
            </div>
          ))}
        </div>
        
        {/* Featured Projects */}
        {featuredProjects && featuredProjects.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-8 reveal-up">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="reveal-image rounded-lg overflow-hidden shadow-xl bg-dark-900">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;
