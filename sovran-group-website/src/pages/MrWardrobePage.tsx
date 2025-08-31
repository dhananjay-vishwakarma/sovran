import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MrWardrobePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#081E27]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://mrwardrobe.co.uk/wp-content/uploads/2023/06/Mr-Wardrobe-png-new-logo-white-e.png"
              alt="Mr Wardrobe Logo"
              className="h-16 mx-auto mb-6"
            />
          </div>
          <h1 className="text-5xl md:text-6xl  text-white mb-6">
            Mr Wardrobe
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bespoke wardrobe solutions tailored to your space and style.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl  text-white mb-6">Bespoke Wardrobe Solutions</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Mr Wardrobe specializes in creating custom wardrobe solutions that maximize space and style. 
              Our services include:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Custom fitted wardrobes</li>
              <li>• Walk-in closet design</li>
              <li>• Sliding door systems</li>
              <li>• Interior organization solutions</li>
              <li>• Premium materials and finishes</li>
              <li>• Professional installation</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MrWardrobePage;
