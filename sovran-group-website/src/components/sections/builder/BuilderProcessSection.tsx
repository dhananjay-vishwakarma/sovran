import React from 'react';

const BuilderProcessSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="process">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-dark-900 mb-4">Our Process & Approach</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            From initial concept to final handover, our streamlined process ensures a seamless journey to your dream space.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl mb-6">
                1
              </div>
              <h3 className="text-xl text-dark-900 mb-4">Discovery & Vision</h3>
              <p className="text-dark-700">
                We start by understanding your aspirations, requirements, and budget to create a tailored approach to your project.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl mb-6">
                2
              </div>
              <h3 className="text-xl text-dark-900 mb-4">Design & Planning</h3>
              <p className="text-dark-700">
                Our expert designers and architects create detailed plans, obtain necessary permissions, and prepare comprehensive project timelines.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl mb-6">
                3
              </div>
              <h3 className="text-xl text-dark-900 mb-4">Construction & Collaboration</h3>
              <p className="text-dark-700">
                Our skilled craftsmen bring the designs to life with precision, keeping you informed and involved throughout the process.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 text-center hover:border-primary-500 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white text-2xl mb-6">
                4
              </div>
              <h3 className="text-xl text-dark-900 mb-4">Complete Project Management</h3>
              <p className="text-dark-700">
                We handle all aspects of your project, ensuring quality control, timely delivery, and meticulous attention to every detail.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-100 p-8 rounded-lg">
          <h3 className="text-2xl text-center text-dark-900 mb-8">Our Approach to Quality Construction</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg text-dark-900 mb-2">Quality Assurance</h4>
              <p className="text-dark-700">
                Rigorous quality control at every stage of construction, with regular inspections and adherence to the highest standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg text-dark-900 mb-2">Expert Craftsmen</h4>
              <p className="text-dark-700">
                Skilled professionals with years of experience in their respective trades, delivering exceptional workmanship.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg text-dark-900 mb-2">On-Time Delivery</h4>
              <p className="text-dark-700">
                Detailed project planning and efficient execution to ensure your project is completed on schedule and within budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderProcessSection;
