import React, { useEffect, useRef } from 'react';
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

  // Media Cards component will now handle the card display

  return (
    <section className="hero-section relative overflow-visible flex items-center bg-[#081E27] pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-32 lg:pb-48">
      <div className="container mx-auto px-4 max-w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Left side - Hero Text with subtle animations - vertically centered */}
          <div className="z-10 pr-0 lg:pr-4 lg:ml-12 flex flex-col justify-center lg:col-span-5 lg:col-start-2 mb-16 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight ivymode-regular tracking-tight" style={{ opacity: 0, filter: 'blur(15px)', animation: 'fadeInBlur 0.5s ease-out 0.2s forwards' }}>
              We Add <span className="text-primary-600 relative inline-block"> Space</span>, <br/><span className="text-primary-600 relative inline-block">Value</span>, and <span className="text-primary-600 relative inline-block">Style 
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary-600 transform scale-x-0 origin-left transition-transform duration-700 ease-out" style={{ animation: 'slideRight 1.5s ease-out 1.2s forwards' }}></span>
              </span> <br />
              to Your Property
            </h1>
            
            {/* <p className="text-xl md:text-2xl text-white/90 max-w-xl mt-5 font-lato leading-relaxed" style={{ opacity: 0, filter: 'blur(10px)', animation: 'fadeInBlur 1.2s ease-out 0.6s forwards' }}>
              Expert craftsmanship, innovative designs, and seamless execution.
            </p> */}
            
            <div ref={buttonsRef} className="flex flex-wrap gap-8 mt-10 hero-buttons">
              <div className="hero-button">
                <ArrowButton 
                  text="Book a Free Consultation " 
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
              Over 1785+ projects completed in last 5 years
            </p>
            
            {/* Features List */}
            <div ref={featuresListRef} className="mt-8 space-y-1.5">
              {[
                "Driven by willingness, clear communication & transparency",
                "Architectural design. Build. Interiors - one seamless journey",
                "A trusted team committed to delivering on every promise"
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
            
            {/* Rating section - moved here after feature list */}
            {/* <div ref={ratingRef} className="mt-6 mb-2 rating-section">
              <div className="flex items-center">
                <span className="text-white text-sm mr-1 font-lato">We are rated</span>
                <span className="text-white text-sm mr-1 font-lato">4.8</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CDAD7D] rating-star" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-sm ml-1 font-lato">based on <span className="text-[#CDAD7D]">150+ reviews</span></span>
              </div>
            </div> */}
          </div>
          
          {/* Right side - MediaCards Component */}
          <div className="relative overflow-visible lg:col-span-5" style={{ animation: 'fadeIn 2s ease-out 0.3s forwards' }}>
            {/* Media Cards Container - clean, no borders, backgrounds or blurs */}
            <div className=" left-[-50px] relative overflow-visible flex justify-center lg:justify-start">
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
