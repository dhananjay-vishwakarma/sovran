import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowButton from './ArrowButton';

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
    avatar: "/images/MrWardrobe-Magazine--739x1024.jpg"
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
    
    // Prepare the text for animation
    const text = el.textContent || '';
    el.textContent = '';
    const letters = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.filter = 'blur(4px)';
      span.style.opacity = '0';
      return span;
    });
    letters.forEach((span) => el.appendChild(span));
    
    // Create animation that triggers when scrolled into view
    const animation = gsap.timeline({paused: true})
      .to(letters, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power2.out'
      });
    
    // Create ScrollTrigger to play animation when element enters viewport
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%", // Animation starts when top of element is 80% from top of viewport
      onEnter: () => animation.play(),
      onLeaveBack: () => animation.pause(0), // Reset animation when scrolling back up and element leaves viewport
      onEnterBack: () => animation.play(), // Play animation again when scrolling back into view
      once: false // Allow animation to trigger multiple times
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
      animation.kill();
    };
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Testimonials */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="text-primary-500 text-sm font-lato uppercase tracking-wider">TESTIMONIAL</span>
            </div>
            
            <h2 ref={headingRef} className="text-4xl md:text-5xl text-black mb-12 ivymode-regular">
              What our customers say
            </h2>
            
            <div className="relative">
              {/* Testimonial Quote Mark */}
              <div className="absolute -left-6 -top-6 text-primary-500/20 text-8xl font-serif">"</div>
              
              {/* Testimonial Content */}
              <div className="min-h-[180px]">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0 hidden'}`}
                  >
                    <p className="text-lg md:text-xl text-black/90 mb-8 font-lato relative z-10">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center">
                      {testimonial.avatar && (
                        <div className="mr-4 w-14 h-14 rounded-full overflow-hidden border-2 border-primary-500/50">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-black text-lg font-semibold">{testimonial.author}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Dots */}
              <div className="flex mt-10 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-primary-500' : 'bg-gray-600 hover:bg-gray-500 border border-gray-500'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Why We're Different */}
          <div className="lg:col-span-5 bg-gray-100 p-10 rounded-xl border border-gray-200">
            <h3 className="text-2xl md:text-3xl text-black mb-6 ivymode-regular">
              Why we're different
            </h3>
            
            <p className="text-gray-700 mb-8 font-lato">
              As fellow entrepreneurs, we understand the need for space which gives your business room
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Flexible solutions",
                "Free technology",
                "Improved operating conditions",
                "Transparent costs"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-black font-lato">{feature}</span>
                </li>
              ))}
            </ul>
            
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
