import React from 'react';

const BuilderFaqSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl  text-dark-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Find answers to common questions about our services and process.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl  text-dark-900 mb-3">How long does a typical home renovation take?</h3>
            <p className="text-dark-700">
              The timeline varies depending on the scope of work, but a typical renovation can take anywhere from 3 to 6 months. Larger projects, such as full home renovations or new builds, may take 8-12 months. We provide detailed timelines during the planning phase.
            </p>
          </div>
          
          {/* FAQ Item 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl  text-dark-900 mb-3">Do you handle all the necessary permits and approvals?</h3>
            <p className="text-dark-700">
              Yes, we manage all aspects of the planning and approval process. Our team handles building regulations, planning permissions, and any other required permits to ensure your project is fully compliant with local regulations.
            </p>
          </div>
          
          {/* FAQ Item 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl  text-dark-900 mb-3">How do you ensure quality control throughout the project?</h3>
            <p className="text-dark-700">
              We have a rigorous quality control process, including regular site inspections, milestone approvals, and dedicated project managers who oversee every aspect of your build. We also maintain open communication with clients to address any concerns promptly.
            </p>
          </div>
          
          {/* FAQ Item 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl  text-dark-900 mb-3">Can you work with my existing architect's plans?</h3>
            <p className="text-dark-700">
              Absolutely. We're happy to collaborate with your chosen architect or designer. Alternatively, we can provide comprehensive design services through our in-house design team if you prefer a complete design and build package.
            </p>
          </div>
          
          {/* FAQ Item 5 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl  text-dark-900 mb-3">What warranties and guarantees do you offer?</h3>
            <p className="text-dark-700">
              We provide a comprehensive 10-year structural warranty on all major building works and a 2-year warranty on installations and fittings. Additionally, all our work is fully insured, giving you complete peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderFaqSection;
