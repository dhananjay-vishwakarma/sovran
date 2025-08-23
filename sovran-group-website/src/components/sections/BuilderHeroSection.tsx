import React from 'react';

const BuilderHeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/home-builder-2.jpg" 
          alt="Luxury Home Construction" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h1 className="text-5xl md:text-7xl  text-white-900 mb-4">
          Building Beyond Expectations
        </h1>
        <h2 className="text-2xl md:text-3xl  text-primary-500 mb-8">
          Our Best Work, Your Perfect Home
        </h2>
        <div className="mb-8">
          <button className="bg-primary-500 hover:bg-primary-600 text-black  py-4 px-8 rounded-lg text-lg transition-all">
            Book Consultation Now
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
          <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <p className="text-white-800">
              <span className="text-yellow-500">★★★★</span>
              <span className="text-yellow-500">★</span> 
              <span className="ml-2 font-medium">Trusted by Homeowners – 4.8★ Reviews</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHeroSection;
