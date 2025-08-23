import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Testimonial Type
interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.",
    author: "Emilia Clarke",
    position: "Manager Avenger company",
    avatar: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090"
  },
  {
    id: 2,
    text: "Their attention to detail and commitment to quality craftsmanship transformed our space into something truly exceptional. From concept to completion, they managed everything with utmost professionalism.",
    author: "Robert Johnson",
    position: "Homeowner in Kensington",
    avatar: "/images/MrWardrobe-Design-support-e1688585963867.jpg"
  },
  {
    id: 3,
    text: "As a property developer, I've worked with many interior specialists, but Sovran Group stands out with their efficiency and exceptional results. Their white label services have been a game-changer for my business.",
    author: "Sarah Williams",
    position: "Director at Urban Properties",
    avatar: "/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg"
  }
];

const TestimonialSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const text = el.textContent || '';
    el.textContent = '';
    const letters = text.split('').map((c) => {
      const s = document.createElement('span');
      s.textContent = c === ' ' ? '\u00A0' : c;
      s.style.display = 'inline-block';
      s.style.filter = 'blur(4px)';
      s.style.opacity = '0';
      return s;
    });
    letters.forEach((s) => el.appendChild(s));

    const animation = gsap.timeline({ paused: true }).to(letters, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 0.7,
      stagger: 0.03,
      ease: 'power2.out'
    });

    const trig = ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => animation.play(), onLeaveBack: () => animation.pause(0), onEnterBack: () => animation.play(), once: false });

    return () => {
      trig.kill(true);
      animation.kill();
    };
  }, []);

  const handleDotClick = (i: number) => setActiveIndex(i);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="text-primary-500 text-sm font-lato uppercase tracking-wider">TESTIMONIAL</span>
            </div>

            <h2 ref={headingRef} className="text-4xl md:text-5xl text-black mb-12 ivymode-regular">Proven Expertis, Tangible Results</h2>

            <div>
              <div className="min-h-[220px]">
                {testimonials.map((t, idx) => (
                  <div key={t.id} className={`transition-opacity duration-500 ${idx === activeIndex ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <div className="relative">
                      <div className="absolute -left-8 -top-8 text-primary-500/20 text-8xl font-serif">"</div>

                      <div className="bg-white border border-gray-200 rounded-xl p-8 pl-28 md:pl-36">
                        <p className="text-lg md:text-xl text-black/90 mb-6 font-lato">"{t.text}"</p>
                        <div className="pl-2">
                          <h4 className="text-black text-lg ">{t.author}</h4>
                          <p className="text-gray-600 text-sm">{t.position}</p>
                        </div>
                      </div>

                      {t.avatar && (
                        <div className="absolute -left-6 -bottom-6 w-36 h-48 rounded-md overflow-hidden border-2 border-primary-500/30 bg-white">
                          <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mt-10 space-x-3">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => handleDotClick(i)} className={`w-3 h-3 rounded-full transition-colors ${i === activeIndex ? 'bg-primary-500' : 'bg-gray-600 hover:bg-gray-500 border border-gray-500'}`} aria-label={`View testimonial ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Why We're Different */}
          <div className="lg:col-span-5 bg-primary-50 p-10 rounded-xl border border-gray-200">
            

            {/* Highlight lines with inline numbers, icons and dividers */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-center py-3 border-b border-gray-200">
                {/* icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-4 text-lg text-black font-lato">385+ properties transformed</p>
              </div>

              <div className="flex items-center py-3 border-b border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-4 text-lg text-black font-lato">£5M+ projects delivered</p>
              </div>

              <div className="flex items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-4 text-lg text-black font-lato">15+ years combined leadership</p>
              </div>
            </div>

            <div className="inline-block">
              <a href="/contact" className="bg-primary-500 text-dark-900 font-lato py-3 px-8 rounded-md hover:bg-primary-400 transition-colors duration-300 text-lg">
                Get a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

