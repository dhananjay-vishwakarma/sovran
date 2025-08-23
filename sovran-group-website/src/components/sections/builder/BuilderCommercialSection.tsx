import React from 'react';

const BuilderCommercialSection: React.FC = () => {
  const commercialServices = [
    {
      title: 'Office Fit-Outs',
      description: 'Modern, functional office spaces designed to enhance productivity and employee wellbeing.',
      image: '/assets/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg'
    },
    {
      title: 'Retail Spaces',
      description: 'Attractive retail environments that enhance customer experience and maximize sales potential.',
      image: '/assets/images/Fretwork-wardrobes_MrWarobe_0001.png'
    },
    {
      title: 'Hospitality Projects',
      description: 'Restaurants, hotels, and bars designed with style, functionality, and customer comfort in mind.',
      image: '/assets/images/Taaj-kitchens-German-FLUTED-KITCHEN_05.jpg'
    },
    {
      title: 'Industrial Units',
      description: 'Practical, efficient industrial spaces built to meet specific operational requirements.',
      image: '/assets/images/Mrwardrobe-manufacturing-unit.jpg'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100" id="commercial">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-dark-900 mb-4">Commercial Construction</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Building exceptional commercial spaces that support your business objectives and enhance your brand.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {commercialServices.map((service, index) => (
            <div key={index} className="flex bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-1/3 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl text-dark-900 mb-3">{service.title}</h3>
                <p className="text-dark-700 mb-4">{service.description}</p>
                <a 
                  href="#" 
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
        
        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl text-white mb-6">Trusted by Leading Businesses</h3>
              <p className="text-gray-300 mb-6">
                At Sovran Builders, we understand the unique requirements of commercial construction projects. We work closely with businesses of all sizes to deliver spaces that are not only aesthetically pleasing but also functional, sustainable, and cost-effective.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Experienced in a wide range of commercial sectors</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Minimal disruption to ongoing business operations</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Full compliance with all commercial building regulations</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Sustainable building practices and energy-efficient solutions</span>
                </div>
              </div>
              <button className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition-all">
                Schedule a Consultation
              </button>
            </div>
            <div className="bg-center bg-cover" style={{ backgroundImage: "url('/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg')" }}>
              {/* Image background */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderCommercialSection;
