import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from './Button';
import ArrowButton from './ArrowButton';


// Service Card Type
interface ServiceCard {
  id: number;
  title: string;
  color?: string;
  size?: 'small' | 'medium' | 'large'; // Added size property for masonry layout
  image?: string; // Optional image for cards
}

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Bespoke Kitchens",
    color: "#CDAD7D",
    size: "medium",
    image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg"
  },
  {
    id: 2,
    title: "Custom Wardrobes",
    color: "#CDAD7D",
    size: "large",
    image: "/assets/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg"
  },
  {
    id: 3,
    title: "Luxury Interiors",
    color: "#CDAD7D",
    size: "small",
    image: "/assets/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg"
  },
  {
    id: 4,
    title: "Home Renovations",
    color: "#CDAD7D",
    size: "large",
    image: "/assets/images/home-builder-2.jpg"
  },
  {
    id: 5,
    title: "Architectural Design",
    color: "#CDAD7D",
    size: "medium",
    image: "/assets/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg"
  },
  {
    id: 6,
    title: "Home Bars",
    color: "#CDAD7D",
    size: "small",
    image: "/assets/images/Copy-of-Taaj-Kitchens-Home-Bars_Wine-storages-scaled.jpg"
  },
  {
    id: 7,
    title: "Bespoke Furniture",
    color: "#CDAD7D",
    size: "medium",
    image: "/assets/images/Bookshelvs_MrWardrobe-scaled.jpg"
  },
  {
    id: 8,
    title: "Premium Finishes",
    color: "#CDAD7D",
    size: "small",
    image: "/assets/images/Fretwork-wardrobes_MrWarobe_0001.png"
  },
  {
    id: 9,
    title: "Sliding Wardrobes",
    color: "#CDAD7D",
    size: "medium",
    image: "/assets/images/Sliding-door-wardrobes_MrWardrobe-scaled.jpg"
  },
  {
    id: 10,
    title: "Walk-in Wardrobes",
    color: "#CDAD7D",
    size: "large",
    image: "/assets/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg"
  },
  {
    id: 11,
    title: "Modern Kitchens",
    color: "#CDAD7D",
    size: "small",
    image: "/assets/images/traditional-shaker-kitchen.jpg"
  },
  {
    id: 12,
    title: "Storage Solutions",
    color: "#CDAD7D",
    size: "medium",
    image: "/assets/images/Bars_MrWardrobe-scaled.jpg"
  }
];

const HeroSection: React.FC = () => {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const projectsTextRef = useRef<HTMLParagraphElement>(null);
  const featuresListRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for continuous loop movement
    if (column1Ref.current && column2Ref.current && column3Ref.current) {
      // Create a more elegant infinite scroll effect
      gsap.set([column1Ref.current, column2Ref.current, column3Ref.current], { 
        y: 0 
      });
      
      // Create the infinite scrolling timelines
      gsap.to(column1Ref.current, {
        y: "-50%", 
        duration: 15, 
        ease: "none", 
        repeat: -1, 
        yoyo: false,
        modifiers: {
          y: function(y) {
            // When the animation completes a full cycle, reset to top position
            return `${parseFloat(y) % -50}%`;
          }
        }
      });
      
      gsap.to(column2Ref.current, {
        y: "-50%", 
        duration: 20, 
        ease: "none", 
        repeat: -1,
        yoyo: false,
        modifiers: {
          y: function(y) {
            return `${parseFloat(y) % -50}%`;
          }
        }
      });
      
      gsap.to(column3Ref.current, {
        y: "-50%", 
        duration: 25, 
        ease: "none", 
        repeat: -1,
        yoyo: false,
        modifiers: {
          y: function(y) {
            return `${parseFloat(y) % -50}%`;
          }
        }
      });
    }
  }, []);
  
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

  // Helper function to render cards with masonry layout - more compact
  const renderCards = (startIndex: number, endIndex: number, columnRef: React.RefObject<HTMLDivElement | null>) => {
    // Create a function to render a single card
    const renderCard = (card: ServiceCard, index: number) => {
      // More substantial card heights for better visual impact
      const cardHeight = card.size === 'small' 
        ? 'h-[180px]' 
        : card.size === 'large' 
          ? 'h-[320px]' 
          : 'h-[240px]';
      
      return (
        <div 
          key={`${card.id}-${index}`}
          className={`card-item w-full rounded-md overflow-hidden shadow-md ${cardHeight} cursor-pointer bg-dark-800 border border-dark-700 transition-all duration-300 hover:border-primary-500/50 group`}
          style={{ margin: '0.125rem 0' }} // Increased margin for better spacing
        >
          {/* Card with background image */}
          <div className="h-full relative flex flex-col">
            {/* Background image with overlay */}
              {card.image && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-dark-800/50 group-hover:from-dark-900/70 transition-all duration-500"></div>
              </div>
            )}            {/* Card content with simplified design */}
            <div className="h-full flex flex-col justify-end p-3 relative z-10">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  <div style={{ backgroundColor: card.color }} 
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base  text-white group-hover:text-primary-400 transition-colors duration-300">
                  {card.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    const cards = serviceCards.slice(startIndex, endIndex);
    
    return (
      <div 
        ref={columnRef}
        className="flex flex-col gap-4 relative will-change-transform"
        style={{ height: "250%" }} // Double the height to accommodate the duplicated cards
      >
        {/* Original cards */}
        {cards.map((card, index) => renderCard(card, index))}
        
        {/* Duplicate cards for seamless looping */}
        {cards.map((card, index) => renderCard(card, index + cards.length))}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden flex items-center bg-dark-900 pt-24 md:pt-28 lg:pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Left side - Hero Text with subtle animations - vertically centered */}
          <div className="z-10 pr-0 lg:pr-4 flex flex-col justify-center">
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
              Over 17+ luxury home projects delivered since 2018.
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
          
          {/* Right side - Animated Cards with Masonry Layout */}
          <div className="relative h-[500px] overflow-hidden rounded-xl border border-dark-700 bg-dark-900/70 shadow-xl" style={{ opacity: 0, filter: 'blur(15px)', animation: 'fadeInBlur 6s ease-out 0.3s forwards' }}>
            {/* Dark background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800/80 rounded-xl"></div>
            
            {/* Cards Container - Removed blur effects */}
            <div className="h-full relative px-3 py-6 overflow-hidden">
              {/* Simple overlay for depth without blur */}
              <div className="absolute inset-0 bg-dark-900/20 z-0"></div>
              
              {/* Floating particles effect for depth - reduced for compactness */}
              <div className="absolute inset-0 z-1">
                <div className="absolute w-1 h-1 bg-primary-500/20 rounded-full top-[10%] left-[25%] animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-primary-500/10 rounded-full top-[30%] left-[80%] animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Masonry Grid with infinite scroll effect */}
              <div className="grid grid-cols-3 gap-4 h-full overflow-hidden relative z-5">
                <div className="col-span-1 overflow-hidden h-full">
                  {renderCards(0, 4, column1Ref)}
                </div>
                <div className="col-span-1 overflow-hidden h-full">
                  {renderCards(4, 8, column2Ref)}
                </div>
                <div className="col-span-1 overflow-hidden h-full">
                  {renderCards(8, 12, column3Ref)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
