import React from 'react';

const DesignTeamSection: React.FC = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Architect",
      image: "/assets/images/Review-2-Em-Sheldon.jpg",
      description: "With over 15 years of experience, Sarah specializes in sustainable architecture and innovative design solutions."
    },
    {
      name: "David Chen",
      role: "3D Visualization Expert",
      image: "/assets/images/Review-3-Mathew-and-Jason.jpg",
      description: "David brings projects to life through stunning photorealistic renders and immersive virtual reality experiences."
    },
    {
      name: "Emma Williams",
      role: "Interior Design Specialist",
      image: "/assets/images/Review-4-Carlie-goodson.jpg",
      description: "Emma creates cohesive design experiences that seamlessly integrate architecture with interior spaces."
    }
  ];

  const certifications = [
    "RIBA Chartered Practice",
    "ARB Registered Architects",
    "Certified 3D Visualization Specialists",
    "Sustainable Design Certification",
    "BIM Level 2 Certified"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Meet Our Expert Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our talented team of architects, designers, and visualization experts bring creativity and technical expertise to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl  text-gray-900 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl  text-gray-900">Our Expertise & Certifications</h3>
            <p className="text-gray-600 mt-2">
              We maintain the highest standards of professional excellence
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 px-4 py-2 rounded-full text-gray-700 flex items-center">
                <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {cert}
              </div>
            ))}
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              <h4 className="text-xl  text-gray-900 mb-4">Professional Approach</h4>
              <p className="text-gray-600 mb-6">
                Our team combines academic excellence with extensive industry experience to deliver exceptional design solutions. We remain at the forefront of architectural innovation through continuous professional development.
              </p>
              <p className="text-gray-600">
                Every project is approached with meticulous attention to detail and a commitment to exceeding client expectations, ensuring your vision is realized to the highest standard.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl  text-gray-900 mb-4">Our Design Philosophy</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Form follows function with emphasis on usability</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Sustainable design principles and materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Balance of aesthetics with practicality</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Client-centered collaborative approach</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Innovation through technology integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignTeamSection;
