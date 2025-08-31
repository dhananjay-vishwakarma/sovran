import React from 'react';

const BuilderFeaturedWorksSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl  text-[#081E27] mb-4">Featured Works</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Explore our portfolio of stunning projects that showcase our expertise and craftsmanship.
          </p>
        </div>
        
        {/* Project 1 - Featured */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/assets/images/After.jpg" 
                alt="Fulham Home" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl  text-[#081E27] mb-2">Fulham Residence</h3>
              <p className="text-gray-600 mb-4">Complete Home Renovation</p>
              <p className="text-dark-700 leading-relaxed mb-6">
                A comprehensive renovation of a Victorian property in Fulham, transforming it into a modern family home while preserving its historical character. The project included a kitchen extension, loft conversion, and complete interior redesign.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-primary-500 px-3 py-1 rounded-full text-sm">Renovation</span>
                <span className="bg-gray-200 text-primary-500 px-3 py-1 rounded-full text-sm">Extension</span>
                <span className="bg-gray-200 text-primary-500 px-3 py-1 rounded-full text-sm">Interior Design</span>
              </div>
              <button className="mt-6 bg-transparent hover:bg-primary-500 text-primary-500 hover:text-white  py-2 px-6 border border-primary-500 hover:border-transparent rounded transition-all">
                View Project
              </button>
            </div>
          </div>
        </div>
        
        {/* More Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/assets/images/Grand-design-in-earthy-tones-by-Taaj-kitchens-5.jpg" 
                alt="Hampstead Development" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl  text-[#081E27] mb-2">Hampstead Development</h3>
              <p className="text-gray-600 mb-3">New Build Project</p>
              <p className="text-dark-700 leading-relaxed mb-4 line-clamp-3">
                A luxurious new-build property featuring five bedrooms, state-of-the-art amenities, and sustainable building practices.
              </p>
              <a href="#" className="text-primary-500  hover:text-primary-600 transition-colors">
                View Details →
              </a>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg" 
                alt="Kensington Apartment" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl  text-[#081E27] mb-2">Kensington Apartment</h3>
              <p className="text-gray-600 mb-3">Luxury Renovation</p>
              <p className="text-dark-700 leading-relaxed mb-4 line-clamp-3">
                Complete renovation of a high-end apartment with custom joinery, smart home features, and bespoke finishes throughout.
              </p>
              <a href="#" className="text-primary-500  hover:text-primary-600 transition-colors">
                View Details →
              </a>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/assets/images/traditional-shaker-kitchen.jpg" 
                alt="Richmond Extension" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl  text-[#081E27] mb-2">Richmond Extension</h3>
              <p className="text-gray-600 mb-3">Kitchen & Living Space Extension</p>
              <p className="text-dark-700 leading-relaxed mb-4 line-clamp-3">
                A contemporary extension creating an open-plan kitchen and living area with floor-to-ceiling glazing overlooking the garden.
              </p>
              <a href="#" className="text-primary-500  hover:text-primary-600 transition-colors">
                View Details →
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-primary-500 hover:bg-primary-600 text-white  py-3 px-8 rounded-lg transition-all">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuilderFeaturedWorksSection;
