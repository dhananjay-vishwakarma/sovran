import React, { useState } from 'react';

const BuilderPortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'extensions', name: 'Extensions' },
    { id: 'new-builds', name: 'New Builds' }
  ];
  
  const portfolioItems = [
    {
      id: 1,
      title: 'Knightsbridge Townhouse',
      category: 'residential',
      image: '/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg',
      description: 'Complete renovation of a historic townhouse in Knightsbridge'
    },
    {
      id: 2,
      title: 'Hampstead Garden Office',
      category: 'extensions',
      image: '/assets/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg',
      description: 'Modern garden office extension with sustainable features'
    },
    {
      id: 3,
      title: 'Chelsea Boutique',
      category: 'commercial',
      image: '/assets/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg',
      description: 'High-end retail boutique with custom display fixtures'
    },
    {
      id: 4,
      title: 'Richmond Family Home',
      category: 'new-builds',
      image: '/assets/images/home-builder-2.jpg',
      description: 'Spacious new-build family home with contemporary design'
    },
    {
      id: 5,
      title: 'Notting Hill Kitchen Extension',
      category: 'extensions',
      image: '/assets/images/traditional-kitchen-extension.jpg',
      description: 'Light-filled kitchen extension with floor-to-ceiling glazing'
    },
    {
      id: 6,
      title: 'Mayfair Apartment',
      category: 'residential',
      image: '/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg',
      description: 'Luxurious apartment renovation with high-end finishes'
    },
    {
      id: 7,
      title: 'Canary Wharf Office',
      category: 'commercial',
      image: '/assets/images/MrWardrobe-home-theme.jpg',
      description: 'Modern office space designed for productivity and wellbeing'
    },
    {
      id: 8,
      title: 'Greenwich Eco Home',
      category: 'new-builds',
      image: '/assets/images/Designed-for-sould-Taaj-kitchens-Homepage.png',
      description: 'Sustainable new build with innovative energy-efficient design'
    }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-dark-900 mb-4">Our Portfolio</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Explore our diverse range of construction projects showcasing quality craftsmanship and attention to detail.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-dark-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full mb-2">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
                <h3 className="text-xl font-medium text-dark-900 mb-2">{item.title}</h3>
                <p className="text-dark-700 mb-4">{item.description}</p>
                <a href="#" className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center">
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
          <button className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-lg transition-all">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuilderPortfolioSection;
