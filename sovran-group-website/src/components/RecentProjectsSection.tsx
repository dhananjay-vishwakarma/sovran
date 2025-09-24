import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RecentProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(9);
  const [animationKey, setAnimationKey] = useState(0); // Key to force animation refresh

  // Initialize animations for revealed images
  const initializeAnimations = () => {
    // Clear only ScrollTrigger instances that belong to this section
    const killTriggersInSection = () => {
      try {
        const all = ScrollTrigger.getAll();
        all.forEach((t) => {
          const trigEl = t.trigger as Element | null;
          if (trigEl && sectionRef.current && sectionRef.current.contains(trigEl)) {
            t.kill();
          }
        });
      } catch (e) {
        // Fallback to safe behavior: don't kill global triggers
        console.warn('[RecentProjects] killTriggersInSection failed', e);
      }
    };
    killTriggersInSection();
    
    // Use a longer timeout to ensure DOM is fully updated
    setTimeout(() => {
      // Select only the new elements that haven't been animated yet
      const imageElements = document.querySelectorAll('.reveal-image');
      
      imageElements.forEach((element, index) => {
        // Apply animation to all elements after "Load More" is clicked
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 95%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              id: `image-${index}-${animationKey}`, // Unique ID using the animation key
            }
          }
        );
      });
      
      // Force ScrollTrigger to refresh after animations are set up
      ScrollTrigger.refresh();
    }, 300); // Longer delay to ensure DOM is fully updated
  };

  // Run animations on mount and when visibleItems or animationKey changes
  useEffect(() => {
    initializeAnimations();
    
    return () => {
      // Clean up only triggers that belong to this section when component unmounts
      try {
        const all = ScrollTrigger.getAll();
        all.forEach((t) => {
          const trigEl = t.trigger as Element | null;
          if (trigEl && sectionRef.current && sectionRef.current.contains(trigEl)) {
            t.kill();
          }
        });
      } catch (e) {
        console.warn('[RecentProjects] cleanup failed', e);
      }
    };
  }, [visibleItems, animationKey]);

  const portfolioItems = [
    {
      type: 'image',
      src: '/assets/images/portfolio/1.jpg',
    },
    {
      type: 'video',
      src: '/assets/images/portfolio/2.mp4',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/3.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/4.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/5.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/6.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/7.jpg',
    },
    {
      type: 'video',
      src: '/assets/images/portfolio/8.mp4',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/9.jpg',
    },
    // Additional 9 items
    {
      type: 'image',
      src: '/assets/images/portfolio/10.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/11.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/12.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/13.jpg',
    },
    // Note: File 14.jpg is missing, using 15.jpg as a fallback
    {
      type: 'video',
      src: '/assets/images/portfolio/14.mp4',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/15.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/16.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/17.jpg',
    },
    {
      type: 'image',
      src: '/assets/images/portfolio/18.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#081E27]"
    >
      <div className="max-w-full mx-auto">
        <div className="reveal-up text-center mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-white mb-2 ivymode">
            PORTFOLIO
          </h2>
          <p className="text-[#CDAD7D] text-sm uppercase tracking-wider">
            OUR RECENT WORK
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {portfolioItems.slice(0, visibleItems).map((item, index) => (
            <div key={`item-${index}-${animationKey}`} className="reveal-image group">
              <div className="relative rounded-lg overflow-hidden aspect-square">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Portfolio item ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if the image doesn't load
                      e.currentTarget.src = '/assets/images/portfolio/1.jpg';
                    }}
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={(e) => {
                      // Create a placeholder element if video doesn't load
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const img = document.createElement('img');
                        img.src = '/assets/images/portfolio/1.jpg';
                        img.alt = `Portfolio item ${index + 1}`;
                        img.className = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110";
                        parent.appendChild(img);
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <button 
            onClick={() => {
              if (visibleItems >= portfolioItems.length) {
                // When showing less, kill only animations inside this section, update count, and force refresh
                try {
                  const all = ScrollTrigger.getAll();
                  all.forEach((t) => {
                    const trigEl = t.trigger as Element | null;
                    if (trigEl && sectionRef.current && sectionRef.current.contains(trigEl)) {
                      t.kill();
                    }
                  });
                } catch (e) {
                  console.warn('[RecentProjects] kill-on-show-less failed', e);
                }
                setVisibleItems(9);
                // Force re-initialization of animations with a new key
                setAnimationKey(prevKey => prevKey + 1);
              } else {
                // When loading more, kill only animations inside this section, update count, and force refresh
                try {
                  const all = ScrollTrigger.getAll();
                  all.forEach((t) => {
                    const trigEl = t.trigger as Element | null;
                    if (trigEl && sectionRef.current && sectionRef.current.contains(trigEl)) {
                      t.kill();
                    }
                  });
                } catch (e) {
                  console.warn('[RecentProjects] kill-on-load-more failed', e);
                }
                setVisibleItems(prev => prev + 9);
                // Force re-initialization of animations with a new key
                setAnimationKey(prevKey => prevKey + 1);
              }
              
              // Force GSAP to update its internal state
              window.dispatchEvent(new Event('resize'));
            }}
            className="bg-white text-black font-lato py-3 px-8 rounded-full hover:bg-gray-100 hover:text-gray-800 transition-colors duration-300 text-lg text-center"
          >
            {visibleItems >= portfolioItems.length ? 'WORK WITH US' : 'LOAD MORE'}
          </button>
          <a href="/contact" className="bg-white text-black font-lato py-3 px-8 rounded-full hover:bg-gray-100 hover:text-gray-800 transition-colors duration-300 text-lg text-center">
            ASK A QUESTION
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;
