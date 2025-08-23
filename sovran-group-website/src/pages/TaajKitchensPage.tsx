import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TaajKitchensPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://taajkitchens.co.uk/wp-content/uploads/2023/12/Picsart_24-04-30_16-32-00-759-2.png.webp"
              alt="Taaj Kitchens Logo"
              className="h-16 mx-auto mb-6"
            />
          </div>
          <h1 className="text-5xl md:text-6xl  text-white mb-6">
            Taaj Kitchens
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Luxury kitchen design and installation for modern living.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl  text-white mb-6">Luxury Kitchen Solutions</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Taaj Kitchens creates stunning, functional kitchen spaces that combine style with practicality. 
              Our services include:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Bespoke kitchen design</li>
              <li>• Premium cabinet solutions</li>
              <li>• Worktop installation</li>
              <li>• Appliance integration</li>
              <li>• Kitchen island designs</li>
              <li>• Complete project management</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TaajKitchensPage;
