import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Button from './Button';
import ArrowButton from './ArrowButton';
import MediaCards from './MediaCards';


// No need for service cards as MediaCards component now handles this

const HeroSection: React.FC = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const projectsTextRef = useRef<HTMLParagraphElement>(null);
  const featuresListRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  
  // Add state for the project counter
  const [projectCount, setProjectCount] = useState(785);
  const maxCount = 855;
  const countingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // No need for the column animations as MediaCards handles its own animations
  
  // Animation for buttons, features, and rating section
  useEffect(() => {
    if (buttonsRef.current && featuresListRef.current && ratingRef.current && projectsTextRef.current) {
      // Create a timeline for these elements
      const tl = gsap.timeline();
      
      // Add button animations - staggered fade and slight movement
      tl.fromTo(buttonsRef.current.children, 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8,
          ease: "power2.out" 
        }, 
        1.2 // Start after headline animation
      );
      
      // Add project count text animation
      tl.fromTo(projectsTextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.6 // Start after buttons
      );
      
      // Add features animation - staggered from left
      tl.fromTo(featuresListRef.current.children,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.15,
          duration: 0.5,
          ease: "power1.out" 
        },
        1.8 // Start after project count
      );
      
      // Add rating section animation
      tl.fromTo(ratingRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.3 // Start after features
      );
      
      // Animate stars individually for a filling effect
      const stars = ratingRef.current.querySelectorAll('.rating-star');
      tl.fromTo(stars,
        { scale: 0 },
        { scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out(1.7)" },
        2.5 // Start slightly after rating section appears
      );
    }
  }, []);

  // Counter animation for project count
  useEffect(() => {
    // Wait a bit before starting the counter to let the initial animations finish
    const startDelay = setTimeout(() => {
      // Start the counter interval
      countingIntervalRef.current = setInterval(() => {
        setProjectCount(prevCount => {
          // Randomly increment by 1 or 2
          const increment = Math.random() > 0.5 ? 1 : 2;
          const newCount = prevCount + increment;
          
          // If we reached or exceeded the max, clear the interval and return exactly the max
          if (newCount >= maxCount) {
            if (countingIntervalRef.current) {
              clearInterval(countingIntervalRef.current);
              countingIntervalRef.current = null;
            }
            return maxCount;
          }
          
          return newCount;
        });
      }, Math.floor(Math.random() * 3000) + 2000); // Random interval between 2-5 seconds
    }, 3000); // Start after 3 seconds
    
    // Cleanup function
    return () => {
      clearTimeout(startDelay);
      if (countingIntervalRef.current) {
        clearInterval(countingIntervalRef.current);
      }
    };
  }, []);

  // Media Cards component will now handle the card display

  return (
    <section className="hero-section relative overflow-visible flex items-center bg-[#081E27] pt-24 md:pt-28 lg:pt-28 pb-24 md:pb-32 lg:pb-48">
      <div className="container mx-auto px-4 max-w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Left side - Hero Text with subtle animations - vertically centered */}
          <div className="z-10 pr-0 lg:pr-4 lg:ml-12 flex flex-col justify-center lg:col-span-5 lg:col-start-2 mb-16 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed ivymode-regular tracking-wider" style={{ opacity: 0, filter: 'blur(10px)', animation: 'fadeInBlur 0.5s ease-out 0.2s forwards', letterSpacing: '0.03em', lineHeight: '1.3' }}>
              We Add <span className="text-primary-600 relative inline-block tracking-widest" style={{ letterSpacing: '0.08em' }}> Space</span>, <br/><span className="text-primary-600 relative inline-block tracking-widest" style={{ letterSpacing: '0.08em' }}>Value</span>, and <span className="text-primary-600 relative inline-block tracking-widest" style={{ letterSpacing: '0.08em' }}>Style 
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary-600 transform scale-x-0 origin-left transition-transform duration-700 ease-out" style={{ animation: 'slideRight 1.5s ease-out 1.2s forwards' }}></span>
              </span> to Your Property
            </h1>

            
            <div ref={buttonsRef} className="flex flex-wrap gap-8 mt-10 hero-buttons">
              <div className="hero-button">
                <ArrowButton 
                  text="Request a Consultation " 
                  to="/contact" 
                  className="text-primary-500 hover:text-primary-400"
                />
              </div>
              
              <div className="hero-button">
                <ArrowButton 
                  text="See Our Work" 
                  to="/contact"
                />
              </div>
            </div>
            
            <p ref={projectsTextRef} className="text-gray-400 mt-3 text-sm font-lato project-count">
              Trusted by <span className="font-semibold">{projectCount}+</span> families & property owners
            </p>
            
            {/* Features List */}
            <div ref={featuresListRef} className="mt-8 space-y-1.5">
                {[
                "UK’s top luxury property remodeling brand",
                "Led by integrity, willingness, & transparency",
                "96% of our clients will recommend us"
                ].map((feature, index) => (
                <div key={index} className="flex items-start feature-item">
                  <div className="flex-shrink-0 mt-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#CDAD7D]/20 text-[#CDAD7D]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  </div>
                  <p className="ml-2 text-gray-300 text-sm font-lato">{feature}</p>
                </div>
                ))}
            </div>
          
          </div>
          
          {/* Right side - MediaCards Component */}
          <div className="relative overflow-visible lg:col-span-5" style={{ animation: 'fadeIn 2s ease-out 0.3s forwards' }}>
            {/* Media Cards Container - clean, no borders, backgrounds or blurs */}
            <div className="relative overflow-visible flex justify-center lg:justify-start">
              {/* Media Cards component */}
              <MediaCards className="relative" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
