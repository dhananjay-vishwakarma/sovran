import React from 'react';

const DesignCtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex items-center">
              <div>
                <h2 className="text-3xl md:text-4xl  text-white mb-6">Ready to Bring Your Vision to Life?</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Schedule a consultation with our expert architects and designers to discuss your project needs and how we can help transform your vision into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-all duration-300">
                    Schedule Consultation
                  </button>
                  <button className="px-8 py-3 bg-transparent border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-all duration-300">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="/assets/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg"
                alt="Architectural design sketch" 
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our architectural design and 3D visualization services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl  text-gray-900 mb-2">What types of projects do you handle?</h3>
                <p className="text-gray-600">
                  We specialize in a wide range of projects including residential homes, commercial spaces, renovations, extensions, and interior design. Our team has experience with projects of all sizes.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl  text-gray-900 mb-2">How long does the design process typically take?</h3>
                <p className="text-gray-600">
                  The timeline varies depending on the scope and complexity of your project. Simple projects may take a few weeks, while larger projects can take several months. We'll provide a detailed timeline during your consultation.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl  text-gray-900 mb-2">Do you help with planning permission applications?</h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive planning permission assistance, including preparing and submitting applications, liaising with local authorities, and navigating the approval process.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl  text-gray-900 mb-2">How realistic are your 3D visualizations?</h3>
                <p className="text-gray-600">
                  Our 3D visualizations are highly photorealistic, allowing you to see exactly how your project will look upon completion. We use advanced software to create detailed renders with accurate lighting, materials, and spatial representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignCtaSection;
