import React from 'react';

const BuilderResidentialSection: React.FC = () => {
  const residentialServices = [
    {
      id: 'renovations',
      title: 'Renovations',
      description: 'Complete home renovations that transform outdated spaces into beautiful, functional living areas.',
      image: '/assets/images/After.jpg',
      link: '#renovations'
    },
    {
      id: 'new-builds',
      title: 'New Builds',
      description: 'Custom-designed new homes built to the highest standards of quality and craftsmanship.',
      image: '/assets/images/home-builder-2.jpg',
      link: '#new-builds'
    },
    {
      id: 'extensions',
      title: 'Extensions',
      description: 'Thoughtfully designed extensions that seamlessly integrate with your existing property.',
      image: '/assets/images/traditional-kitchen-extension.jpg',
      link: '#extensions'
    },
    {
      id: 'loft-conversions',
      title: 'Loft Conversions',
      description: 'Transform unused attic space into valuable living areas, bedrooms, or home offices.',
      image: '/assets/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg',
      link: '#loft-conversions'
    },
    {
      id: 'basements',
      title: 'Basements',
      description: "Expertly engineered basement conversions and excavations to maximize your property's potential.",
      image: '/assets/images/Wine-lovers-dream-by-taaj-kitchens-1-2-1.jpg',
      link: '#basements'
    },
    {
      id: 'landscaping',
      title: 'Landscaping',
      description: 'Beautiful outdoor spaces that complement your home and enhance your lifestyle.',
      image: '/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Mark/Photos/Exterior/P1210060.jpg',
      link: '#landscaping'
    },
    {
      id: 'swimming-pools',
      title: 'Swimming Pools',
      description: 'Luxury swimming pools designed and built to your exact specifications.',
      image: '/assets/images/AdobeStock_1312472493.jpeg',
      link: '#swimming-pools'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="residential">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-dark-900 mb-4">Residential Construction</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            From stunning renovations to new builds and specialized projects, we deliver exceptional quality for every home.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {residentialServices.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-dark-900 mb-3">{service.title}</h3>
                <p className="text-dark-700 mb-5">{service.description}</p>
                <a 
                  href={service.link} 
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-100 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-dark-900 mb-4">Why Choose Sovran Builders for Your Home?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Meticulous attention to detail and superior craftsmanship</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transparent pricing and detailed proposals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated project manager for seamless communication</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10-year structural warranty on all major works</span>
                </li>
              </ul>
              <button className="mt-6 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition-all">
                Request Consultation
              </button>
            </div>
            <div>
              <img 
                src="/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg" 
                alt="Luxury Home" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderResidentialSection;
