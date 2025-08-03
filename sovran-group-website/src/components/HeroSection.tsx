import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from './Button';

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
    image: "/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg"
  },
  {
    id: 2,
    title: "Custom Wardrobes",
    color: "#CDAD7D",
    size: "large",
    image: "/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg"
  },
  {
    id: 3,
    title: "Luxury Interiors",
    color: "#CDAD7D",
    size: "small",
    image: "/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg"
  },
  {
    id: 4,
    title: "Home Renovations",
    color: "#CDAD7D",
    size: "large",
    image: "/images/home-builder-2.jpg"
  },
  {
    id: 5,
    title: "Architectural Design",
    color: "#CDAD7D",
    size: "medium",
    image: "/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg"
  },
  {
    id: 6,
    title: "Home Bars",
    color: "#CDAD7D",
    size: "small",
    image: "/images/Copy-of-Taaj-Kitchens-Home-Bars_Wine-storages-scaled.jpg"
  },
  {
    id: 7,
    title: "Bespoke Furniture",
    color: "#CDAD7D",
    size: "medium",
    image: "/images/Bookshelvs_MrWardrobe-scaled.jpg"
  },
  {
    id: 8,
    title: "Premium Finishes",
    color: "#CDAD7D",
    size: "small",
    image: "/images/Fretwork-wardrobes_MrWarobe_0001.png"
  },
  {
    id: 9,
    title: "Sliding Wardrobes",
    color: "#CDAD7D",
    size: "medium",
    image: "/images/Sliding-door-wardrobes_MrWardrobe-scaled.jpg"
  },
  {
    id: 10,
    title: "Walk-in Wardrobes",
    color: "#CDAD7D",
    size: "large",
    image: "/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg"
  },
  {
    id: 11,
    title: "Modern Kitchens",
    color: "#CDAD7D",
    size: "small",
    image: "/images/traditional-shaker-kitchen.jpg"
  },
  {
    id: 12,
    title: "Storage Solutions",
    color: "#CDAD7D",
    size: "medium",
    image: "/images/Bars_MrWardrobe-scaled.jpg"
  }
];

