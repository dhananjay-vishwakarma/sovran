import React from 'react';

const BuilderServicesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl  text-[#081E27] mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Comprehensive building services tailored to meet your specific needs and exceed your expectations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="/assets/images/home-builder-2.jpg" 
              alt="Home Builders" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl  text-white mb-2">Home Builders</h3>
              <p className="text-gray-300 mb-4">
                Complete new build homes crafted with precision and luxury in mind.
              </p>
              <a href="#" className="text-primary-400  hover:text-primary-300 transition-colors">
                Learn More →
              </a>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="/assets/images/Before.jpg" 
              alt="Home Renovations" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl  text-white mb-2">Home Renovators</h3>
              <p className="text-gray-300 mb-4">
                Transform your existing space with our expert renovation services.
              </p>
              <a href="#" className="text-primary-400  hover:text-primary-300 transition-colors">
                Learn More →
              </a>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="/assets/images/traditional-kitchen-extension.jpg" 
              alt="Home Extensions" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl  text-white mb-2">Home Extensions</h3>
              <p className="text-gray-300 mb-4">
                Expand your living space with beautifully designed extensions.
              </p>
              <a href="#" className="text-primary-400  hover:text-primary-300 transition-colors">
                Learn More →
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-primary-500 hover:bg-primary-600 text-white  py-3 px-8 rounded-lg transition-all">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuilderServicesSection;
