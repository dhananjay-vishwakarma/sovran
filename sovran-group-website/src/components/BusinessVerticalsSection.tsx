import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Import images from src/assets/images
import businessArch from '../assets/images/AdobeStock_190403814.jpeg';
import businessBuild from '../assets/images/After.jpg';
import businessInterior from '../assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg';


// Load all SVGs from /src/assets/svgs
// @ts-ignore
const svgContext = require.context('../assets/svgs', false, /\.svg$/);
const svgPaths = svgContext.keys().map(svgContext);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BusinessVerticalsSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const marquee3Ref = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const [randomSvg, setRandomSvg] = useState<string>('');

  useEffect(() => {
    const headingEl = headingRef.current;
    const cardsEls = [card1Ref.current, card2Ref.current, card3Ref.current];
    const decorEl = decorRef.current;

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

// Setup marquees
const marqueeContainers = [marquee1Ref.current, marquee2Ref.current, marquee3Ref.current];
marqueeContainers.forEach((container) => {
  if (!container) return;
  const content = container.querySelector('.marquee-content') as HTMLElement | null;
  if (!content) return;

  (container as HTMLElement).style.overflow = 'hidden';
  (container as HTMLElement).style.whiteSpace = 'nowrap';
  (container as HTMLElement).style.position = 'relative';
  (container as HTMLElement).style.height = '1.4rem';
  content.style.display = 'inline-block';

  const containerWidth = container.offsetWidth || 300;
  const contentWidth = content.offsetWidth || 300;
  const distance = containerWidth + contentWidth;

  // Function to generate random speed
  const getRandomDuration = () => Math.max(8, distance / (40 + Math.random() * 40)); // random speed

  gsap.set(content, { x: -contentWidth });

  const tween = gsap.to(content, {
    x: containerWidth,
    duration: getRandomDuration(),
    ease: 'linear',
    repeat: -1,
    onRepeat: () => {
      tween.duration(getRandomDuration()); // change speed on each repeat
    },
  });

  // Pause on hover
  container.addEventListener('mouseenter', () => tween.pause());
  container.addEventListener('mouseleave', () => tween.play());

  ScrollTrigger.create({
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => tween.play(),
    onEnterBack: () => tween.play(),
    onLeave: () => tween.pause(),
    onLeaveBack: () => tween.pause(),
  });
});

    // Pick one SVG at mount
    const pick = svgPaths[Math.floor(Math.random() * svgPaths.length)];
    setRandomSvg(pick);

    if (decorEl && pick) {
      fetch(pick)
        .then((res) => res.text())
        .then((svgText) => {
          decorEl.innerHTML = svgText;
          const svg = decorEl.querySelector('svg');
          if (!svg) return;
          svg.setAttribute('class', 'w-72 h-32 absolute -top-10 right-0 z-20');
        })
        .catch(() => {
          decorEl.innerHTML = `<img src="${pick}" class="w-72 h-32 absolute -top-10 right-0 z-20" alt="decorative" />`;
        });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (decorEl) decorEl.innerHTML = '';
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Oversized "S" */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontSize: '100rem',
          lineHeight: '0',
          top: '10rem',
          left: '-50rem',
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

            {/* Architectural Design Card */}
            <div
              ref={card2Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[400px]"
              style={{
                backgroundImage: `url(${businessArch})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative p-8 flex flex-col justify-end h-full">
                <h3 className="text-4xl text-white mb-2">Architectural</h3>
                <div ref={marquee2Ref} className="marquee-container">
                  <div className="marquee-content text-sm text-white/90">
                    Planning &amp; Building Regulations · Structural Engineering · 3D Renders &amp; Visualisation · Projects / Portfolio
                  </div>
                </div>
              </div>
            </div>

            {/* Build Card */}
            <div
              ref={card1Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[400px]"
              style={{
                backgroundImage: `url(${businessBuild})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative p-8 flex flex-col justify-end h-full">
                <h3 className="text-4xl text-white mb-2">Build</h3>
                <div ref={marquee1Ref} className="marquee-container">
                  <div className="marquee-content text-sm text-white/90">
                    Residential Construction · Renovations · New Builds · Extensions · Loft Conversions · Basements · Landscaping · Swimming Pools · Commercial Construction · Office Spaces · Retail
                  </div>
                </div>
              </div>
            </div>

            {/* Interior Card */}
            <div
              ref={card3Ref}
              className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#CDAD7D] transition-colors duration-300 h-[400px]"
              style={{
                backgroundImage: `url(${businessInterior})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative p-8 flex flex-col justify-end h-full">
                <h3 className="text-4xl text-white mb-2">Interior</h3>
                <div ref={marquee3Ref} className="marquee-container">
                  <div className="marquee-content text-sm text-white/90">
                    Bespoke Areas · Foyers · Living Rooms · Bathrooms · Master Suites · Cinema · Offices · Bars · Wine Cellars · Wardrobes · Dressing Rooms · Kitchens · Contemporary · Traditional
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decoration */}
        <div ref={decorRef} className="relative mt-8">
          {randomSvg && (
            <img
              src={randomSvg}
              alt="decorative"
              className="w-72 h-32 absolute -top-10 right-0 z-20"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticalsSection;
