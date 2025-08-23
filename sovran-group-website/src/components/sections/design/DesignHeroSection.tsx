import React from 'react';

const DesignHeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 pt-28 pb-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/90 z-10"></div>
        <img 
          src="/assets/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg"
          alt="Architectural design" 
          className="w-full h-full object-cover"
          loading="eager" // Use eager loading for hero images
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl  text-white mb-6 tracking-tight">
            Sovran Design
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Transforming visions into architectural masterpieces with cutting-edge design and 3D visualization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
              View Our Portfolio
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignHeroSection;
