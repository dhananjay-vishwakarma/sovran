import React from 'react';

const BuilderAboutSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl  text-dark-900 mb-4">About Us</h2>
            <div className="w-20 h-1 bg-primary-500 mb-6"></div>
            <h3 className="text-xl md:text-2xl  text-primary-500 mb-6">Our Mission & Ethos</h3>
            <p className="text-dark-700 leading-relaxed mb-6">
              At Sovran Builders, we believe that your home should be as unique as you are. Our mission is to transform spaces into exceptional living environments that reflect your personality while delivering uncompromising quality and craftsmanship.
            </p>
            <p className="text-dark-700 leading-relaxed mb-6">
              We approach each project with a commitment to excellence, sustainability, and attention to detail that has earned us the trust of homeowners across London and beyond.
            </p>
            <h3 className="text-xl md:text-2xl  text-primary-500 mb-6">Brand Philosophy</h3>
            <p className="text-dark-700 leading-relaxed">
              Behind every project is a story — of a family, a dream, and a vision for something better. We listen, we understand, and we bring together the right minds and hands to make it real. For us, it’s not just about building spaces — it’s about creating places you’ll love to live in, grow in, and share with the people who matter most
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg" 
              alt="Luxury Home Construction" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="/assets/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" 
              alt="Premium Home Design" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="/assets/images/traditional-kitchen-extension.jpg" 
              alt="Kitchen Extension" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="/assets/images/Grand-design-in-earthy-tones-by-Taaj-kitchens-5.jpg" 
              alt="Interior Design" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderAboutSection;
