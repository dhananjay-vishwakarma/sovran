import React from 'react';
import LazyImage from '../../LazyImage';

const InteriorsServicesSection: React.FC = () => {
  // Services data
  const services = [
    {
      title: "Bespoke Wardrobes",
      description: "Custom wardrobe solutions designed to maximize your space and reflect your personal style, with premium materials and expert craftsmanship.",
      image: "/assets/images/Glass-door-wardrobes-_MrWardrobe5-scaled.jpg",
      link: "/sovran-interiors/bespoke-wardrobes"
    },
    {
      title: "Luxury Kitchens",
      description: "Exquisite kitchen designs that combine functionality with aesthetic appeal, featuring premium materials and state-of-the-art appliances.",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg",
      link: "/sovran-interiors/kitchens"
    },
    {
      title: "Bespoke Rooms",
      description: "Transform any space with our bespoke room solutions, including TV units, home offices, bookshelves, and home bars.",
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg",
      link: "/sovran-interiors/bespoke-rooms"
    },
    {
      title: "Complete Home Solutions",
      description: "Comprehensive interior design services that integrate all aspects of your home into a cohesive, luxurious living environment.",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg",
      link: "/sovran-interiors/kitchens/complete-home-solutions"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-black  ivymode-regular mb-4">Our Interior Services</h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            Discover our range of bespoke interior solutions designed to transform your spaces with 
            exceptional craftsmanship and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  startLoading={true}
                  priority={index + 1}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-3 ivymode-regular">{service.title}</h3>
                <p className="text-gray-600 font-lato mb-4">{service.description}</p>
                <a 
                  href={service.link} 
                  className="inline-flex items-center text-primary-600 font-lato font-medium hover:text-primary-800 transition-colors"
                >
                  Explore More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorsServicesSection;
