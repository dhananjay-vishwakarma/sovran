import React from 'react';

const BuilderProcessSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl  text-[#081E27] mb-4">Our Process</h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p className="text-xl text-dark-700 max-w-3xl mx-auto">
          From initial concept to final handover, our streamlined process ensures a seamless journey to your dream space.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl  mb-6">
              1
            </div>
            <h3 className="text-xl  text-[#081E27] mb-4">Discovery & Vision</h3>
            <p className="text-dark-700">
              We start by understanding your aspirations, requirements, and budget to create a tailored approach to your project.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl  mb-6">
              2
            </div>
            <h3 className="text-xl  text-[#081E27] mb-4">Design & Planning</h3>
            <p className="text-dark-700">
              Our expert designers and architects create detailed plans, obtain necessary permissions, and prepare comprehensive project timelines.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl  mb-6">
              3
            </div>
            <h3 className="text-xl  text-[#081E27] mb-4">Construction & Collaboration</h3>
            <p className="text-dark-700">
              Our skilled craftsmen bring the designs to life with precision, keeping you informed and involved throughout the process.
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl  mb-6">
              4
            </div>
            <h3 className="text-xl  text-[#081E27] mb-4">Complete Project Management</h3>
            <p className="text-dark-700">
              We handle all aspects of your project, ensuring quality control, timely delivery, and meticulous attention to every detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderProcessSection;
