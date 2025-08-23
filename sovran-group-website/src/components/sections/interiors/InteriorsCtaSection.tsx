import React from 'react';

const InteriorsCtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-lg overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600 opacity-90 z-0"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:max-w-xl mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl  ivymode-regular mb-4 text-white">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-lg text-white/90 font-lato">
                  Whether you're dreaming of a bespoke wardrobe, luxury kitchen, or complete home transformation,
                  our expert team is ready to bring your vision to life. Schedule a consultation today.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md transition-colors font-lato font-medium"
                >
                  Schedule Consultation
                </a>
                <a 
                  href="/sovran-interiors/projects" 
                  className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md transition-colors font-lato font-medium"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorsCtaSection;
