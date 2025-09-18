import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/testimonial-carousel.css';

// Register ScrollTrigger plugin safely
try {
  // @ts-ignore
  if (!gsap.__plugins || !gsap.__plugins.some((p: any) => p.name === 'ScrollTrigger')) {
    gsap.registerPlugin(ScrollTrigger);
  }
} catch (err) {
  gsap.registerPlugin(ScrollTrigger);
}

// Additional styles for testimonial
const additionalStyles = `
  .testimonial-client-avatar {
    transition: all 0.3s ease;
  }
  .testimonial-client-avatar:hover {
    transform: scale(1.1);
  }
  .testimonial-avatar {
    border-color: #CDAD7D;
  }
  .star-rating {
    display: inline-flex;
    transition: all 0.3s ease;
  }
  .star-rating i:hover {
    transform: scale(1.2);
  }
  .testimonial-container {
    position: relative;
    overflow: hidden;
  }
  .testimonial-item {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
  }
`;

// Testimonial Type
interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  avatar?: string;
  clientAvatar?: string;
}

// Modal interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  author: string;
  position: string;
}

// Profile images array removed as we're using the pre-defined images in testimonials

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "\"5 Years of Successfull Partnership\"\n\nWe've worked with Sovran for over five years on multiple developments. Their consistency, attention to detail, and reliability keep us coming back...they deliver exactly what high-value projects demand.",
    author: "Marcus O'Neill",
    position: "Prestigious real estate Developer",
    avatar: "/assets/avatar/1.png",
    clientAvatar: "/assets/avatar/Marcus-O-Neill.png"
  },
  {
    id: 2,
    text: "\"Went Beyond Our Expectation\"\n\nThey understood our vision and went above and beyond their limits to deliver it. The final results are even better than our expectations. I would definitely recommend / use the team again for future renovations!",
    author: "Nyla Idrissi",
    position: "Contemporary New Build",
    avatar: "/assets/avatar/2.png",
    clientAvatar: "/assets/avatar/Nyla-Idrissi.png"
  },
  {
    id: 3,
    text: "\"MILITARY LEVEL PRECISION\"\n\nWhat impressed us most was discretion. Sovran worked in our home quietly, respectfully, with military precision. The result is stunning, but the experience itself was priceless — a team you can truly trust.",
    author: "Shiv Patel",
    position: "Extension & Renovation",
    avatar: "/assets/avatar/3.png",
    clientAvatar: "/assets/avatar/Shiv-Patel.png"
  }
];

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, author, position }) => {
  // Always initialize refs and hooks, regardless of whether the modal is open
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Only reset overflow if we previously changed it
      if (isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Early return after all hooks have been called
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 modal-overlay"
      onClick={handleClickOutside}
    >
      <div 
        ref={modalContentRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl modal-content"
      >
                  <div className="p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-medium text-[#081E27] ivymode-regular">{title}</h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="text-lg text-dark-900/90 font-lato leading-relaxed">{content}</p>
            </div>
          <div className="mt-auto border-t border-gray-200 pt-4">
            <h4 className="text-[#081E27] text-lg font-medium">{author}</h4>
            <p className="text-gray-600 text-sm">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [randomizedTestimonials, setRandomizedTestimonials] = useState<Testimonial[]>([]);
  
  // Position control settings (x, y coordinates and z-index)
  const [positions, setPositions] = useState({
    avatarX: -130, // Controls left/right position of project image
    avatarY: 167, // Controls top/bottom position of project image (higher values move it down)
    arrowsY: 94, // Controls top position of navigation arrows
    arrowsZ: 20, // Controls z-index of navigation arrows
    clientInfoY: -20, // Controls top margin of client info section
    containerHeight: 340, // Controls height of testimonial container
    rightColumnHeight: 340, // Controls height of right column
  });
  
  // Project counter animation
  const [projectCount, setProjectCount] = useState(785);
  const maxCount = 835; // 785 + 50
  const countingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use testimonial images sequentially (no randomization)
  useEffect(() => {
    // Simply use the images directly from the testimonials array
    // without any randomization
    setRandomizedTestimonials(testimonials);
  }, []);

  // Text animation effect
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Add the additional styles to the document head
    const styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(additionalStyles));
    document.head.appendChild(styleEl);

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

    const trig = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        console.log('[Testimonial] heading onEnter, playing animation');
        animation.play();
      },
      onLeaveBack: () => {
        console.log('[Testimonial] heading onLeaveBack, resetting animation');
        animation.pause(0);
      },
      onEnterBack: () => {
        console.log('[Testimonial] heading onEnterBack, playing animation');
        animation.play();
      },
      once: false,
    });

    // Ensure ScrollTrigger measurements are up-to-date
    setTimeout(() => {
      try {
        ScrollTrigger.refresh();
        console.log('[Testimonial] ScrollTrigger refreshed after creating heading trigger');
      } catch (e) {
        console.warn('[Testimonial] ScrollTrigger.refresh failed', e);
      }
    }, 50);

    return () => {
      trig.kill(true);
      animation.kill();
      
      // Remove the additional styles
      const styleEl = document.querySelector('style[type="text/css"]');
      if (styleEl && styleEl.textContent?.includes('testimonial-client-avatar')) {
        styleEl.remove();
      }
    };
  }, []);
  
  // Auto-rotation effect
  useEffect(() => {
    const startAutoRotate = () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
      
      autoRotateTimerRef.current = setInterval(() => {
        setSlideDirection('right');
        setActiveIndex(prevIndex => (prevIndex + 1) % randomizedTestimonials.length);
      }, 5000); // Change testimonial every 5 seconds
    };
    
    // Only start auto-rotation if we have testimonials
    if (randomizedTestimonials.length > 0) {
      startAutoRotate();
    }
    
    // Cleanup function
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [randomizedTestimonials.length]);
  
  // Counter animation for project count
  useEffect(() => {
    // Start the counter interval
    countingIntervalRef.current = setInterval(() => {
      setProjectCount(prevCount => {
        // Randomly increment by 1 or 2
        const increment = Math.random() > 0.5 ? 1 : 2;
        const newCount = prevCount + increment;
        
        // If we reached or exceeded the max, clear the interval and return exactly the max
        if (newCount >= maxCount) {
          if (countingIntervalRef.current) {
            clearInterval(countingIntervalRef.current);
            countingIntervalRef.current = null;
          }
          return maxCount;
        }
        
        return newCount;
      });
    }, Math.floor(Math.random() * 3000) + 2000); // Random interval between 2-5 seconds
    
    // Cleanup function
    return () => {
      if (countingIntervalRef.current) {
        clearInterval(countingIntervalRef.current);
      }
    };
  }, []);
  
  // Handle navigation
  const handleDotClick = (i: number) => {
    setSlideDirection(i > activeIndex ? 'right' : 'left');
    setActiveIndex(i);
    resetAutoRotateTimer();
  };
  
  // Navigation arrows
  const handlePrevious = () => {
    setSlideDirection('left');
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? randomizedTestimonials.length - 1 : prevIndex - 1
    );
    resetAutoRotateTimer();
  };
  
  const handleNext = () => {
    setSlideDirection('right');
    setActiveIndex(prevIndex => 
      (prevIndex + 1) % randomizedTestimonials.length
    );
    resetAutoRotateTimer();
  };
  
  // Reset auto-rotation timer when manually changing
  const resetAutoRotateTimer = () => {
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setInterval(() => {
        setSlideDirection('right');
        setActiveIndex(prevIndex => (prevIndex + 1) % randomizedTestimonials.length);
      }, 5000);
    }
  };

  // Modal functionality
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    author: '',
    position: ''
  });

  const openModal = (title: string, content: string, author: string, position: string) => {
    // Extract the title from the content if it exists in the format "TITLE"\n\nContent
    let modalTitle = title;
    let modalContent = content;
    
    if (content.includes('\n\n')) {
      const parts = content.split('\n\n');
      // Use the quoted title part as the modal title
      modalTitle = parts[0].replace(/\"/g, '');
      // Use just the content part for the modal content
      modalContent = parts[1];
    }
    
    setModalContent({
      title: modalTitle,
      content: modalContent,
      author,
      position
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 250) => {
    // Don't include the title part in the length calculation if it's in the format "TITLE"\n\nContent
    if (!text) return "";
    
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength to avoid cutting words
    const lastSpaceIndex = text.substring(0, maxLength).lastIndexOf(' ');
    const truncatedText = text.substring(0, lastSpaceIndex > 0 ? lastSpaceIndex : maxLength);
    
    return truncatedText + '...';
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-2 max-w-7xl">
        <div className="mb-4">
          <span className="text-primary-500 text-sm font-lato uppercase tracking-wider">TESTIMONIAL</span>
        </div>

        <h2 ref={headingRef} className="text-4xl md:text-5xl text-[#081E27] mb-28 ivymode-regular">Proven Expertise, Tangible Results</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <div>
              <div className="relative">
                {/* Previous Arrow with dynamic position */}
                <button 
                  onClick={handlePrevious}
                  className="absolute left-0 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 -ml-5"
                  style={{
                    top: `${positions.arrowsY}px`,
                    zIndex: positions.arrowsZ
                  }}
                  aria-label="Previous testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#081E27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next Arrow with dynamic position */}
                <button 
                  onClick={handleNext}
                  className="absolute right-0 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 -mr-5"
                  style={{
                    top: `${positions.arrowsY}px`,
                    zIndex: positions.arrowsZ
                  }}
                  aria-label="Next testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#081E27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              
                <div 
                  ref={testimonialContainerRef}
                  className="testimonial-container relative overflow-visible"
                  style={{ minHeight: `${positions.containerHeight}px` }}
                >
                  {randomizedTestimonials.map((t, idx) => (
                    <div key={t.id} 
                      className={`testimonial-item absolute top-0 left-0 w-full transition-all duration-500 ease-in-out transform ${
                        idx === activeIndex 
                        ? 'opacity-100 translate-x-0 z-10' 
                        : slideDirection === 'right'
                          ? idx < activeIndex 
                            ? 'opacity-0 -translate-x-full z-0' 
                            : 'opacity-0 translate-x-full z-0'
                          : idx < activeIndex 
                            ? 'opacity-0 translate-x-full z-0' 
                            : 'opacity-0 -translate-x-full z-0'
                      }`}
                    >
                      <div className="relative">
                        <div className="absolute -left- -top-8 text-primary-500/20 text-8xl font-serif">"</div>

                        <div className="bg-white border border-gray-200 rounded-xl p-8 pl-12 md:pl-40 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary-100">
                          {/* Testimonial title section - separated from content */}
                          {t.text.includes("\"") && (
                            <div className="mb-4 text-center">
                              <h3 className="text-xl md:text-2xl font-medium text-[#081E27] ivymode-regular">
                                "{t.text.split("\n\n")[0].replace(/\"/g, "")}"
                              </h3>
                            </div>
                          )}
                          
                          {/* Testimonial content */}
                          <div className="h-[150px] overflow-hidden mb-2"> {/* Adjusted height */}
                            <p className="testimonial-text text-lg md:text-xl text-dark-900/90 font-lato leading-relaxed">
                              {truncateText(t.text.split("\n\n")[1] || t.text)}
                              {(t.text.split("\n\n")[1] || t.text).length > 250 && (
                                <button 
                                  onClick={() => openModal("Client Testimonial", t.text, t.author, t.position)}
                                  className="text-primary-500 font-medium hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-sm transition-all duration-200"
                                  aria-label={`Read full testimonial for ${t.author}`}
                                >
                                  Read more
                                </button>
                              )}
                            </p>
                            
                            {/* 5-star rating - centered below the text */}
                            <div className="flex justify-center items-center star-rating mt-2 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <img 
                                  key={i} 
                                  src="/assets/icon/500w/SVG/8GoPIo.svg" 
                                  alt="Star" 
                                  className="w-6 h-6 mx-1" />
                              ))}
                            </div>
                          </div>
                          
                          <div className="pl-2 pb-4" style={{ marginTop: `${positions.clientInfoY}px` }}>
                            <div className="flex items-end mb-1">
                              {/* Client avatar directly before the name */}
                              {t.clientAvatar && (
                                <div className="w-24 h-24 rounded-full overflow-hidden border border-primary-500/30 mr-4 flex-shrink-0 shadow-md">
                                  <img src={t.clientAvatar} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="mb-2">
                                <h4 className="text-[#081E27] text-lg">{t.author}</h4>
                                <p className="text-gray-600 text-sm">{t.position}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {t.avatar && (
                          <div 
                            className="testimonial-avatar absolute rounded-md overflow-hidden border-2 border-primary-500/30 bg-white shadow-lg" 
                            style={{ 
                              width: '260px', 
                              height: '240px', 
                              left: `${positions.avatarX}px`, 
                              top: `${positions.avatarY}px`,
                              zIndex: 15
                            }}
                          >
                            <img src={t.avatar} alt="Project" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-14 space-x-3">
                {randomizedTestimonials.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleDotClick(i)} 
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      i === activeIndex 
                      ? 'bg-primary-500 dot-active scale-110' 
                      : 'bg-gray-400 hover:bg-gray-500 hover:scale-105'
                    }`} 
                    aria-label={`View testimonial ${i + 1}`}
                    aria-current={i === activeIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Why We're Different */}
          <div className="lg:col-span-4 flex flex-col">
            <div 
              className="bg-[#FFFCF5] p-10 rounded-xl border border-gray-100 flex flex-col h-full"
            >
              {/* Stats with separating lines */}
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex items-center py-3 border-b border-gray-200">
                  <img src="/assets/icon/500w/clients.png" alt="Clients Icon" className="h-10 w-10 opacity-40" />
                  <p className="ml-5 text-lg text-[#081E27] font-lato">{projectCount}+ Satisfied Clients</p>
                </div>

                <div className="flex items-center py-3 border-b border-gray-200">
                  <img src="/assets/icon/500w/projects.png" alt="Projects Icon" className="h-10 w-10 opacity-40" />
                  <p className="ml-5 text-lg text-[#081E27] font-lato">£50K-5M+ Projects Delivered</p>
                </div>

                <div className="flex items-center py-3">
                  <img src="/assets/icon/500w/experience.png" alt="Experience Icon" className="h-10 w-10 opacity-40" />
                  <p className="ml-5 text-lg text-[#081E27] font-lato">20+ Years Leadership Experience</p>
                </div>
              </div>

              {/* Button centered and contained within the box */}
              <div className="flex justify-center mt-auto">
                <a 
                  href="/contact" 
                  className="block text-center bg-[#081E27] text-white py-4 px-6 rounded-[30px] hover:bg-[#0d2935] transition-all duration-300 text-base uppercase tracking-[0.09em] ivymode-regular"
                >
                  CHECK OUR AVAILABILITY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Position Controls - Only visible in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <div className="container mx-auto mt-12 mb-6 px-4 max-w-5xl">
          <div className="p-4 border border-gray-300 rounded-lg bg-white shadow">
            <h3 className="font-medium text-xl text-gray-700 mb-4">Position Controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="avatarX" className="block text-sm font-medium text-gray-700">Avatar X: {positions.avatarX}px</label>
                <input 
                  id="avatarX" 
                  type="range" 
                  min="-150" 
                  max="150" 
                  value={positions.avatarX} 
                  onChange={(e) => setPositions({...positions, avatarX: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="avatarY" className="block text-sm font-medium text-gray-700">Avatar Y: {positions.avatarY}px</label>
                <input 
                  id="avatarY" 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={positions.avatarY} 
                  onChange={(e) => setPositions({...positions, avatarY: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="arrowsY" className="block text-sm font-medium text-gray-700">Arrows Y: {positions.arrowsY}px</label>
                <input 
                  id="arrowsY" 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={positions.arrowsY} 
                  onChange={(e) => setPositions({...positions, arrowsY: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="arrowsZ" className="block text-sm font-medium text-gray-700">Arrows Z-index: {positions.arrowsZ}</label>
                <input 
                  id="arrowsZ" 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={positions.arrowsZ} 
                  onChange={(e) => setPositions({...positions, arrowsZ: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="clientInfoY" className="block text-sm font-medium text-gray-700">Client Info Y: {positions.clientInfoY}px</label>
                <input 
                  id="clientInfoY" 
                  type="range" 
                  min="-20" 
                  max="40" 
                  value={positions.clientInfoY} 
                  onChange={(e) => setPositions({...positions, clientInfoY: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="containerHeight" className="block text-sm font-medium text-gray-700">Container Height: {positions.containerHeight}px</label>
                <input 
                  id="containerHeight" 
                  type="range" 
                  min="200" 
                  max="500" 
                  value={positions.containerHeight} 
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPositions({...positions, containerHeight: value, rightColumnHeight: value})
                  }}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="rightColumnHeight" className="block text-sm font-medium text-gray-700">Right Col Height: {positions.rightColumnHeight}px</label>
                <input 
                  id="rightColumnHeight" 
                  type="range" 
                  min="200" 
                  max="500" 
                  value={positions.rightColumnHeight} 
                  onChange={(e) => setPositions({...positions, rightColumnHeight: parseInt(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        title="Client Testimonial"
        content={modalContent.content}
        author={modalContent.author}
        position={modalContent.position}
      />
    </section>
  );
};

export default TestimonialSection;

