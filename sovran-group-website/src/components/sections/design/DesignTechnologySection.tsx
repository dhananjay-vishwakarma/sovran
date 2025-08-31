import React from 'react';

const DesignTechnologySection: React.FC = () => {
  const technologies = [
    {
      name: "Autodesk Revit",
      description: "Industry-leading BIM software for architectural design and documentation.",
      icon: "🏢"
    },
    {
      name: "3ds Max",
      description: "Professional 3D modeling and rendering software for photorealistic visualizations.",
      icon: "🎨"
    },
    {
      name: "Lumion",
      description: "Real-time 3D rendering software for creating stunning architectural visualizations.",
      icon: "🖼️"
    },
    {
      name: "AutoCAD",
      description: "Precision drafting software for technical drawings and plans.",
      icon: "📐"
    },
    {
      name: "SketchUp",
      description: "Intuitive 3D modeling software for concept design and development.",
      icon: "✏️"
    },
    {
      name: "VR Technology",
      description: "Immersive virtual reality solutions for interactive project walkthroughs.",
      icon: "🥽"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Our Technology & Tools</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge design technology to deliver exceptional architectural solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl mb-4">{tech.icon}</div>
              <h3 className="text-xl  text-gray-900 mb-2">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl  text-gray-900">Our Design Capabilities</h3>
            <p className="text-gray-600 mt-2">
              Sovran Design combines technical expertise with creative excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#081E27]">
            <div>
              <h4 className="text-xl  text-gray-900 mb-4">Technical Excellence</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>BIM (Building Information Modeling)</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Parametric Design</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Energy Analysis & Sustainability</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Technical Documentation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl  text-gray-900 mb-4">Creative Visualization</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Photorealistic Rendering</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>VR & AR Experiences</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>3D Animation & Walkthroughs</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Concept Sketching & Visualization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignTechnologySection;
