import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AIVisualiserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#081E27]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl  text-white mb-6">
            AI Visualiser
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visualize your dream space with our AI-powered design tool.
          </p>
        </div>
      </section>

      {/* Visualiser Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl  text-white mb-6">AI-Powered Design Visualization</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Our AI Visualiser tool will help you see your project before construction begins. 
              Features will include:
            </p>
            <ul className="text-gray-300 space-y-2 mb-8">
              <li>• Upload photos of your current space</li>
              <li>• AI-generated design suggestions</li>
              <li>• Material and color variations</li>
              <li>• 3D rendering capabilities</li>
              <li>• Before and after comparisons</li>
              <li>• Export high-resolution images</li>
            </ul>
            <div className="bg-dark-700 p-6 rounded-lg">
              <p className="text-center text-gray-400">
                AI Visualiser Tool Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIVisualiserPage;