const HeroSection: React.FC = () => {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for continuous loop movement
    if (column1Ref.current && column2Ref.current && column3Ref.current) {
      const cols = [column1Ref.current, column2Ref.current, column3Ref.current];
      const animations: gsap.core.Tween[] = [];
      
      cols.forEach((column, i) => {
        // Get original cards
        const cards = Array.from(column.children) as HTMLElement[];
        
        // Calculate total height for animation
        const totalHeight = cards.reduce((acc, card) => acc + card.offsetHeight + 16, 0); // height + gap
        
        // Clone cards for seamless looping (add enough clones for smooth transition)
        cards.forEach(card => {
          const clone = card.cloneNode(true) as HTMLElement;
          column.appendChild(clone);
        });
        
        // Set different starting positions for each column for visual interest
        const startPosition = i === 0 ? 0 : i === 1 ? -100 : -200;
        gsap.set(column, { y: startPosition });
        
        // Create animation that continuously moves up
        const animation = gsap.to(column, {
          y: `-=${totalHeight}`,
          duration: 20 + (i * 3), // Different speed for each column (20-26s)
          ease: "none", // Linear movement for smooth scrolling
          repeat: -1,
          onRepeat: () => {
            // Immediately jump back to starting position when animation repeats
            gsap.set(column, { y: startPosition });
          }
        });
        
        // Store animation reference for later control
        animations.push(animation);
      });
      
      // Add hover effect for the container to pause animations
      const cardContainer = cols[0].parentElement?.parentElement;
      if (cardContainer) {
        // Pause animations on hover
        cardContainer.addEventListener('mouseenter', () => {
          animations.forEach(animation => animation.pause());
        });
        
        // Resume animations on hover out
        cardContainer.addEventListener('mouseleave', () => {
          animations.forEach(animation => animation.play());
        });
        
        // Add event delegation for individual card hover effects
        cardContainer.addEventListener('mouseover', (e) => {
          const target = e.target as HTMLElement;
          const card = target.closest('.card-item');
          if (card) {
            gsap.to(card, { 
              scale: 1.05, 
              zIndex: 5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              duration: 0.3
            });
          }
        });
        
        cardContainer.addEventListener('mouseout', (e) => {
          const target = e.target as HTMLElement;
          const card = target.closest('.card-item');
          if (card) {
            gsap.to(card, { 
              scale: 1,
              zIndex: 1, 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              duration: 0.3
            });
          }
        });
      }
    }

    return () => {
      // Clean up animations
      gsap.killTweensOf([column1Ref.current, column2Ref.current, column3Ref.current]);
      
      // Remove event listeners
      const cardContainer = column1Ref.current?.parentElement?.parentElement;
      if (cardContainer) {
        cardContainer.removeEventListener('mouseenter', () => {});
        cardContainer.removeEventListener('mouseleave', () => {});
        cardContainer.removeEventListener('mouseover', () => {});
        cardContainer.removeEventListener('mouseout', () => {});
      }
    };
  }, []);

  // Helper function to render cards with masonry layout - more compact
  const renderCards = (startIndex: number, endIndex: number, columnRef: React.RefObject<HTMLDivElement | null>) => {
    return (
      <div 
        ref={columnRef}
        className="flex flex-col gap-3 relative"
      >
        {serviceCards.slice(startIndex, endIndex).map((card) => {
          // More compact card heights for the masonry layout
          const cardHeight = card.size === 'small' 
            ? 'h-[120px]' 
            : card.size === 'large' 
              ? 'h-[240px]' 
              : 'h-[180px]';
          
          return (
            <div 
              key={card.id}
              className={`card-item w-full rounded-md overflow-hidden shadow-md ${cardHeight} cursor-pointer bg-dark-800 border border-dark-700 transition-all duration-300 hover:border-primary-500/50 group`}
              style={{ margin: '0.25rem 0' }} // Smaller margin for tighter layout
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
                )}
                
                {/* Card content with simplified design */}
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
                    <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden flex items-center bg-dark-900 pt-24 md:pt-28 lg:pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Left side - Hero Text with subtle animations - vertically centered */}
          <div className="z-10 pr-0 lg:pr-4 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight animate-slide-up ivymode-regular" style={{ animation: 'slideUp 1s ease-out 0.2s forwards' }}>
              All your <span className="text-primary-600 relative inline-block">
                home
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary-600 transform scale-x-0 origin-left transition-transform duration-700 ease-out" style={{ animation: 'slideRight 1.5s ease-out 1.2s forwards' }}></span>
              </span> <br />
              deliverables in <br />
              one platform.
            </h1>
            
            <p className="text-lg md:text-xl text-white max-w-xl mt-3 font-lato animate-fade-in">
              Expert craftsmanship, innovative designs, and seamless execution for your bespoke home improvement projects.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                text="Request a Consultation" 
                to="/contact" 
                className="bg-[#CDAD7D] hover:bg-[#CDAD7D]/80 border-[#CDAD7D] text-dark-900 hover:text-dark-900 py-2 px-4 text-sm"
              />
              
              <Button 
                text="Book a Design Visit" 
                to="/contact" 
                className="border-white hover:bg-white hover:text-dark-900 py-2 px-4 text-sm"
              />
            </div>
            
            <p className="text-gray-400 mt-3 text-sm font-lato">
              Over 200 luxury home projects delivered since 2018
            </p>
            
            {/* Features List */}
            <div className="mt-8 space-y-1.5">
              {[
                "White label services with superfast turnarounds",
                "Unrivalled quality for home renovation and design",
                "ROI & margins designed for property investors"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
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
            <div className="mt-6 mb-2">
              <div className="flex items-center">
                <span className="text-white text-sm mr-1 font-lato">We are rated</span>
                <span className="text-white text-sm mr-1 font-lato">4.8</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CDAD7D]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-sm ml-1 font-lato">based on <span className="text-[#CDAD7D]">150+ reviews</span></span>
              </div>
            </div>
          </div>
          
          {/* Right side - Animated Cards with Masonry Layout */}
          <div className="relative h-[500px] overflow-hidden rounded-xl border border-dark-700 bg-dark-900/70 shadow-xl">
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
              
              {/* Masonry Grid */}
              <div className="grid grid-cols-3 gap-3 h-full overflow-hidden relative z-5">
                <div className="col-span-1 overflow-hidden">
                  {renderCards(0, 4, column1Ref)}
                </div>
                <div className="col-span-1 overflow-hidden">
                  {renderCards(4, 8, column2Ref)}
                </div>
                <div className="col-span-1 overflow-hidden">
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
