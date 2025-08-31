import React from 'react';
import LazyImage from '../../LazyImage';

const InteriorsTestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The attention to detail and quality of craftsmanship exceeded our expectations. Our wardrobes have become the highlight of our bedroom.",
      author: "Kensington Bespoke Wardrobes",
      location: "Residential Project",
      image: "/assets/images/MrWardrobe-Magazine--739x1024.jpg"
    },
    {
      quote: "Sovran Interiors transformed our kitchen with a stunning design that perfectly complements our home style. Their process was seamless.",
      author: "Chelsea Luxury Kitchen",
      location: "Modern Kitchen Project",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg"
    },
    {
      quote: "Professional service from start to finish. The design process was collaborative and the final result is exactly what we envisioned.",
      author: "Mayfair Media Wall",
      location: "Entertainment Space Project",
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-[#081E27] ivymode-regular mb-4">Project Showcases</h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            See the exceptional results from our interior design projects across London.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-lg p-6 relative"
            >
              <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <LazyImage
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                  startLoading={true}
                  priority={index + 1}
                />
              </div>
              
              <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.51.88-3.995 2.618-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.511.88-3.996 2.618-3.996 5.849h3.999v10h-9.999z" />
              </svg>
              
              <p className="text-gray-700 font-lato mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="mt-auto">
                <h4 className="text-lg font-medium ivymode-regular">{testimonial.author}</h4>
                <p className="text-gray-500 font-lato">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="bg-gray-100 py-3 px-5 rounded-md text-center">
            <p className="text-4xl font-bold text-primary-600 mb-1">98%</p>
            <p className="text-gray-600 font-lato text-sm">Client Satisfaction</p>
          </div>
          
          <div className="bg-gray-100 py-3 px-5 rounded-md text-center">
            <p className="text-4xl font-bold text-primary-600 mb-1">250+</p>
            <p className="text-gray-600 font-lato text-sm">Projects Completed</p>
          </div>
          
          <div className="bg-gray-100 py-3 px-5 rounded-md text-center">
            <p className="text-4xl font-bold text-primary-600 mb-1">15+</p>
            <p className="text-gray-600 font-lato text-sm">Years Experience</p>
          </div>
          
          <div className="bg-gray-100 py-3 px-5 rounded-md text-center">
            <p className="text-4xl font-bold text-primary-600 mb-1">5★</p>
            <p className="text-gray-600 font-lato text-sm">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorsTestimonialsSection;
