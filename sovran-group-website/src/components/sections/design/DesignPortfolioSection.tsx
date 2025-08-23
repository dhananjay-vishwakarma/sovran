import React, { useState } from 'react';

const DesignPortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'retail', name: 'Retail' }
  ];
  
  const portfolioItems = [
    {
      id: 1,
      title: 'Luxury London Penthouse',
      category: 'residential',
      image: '/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg',
      description: 'Modern high-end penthouse with panoramic city views'
    },
    {
      id: 2,
      title: 'Knightsbridge Townhouse',
      category: 'residential',
      image: '/assets/images/Dressing-Rooms.1.png.png',
      description: 'Classic British architecture with contemporary interior design'
    },
    {
      id: 3,
      title: 'SoHo Boutique Hotel',
      category: 'hospitality',
      image: '/assets/images/Grand-design-in-earthy-tones-by-Taaj-kitchens-5.jpg',
      description: 'Boutique hotel with modern artistic elements'
    },
    {
      id: 4,
      title: 'Chelsea Restaurant',
      category: 'commercial',
      image: '/assets/images/Taaj-kitchens-German-FLUTED-KITCHEN_05.jpg',
      description: 'Upscale dining space with elegant ambiance'
    },
    {
      id: 5,
      title: 'Mayfair Office Space',
      category: 'commercial',
      image: '/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg',
      description: 'Contemporary open-plan office with sustainable features'
    },
    {
      id: 6,
      title: 'Oxford Street Flagship Store',
      category: 'retail',
      image: '/assets/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg',
      description: 'High-end retail space with innovative customer flow'
    },
    {
      id: 7,
      title: 'Kensington Family Home',
      category: 'residential',
      image: '/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg',
      description: 'Spacious family residence with custom design elements'
    },
    {
      id: 8,
      title: 'Shoreditch Concept Store',
      category: 'retail',
      image: '/assets/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg',
      description: 'Contemporary retail experience with industrial chic design'
    }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Design Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse collection of design projects showcasing our expertise across various sectors
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full mb-2">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a href="#" className="text-amber-500 font-medium hover:text-amber-600 inline-flex items-center">
                  View Project 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
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

export default DesignPortfolioSection;
