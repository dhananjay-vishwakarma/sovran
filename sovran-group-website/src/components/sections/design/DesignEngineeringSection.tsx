import React from 'react';

const DesignEngineeringSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="engineering">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Structural Engineering</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert structural engineering solutions that ensure the safety, stability, and longevity of your building project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/assets/images/AdobeStock_586937970.png" 
              alt="Structural engineering" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl text-gray-900">Comprehensive Structural Solutions</h3>
            <p className="text-gray-700">
              Our team of experienced structural engineers works closely with architects and builders to deliver innovative and practical structural solutions for projects of all sizes and complexities.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg text-amber-600 font-medium">Structural Assessments & Surveys</h4>
                <p className="text-gray-700 mt-2">
                  Detailed evaluation of existing structures to identify issues, determine load-bearing capacities, and recommend improvements.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg text-amber-600 font-medium">Load-Bearing Calculations</h4>
                <p className="text-gray-700 mt-2">
                  Precise calculations to ensure your structure can safely support all anticipated loads, including static, dynamic, and environmental forces.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg text-amber-600 font-medium">Foundation Design</h4>
                <p className="text-gray-700 mt-2">
                  Custom foundation solutions based on soil conditions, building requirements, and environmental factors to provide stable support for your structure.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg text-amber-600 font-medium">Beam & Column Design</h4>
                <p className="text-gray-700 mt-2">
                  Optimized structural frameworks that balance strength, aesthetics, and cost-effectiveness for your specific project needs.
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
                Request Structural Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignEngineeringSection;
