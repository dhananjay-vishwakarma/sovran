import React, { useState, useEffect, useRef } from 'react';

const DesignTestimonialsSection: React.FC = () => {
  // State for counters
  const [projectCount, setProjectCount] = useState(1785);
  const [satisfactionCount, setSatisfactionCount] = useState(98);
  const [awardsCount, setAwardsCount] = useState(15);
  const [yearsCount, setYearsCount] = useState(7);
  
  // Max counts (current + 50 for projects, smaller increments for others)
  const maxProjectCount = 1835;
  const maxSatisfactionCount = 99;
  const maxAwardsCount = 20;
  const maxYearsCount = 10;
  
  // Refs for intervals
  const projectIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const satisfactionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const awardsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const yearsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Profile images from Dropbox (using available assets)
  const profileImages = [
    "/assets/images/032720_RH_M7_Develop.jpeg",
    "/assets/images/AdobeStock_1312472493.jpeg", 
    "/assets/images/After.jpg",
    "/assets/images/Aqib-10-Harold-Rd-027-scaled.jpg",
    "/assets/images/Background-image-for-finance-5-years-Taaj-Kitchens-1.png"
  ];
  
  // Counter animation effect
  useEffect(() => {
    // Start the counter intervals with a slight delay between them
    setTimeout(() => {
      // Projects counter
      projectIntervalRef.current = setInterval(() => {
        setProjectCount(prevCount => {
          // Randomly increment by 1 or 2
          const increment = Math.random() > 0.5 ? 1 : 2;
          const newCount = prevCount + increment;
          
          // If we reached or exceeded the max, clear the interval
          if (newCount >= maxProjectCount) {
            if (projectIntervalRef.current) {
              clearInterval(projectIntervalRef.current);
              projectIntervalRef.current = null;
            }
            return maxProjectCount;
          }
          
          return newCount;
        });
      }, Math.floor(Math.random() * 2000) + 2000); // Random interval between 2-4 seconds
    }, 1000);
    
    // Satisfaction counter
    setTimeout(() => {
      satisfactionIntervalRef.current = setInterval(() => {
        setSatisfactionCount(prevCount => {
          // Only increment by 0.1 or 0.2 since this is a percentage
          const increment = Math.random() > 0.5 ? 0.1 : 0.2;
          const newCount = Math.round((prevCount + increment) * 10) / 10; // Round to 1 decimal
          
          if (newCount >= maxSatisfactionCount) {
            if (satisfactionIntervalRef.current) {
              clearInterval(satisfactionIntervalRef.current);
              satisfactionIntervalRef.current = null;
            }
            return maxSatisfactionCount;
          }
          
          return newCount;
        });
      }, Math.floor(Math.random() * 2000) + 2000);
    }, 1500);
    
    // Awards counter
    setTimeout(() => {
      awardsIntervalRef.current = setInterval(() => {
        setAwardsCount(prevCount => {
          const increment = Math.random() > 0.7 ? 1 : 0; // Less frequent increments
          const newCount = prevCount + increment;
          
          if (newCount >= maxAwardsCount) {
            if (awardsIntervalRef.current) {
              clearInterval(awardsIntervalRef.current);
              awardsIntervalRef.current = null;
            }
            return maxAwardsCount;
          }
          
          return newCount;
        });
      }, Math.floor(Math.random() * 2000) + 2000);
    }, 2000);
    
    // Years counter
    setTimeout(() => {
      yearsIntervalRef.current = setInterval(() => {
        setYearsCount(prevCount => {
          const increment = Math.random() > 0.7 ? 1 : 0; // Less frequent increments
          const newCount = prevCount + increment;
          
          if (newCount >= maxYearsCount) {
            if (yearsIntervalRef.current) {
              clearInterval(yearsIntervalRef.current);
              yearsIntervalRef.current = null;
            }
            return maxYearsCount;
          }
          
          return newCount;
        });
      }, Math.floor(Math.random() * 2000) + 2000);
    }, 2500);
    
    // Cleanup function
    return () => {
      if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);
      if (satisfactionIntervalRef.current) clearInterval(satisfactionIntervalRef.current);
      if (awardsIntervalRef.current) clearInterval(awardsIntervalRef.current);
      if (yearsIntervalRef.current) clearInterval(yearsIntervalRef.current);
    };
  }, []);
  
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
                <div className="text-4xl  text-amber-500 mb-2">{projectCount}+</div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">{satisfactionCount}%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">{awardsCount}+</div>
                <p className="text-gray-600">Design Awards</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">{yearsCount}+</div>
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
