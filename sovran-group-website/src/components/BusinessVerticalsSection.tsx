import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. load all SVGs from /src/assets/svgs
// @ts-ignore
const svgContext = require.context('../assets/svgs', false, /\.svg$/);
const svgPaths = svgContext.keys().map(svgContext);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BusinessVerticalsSection: React.FC = () => {
  // References for the text animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  // 3. ref for the dynamic decoration
  const decorRef = useRef<HTMLDivElement>(null);

  // 2. state to hold one random SVG URL
  const [randomSvg, setRandomSvg] = useState<string>('');

  // GSAP animations for the text
  useEffect(() => {
    // capture ref values locally
    const headingEl = headingRef.current;
    const cardsEls = [card1Ref.current, card2Ref.current, card3Ref.current];
    const decorEl = decorRef.current;

    // Simplified heading animation to ensure visibility
    if (headingEl) {
      // First make sure the heading is visible
      gsap.set(headingEl, { opacity: 1 });

      // Simple animation for the heading
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

    // Card animations with staggered reveal
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

    // First, ensure cards are visible with proper opacity
    cards.forEach((card) => {
      if (card) {
        gsap.set(card, { opacity: 1, y: 0 });
      }
    });

    // Then apply the animations
    cards.forEach((card, index) => {
      if (card) {
        // Card animation - using to instead of from to ensure cards remain visible
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

        // Simplified title animation to ensure visibility
        const title = card.querySelector('h3');
        if (title) {
          // Make sure the title is visible first
          gsap.set(title, { opacity: 1 });

          // Simple animation that's less likely to cause visibility issues
          gsap.fromTo(
            title,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
              },
            }
          );
        }

        // Paragraph animation
        const paragraph = card.querySelector('p');
        if (paragraph) {
          // Make sure paragraph is visible
          gsap.set(paragraph, { opacity: 1 });

          // Simple animation
          gsap.fromTo(
            paragraph,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.3 + index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
              },
            }
          );
        }
      }
    });

    // pick one SVG at mount
    const pick = svgPaths[Math.floor(Math.random() * svgPaths.length)];
    setRandomSvg(pick);

    // animate when it enters viewport
    if (decorEl) {
      gsap.fromTo(
        decorEl,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: decorEl,
            start: 'top 95%',
          },
        }
      );
    }

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // use captured refs in cleanup
      const elements = [headingEl, ...cardsEls];
      elements.forEach((el) => el && gsap.set(el, { clearProps: 'all' }));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Oversized "S" in the background */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontSize: '90rem',
          lineHeight: '0',
          top: '-25rem',
          left: '-15rem',
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <span className="ivymode-bold text-black">S</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-left mb-16">
          <h2 className="text-[#CDAD7D] text-base uppercase tracking-wider mb-1 font-medium">
            OUR SERVICES
          </h2>
          <h3
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-6xl text-dark-900 ivymode-regular"
          >
            Our business verticals
          </h3>
        </div>

        <div className="flex items-center">
          {/* Left side - Rotating gear */}

          {/* Right side - Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
            {/* Sovran Design Card */}
            <div
              ref={card1Ref}
              className="bg-white border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 p-8"
              style={{ opacity: 1 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-semibold text-black mb-4">
                    Sovran Design
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 flex-grow">
                  From custom homes to large-scale renovations, Sovran Builders
                  delivers end-to-end construction solutions with precision and
                  care. We focus on lasting quality across every project
                </p>
                <div>
                  <Link
                    to="/sovran-design"
                    className="text-[#CDAD7D] hover:text-[#CDAD7D]/80 text-sm font-normal flex items-center"
                  >
                    View details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sovran Builders Card */}
            <div
              ref={card2Ref}
              className="bg-white border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 p-8"
              style={{ opacity: 1 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-semibold text-black mb-4">
                    Sovran Builders
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 flex-grow">
                  We specialize in high-end, custom designs tailored to your
                  lifestyle. From kitchens to full home concepts, Sovran Design
                  brings vision and architecture together with creativity and
                  detail.
                </p>
                <div>
                  <Link
                    to="/sovran-builders"
                    className="text-[#CDAD7D] hover:text-[#CDAD7D]/80 text-sm font-normal flex items-center"
                  >
                    View details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sovran Interiors Card */}
            <div
              ref={card3Ref}
              className="bg-white border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 p-8"
              style={{ opacity: 1 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-semibold text-black mb-4">
                    Sovran Interiors
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 flex-grow">
                  Sovran Interiors crafts elegant furniture and interiors that
                  reflect who you are. From walk-in wardrobes to home offices, we
                  create stylish, functional spaces for modern living.
                </p>
                <div>
                  <Link
                    to="/sovran-interiors"
                    className="text-[#CDAD7D] hover:text-[#CDAD7D]/80 text-sm font-normal flex items-center"
                  >
                    View details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 30°-60°-90° Triangle decoration */}
        <div ref={decorRef} className="relative mt-8">
          {randomSvg && (
            <img
              src={randomSvg}
              alt="decorative"
              className="w-32 h-32 absolute -top-10 right-0 z-20"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticalsSection;
