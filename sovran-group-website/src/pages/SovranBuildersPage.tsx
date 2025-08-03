import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SovranBuildersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Sovran Builders
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-400 mb-6">
            Taaj Design and Build
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Premium construction and design services with unmatched attention to detail.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl font-bold text-white mb-6">Taaj Design and Build</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Sovran Builders - Taaj Design and Build specializes in comprehensive construction services. 
              Content will be added here including:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Full home construction and renovation</li>
              <li>• Extension and loft conversion services</li>
              <li>• Design and build packages</li>
              <li>• Project management and consultation</li>
              <li>• Quality craftsmanship and materials</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SovranBuildersPage;
