import React, { useRef, useEffect, useState } from 'react';
import ArrowButton from './ArrowButton';

const HeroSectionMobile: React.FC = () => {
  const [projectCount, setProjectCount] = useState(785);
  const maxCount = 855;
  const countingRef = useRef<number | null>(null);

  useEffect(() => {
    // lightweight counter for visual parity with desktop
    countingRef.current = window.setInterval(() => {
      setProjectCount(prev => {
        const inc = Math.random() > 0.6 ? 2 : 1;
        const next = prev + inc;
        if (next >= maxCount && countingRef.current) {
          window.clearInterval(countingRef.current);
          countingRef.current = null;
          return maxCount;
        }
        return next;
      });
    }, 2100);

    return () => {
      if (countingRef.current) window.clearInterval(countingRef.current);
    };
  }, []);

  return (
  <section className="block md:hidden bg-[#081E27] text-white pt-4 mt-12 pb-8 hero-mobile-pullup">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
    <h1 className="text-3xl sm:text-4xl font-serif tracking-wide leading-tight mb-3 ivymode-regular text-center">
      <span className="block">We Add <span className="text-primary-600">Space</span>,</span>
      <span className="block"><span className="text-primary-600">Value</span>, and <span className="text-primary-600">Style</span> to <br/>Your Property</span>
    </h1>

    <p className="text-gray-400 text-sm mb-3 text-center"> Trusted by <span className="font-semibold">{projectCount}+</span> families &amp; property owners</p>


          {/* Mobile-first video placed between heading and CTAs */}
          <div className="w-full mb-4 ml-7 rounded-md overflow-hidden  scale-125">
            <video
              className="w-full h-auto object-cover"
              src="/assets/hero/screen-capture_1.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>


          <ul className="space-y-2 text-gray-300 text-sm text-center mb-6 mt-8">
            <li className="flex items-start gap-2 items-center justify-center text-center">
              <span className="w-4 h-4 rounded-full bg-[#CDAD7D]/20 flex items-center justify-center text-[#CDAD7D]">●</span>
              <span>UK’s top luxury property remodeling brand</span>
            </li>
            <li className="flex items-start gap-2 items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-[#CDAD7D]/20 flex items-center justify-center text-[#CDAD7D]">●</span>
              <span>Led by integrity, willingness, &amp; transparency</span>
            </li>
            <li className="flex items-start gap-2 items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-[#CDAD7D]/20 flex items-center justify-center text-[#CDAD7D]">●</span>
              <span>96% of our clients will recommend us</span>
            </li>
          </ul>



          <div className="flex flex-col gap-3 items-center">
            <ArrowButton text="Request a Consultation" to="/contact" className="text-primary-500" />
            <ArrowButton text="See Our Work" to="/contact" />
          </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
