import React from 'react';
import LazyImage from '../../LazyImage';

const InteriorsGallerySection: React.FC = () => {
  const galleryItems = [
    {
      image: "/assets/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg",
      category: "Wardrobes"
    },
    {
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg",
      category: "Kitchens"
    },
    {
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg",
      category: "Media Units"
    },
    {
      image: "/assets/images/Copy-of-Taaj-Kitchens-Home-Bars_Wine-storages-scaled.jpg",
      category: "Home Bars"
    },
    {
      image: "/assets/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg",
      category: "Home Offices"
    },
    {
      image: "/assets/images/Bookshelvs_MrWardrobe-scaled.jpg",
      category: "Bookshelves"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-[#081E27] ivymode-regular mb-4">Our Gallery</h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            A selection of our bespoke interior designs that showcase our craftsmanship, innovation and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg h-64">
              <LazyImage
                src={item.image}
                alt={item.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                startLoading={true}
                priority={index + 1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-medium ivymode-regular text-lg">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/sovran-interiors/gallery" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md transition-colors font-lato font-medium"
          >
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteriorsGallerySection;
