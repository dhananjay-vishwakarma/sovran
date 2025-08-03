import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CostCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cost Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get an instant estimate for your construction or renovation project.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg border border-dark-600">
            <h2 className="text-3xl font-bold text-white mb-6">Project Cost Calculator</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Our interactive cost calculator will be implemented here. Features will include:
            </p>
            <ul className="text-gray-300 space-y-2 mb-8">
              <li>• Project type selection (renovation, extension, new build, etc.)</li>
              <li>• Square footage calculator</li>
              <li>• Material and finish options</li>
              <li>• Labor cost estimates</li>
              <li>• Timeline projections</li>
              <li>• Instant PDF report generation</li>
            </ul>
            <div className="bg-dark-700 p-6 rounded-lg">
              <p className="text-center text-gray-400">
                Cost Calculator Tool Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CostCalculatorPage;
