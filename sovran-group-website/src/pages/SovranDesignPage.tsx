import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SovranDesignPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Sovran Design
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Architecture designs and 3D services for exceptional spaces.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl font-bold text-white mb-6">Architecture & 3D Services</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Sovran Design offers comprehensive architectural design and 3D visualization services. 
              Our services include:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Architectural design and planning</li>
              <li>• 3D visualization and rendering</li>
              <li>• Technical drawings and blueprints</li>
              <li>• Planning permission assistance</li>
              <li>• Interior design consultation</li>
              <li>• Virtual reality walkthroughs</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SovranDesignPage;
