import React from 'react';

const DesignTestimonialsSection: React.FC = () => {
  // Profile images from Dropbox (using available assets)
  const profileImages = [
    "/assets/images/032720_RH_M7_Develop.jpeg",
    "/assets/images/AdobeStock_1312472493.jpeg", 
    "/assets/images/After.jpg",
    "/assets/images/Aqib-10-Harold-Rd-027-scaled.jpg",
    "/assets/images/Background-image-for-finance-5-years-Taaj-Kitchens-1.png"
  ];
  
  const testimonials = [
    {
      quote: "Great work and very respectful team. Went above and beyond in many cases and got a great finishing. I would definitely recommend/ use the team again for future renovations!",
      author: "Chelsea Modern Home Design",
      role: "Residential Project",
      image: profileImages[0]
    },
    {
      quote: "Have used Sovran for house extension and they have been very helpful. Their team assisted me and my family from the architectural plans to the completion of the construction work; they have been extremely supportive throughout and made the process very easy for us. Would recommend to anyone and prices are a bargain for the service you get in return.",
      author: "Notting Hill Extension Design",
      role: "Architectural Project",
      image: profileImages[1]
    },
    {
      quote: "Really good guys, they are trustworthy and efficient. Had no issues and everything was taken care of. I got a loft extension for my son and they made it so spacious and decorated it very nicely. Any work I always come to these guys, they're easy to talk to and take care of everything for you.",
      author: "Mayfair Loft Conversion",
      role: "Interior Design Project",
      image: profileImages[2]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">Our Projects Speak for Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the exceptional outcomes from our design projects across London.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary-500/30">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-gray-600 italic mb-4">{testimonial.quote}</div>
              <div className="mt-4 text-amber-500 text-lg">
                ★★★★★
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl  text-center mb-8">Our Success in Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">1785+</div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">98%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">15+</div>
                <p className="text-gray-600">Design Awards</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">7+</div>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default DesignTestimonialsSection;
