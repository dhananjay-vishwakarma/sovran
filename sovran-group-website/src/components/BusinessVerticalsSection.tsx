import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import logo from src/assets
import logoImage from '../assets/logo/s.svg';

// Business vertical images from public folder
const businessArch = '/assets/verticals/1.png';
const businessBuild = '/assets/verticals/2.jpg';
const businessInterior = '/assets/verticals/3.jpg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BusinessVerticalsSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingEl = headingRef.current;
    
    if (headingEl) {
      gsap.set(headingEl, { opacity: 1 });
      gsap.fromTo(
        headingEl,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingEl,
            start: 'top 80%',
          },
        }
      );
    }

    // Card animations
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Background Logo */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          top: '-20rem',
          left: '-8rem',
          opacity: 0.045,
          zIndex: 0,
          width: '80rem',
          height: '80rem',
        }}
      >
        <img 
          src={logoImage} 
          alt="Sovran Logo Background" 
          className="w-full h-full object-contain" 
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-left mb-16">
          <h2 className="text-[#CDAD7D] text-base uppercase tracking-wider mb-1 font-medium">
            OUR BUSINESS VERTICALS
          </h2>
          <h3
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-6xl text-[#081E27] ivymode-regular"
          >
            Our Services
          </h3>
        </div>

        <div className="flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

            {/* Architectural Design Card */}
            <div
              ref={card1Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[500px]"
              style={{
                backgroundImage: `url(${businessArch})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute bottom-0 left-0 w-full" style={{ pointerEvents: 'none' }}>
                <div
                  className="w-full"
                  style={{
                    height: '230px', // Adjust this value to match the text block height
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,1) 100%)',
                  }}
                />
              </div>
              <div className="relative flex flex-col justify-end items-center text-center h-full p-2">
                <h3 className="text-4xl text-white mb-14 tracking-wider">ARCHITECTURAL</h3>
                <p className="text-white text-l mb-4 w-full text-justify px-4">
                  Led by former planning officers, we know how to get approvals others can't. With detailed drawings and
                  lifelike renders, you'll see your vision long before it's built.
                </p>
              </div>
            </div>

            {/* Build Card */}
            <div
              ref={card2Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[500px]"
              style={{
                backgroundImage: `url(${businessBuild})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute bottom-0 left-0 w-full" style={{ pointerEvents: 'none' }}>
                 <div
                  className="w-full"
                  style={{
                    height: '230px', // Adjust this value to match the text block height
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,1) 100%)',
                  }}
                />
              </div>
              <div className="relative flex flex-col justify-end items-center text-center h-full p-2">
                <h3 className="text-4xl text-white mb-14 tracking-wider">BUILD</h3>
                <p className="text-white text-l mb-4 w-full text-justify px-4">
                  Dedicated leader for your project to coordinate specialists, enforce deadlines, and ensure quality 
                  control. Our strategic approach turn complex projects into seamless journeys.
                </p>
              </div>
            </div>

            {/* Interior Card */}
            <div
              ref={card3Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[500px]"
              style={{
                backgroundImage: `url(${businessInterior})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute bottom-0 left-0 w-full" style={{ pointerEvents: 'none' }}>
                 <div
                  className="w-full"
                  style={{
                    height: '230px', // Adjust this value to match the text block height
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,1) 100%)',
                  }}
                />
              </div>
              <div className="relative flex flex-col justify-end items-center text-center h-full p-2">
                <h3 className="text-4xl text-white mb-14 tracking-wider">INTERIORS</h3>
                <p className="text-white text-l mb-4 w-full text-justify px-4">
                  Residential or commercial, Sovran Interiors delivers more than bespoke design — with Knight Frank 
                  experience, we create interiors proven to enrich lifestyles and increase property value.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticalsSection;
