import React from 'react';

const DesignProcessSection: React.FC = () => {
  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We begin with a comprehensive consultation to understand your vision, requirements, and project scope."
    },
    {
      number: "02",
      title: "Concept Development",
      description: "Our architects develop initial concepts and designs based on your input and our expertise."
    },
    {
      number: "03",
      title: "3D Visualization",
      description: "We create photorealistic 3D renderings to help you visualize the final result before proceeding."
    },
    {
      number: "04",
      title: "Technical Documentation",
      description: "Detailed technical drawings and specifications are created to guide construction and ensure compliance."
    },
    {
      number: "05",
      title: "Planning & Permissions",
      description: "We assist with obtaining necessary planning permissions and regulatory approvals."
    },
    {
      number: "06",
      title: "Project Realization",
      description: "We provide support throughout the construction process to ensure your vision is perfectly realized."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Our Design Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a structured approach to bring your architectural vision to life, combining creativity with technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl  text-amber-500/20 absolute -top-8 -left-2">
                {step.number}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl  text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcessSection;
