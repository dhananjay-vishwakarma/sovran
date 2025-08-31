import React, { useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/testimonial-carousel.css';

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

// Modal interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  author: string;
  position: string;
}

// Array of profile images that can be randomly assigned
// Replace these with your actual Dropbox links when available
const profileImages = [
  "/assets/images/032720_RH_M7_Develop.jpeg",
  "/assets/images/AdobeStock_1312472493.jpeg", 
  "/assets/images/After.jpg",
  "/assets/images/Aqib-10-Harold-Rd-027-scaled.jpg",
  "/assets/images/Background-image-for-finance-5-years-Taaj-Kitchens-1.png"
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Great work and very respectful team. Went above and beyond in many cases and got a great finishing. I would definitely recommend/ use the team again for future renovations!",
    author: "Kensington Home Renovation",
    position: "Residential Project",
    avatar: "/images/MrWardrobe-Design-support-e1688585963867.jpg"
  },
  {
    id: 2,
    text: "Have used Sovran for house extension and they have been very helpful. Their team assisted me and my family from the architectural plans to the completion of the construction work; they have been extremely supportive throughout and made the process very easy for us. Would recommend to anyone and prices are a bargain for the service you get in return.",
    author: "Harrow Double Storey Extension",
    position: "Extension Project",
    avatar: "/images/MrWardrobe-Design-support-e1688585963867.jpg"
  },
  {
    id: 3,
    text: "Really good guys, they are trustworthy and efficient. Had no issues and everything was taken care of. I got a loft extension for my son and they made it so spacious and decorated it very nicely. Any work I always come to these guys, they're easy to talk to and take care of everything for you.",
    author: "Ealing Loft Conversion",
    position: "Loft Project",
    avatar: "/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg"
  },
  {
    id: 4,
    text: "I spent so long trying to find genuine people that don't rip you off and I can honestly say I have finally found them!!! The guys at Sovran, especially Avtar and team has been super helpful and knowledgeable regarding our project. They are people I can truly trust and rely on - you'll know when you meet them! I got a rear extension built for our growing family, communication was great from start to finish and the finish was much more than what I could've asked for - they really know their stuff! If you're like me and struggle to find reliable people, I can assure you these guys are ones you can count on.",
    author: "Richmond Rear Extension",
    position: "Extension Project",
    avatar: "/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg"
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
            <p className="text-lg text-dark-900/90 font-lato leading-relaxed">"{content}"</p>
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
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [randomizedTestimonials, setRandomizedTestimonials] = useState<Testimonial[]>([]);
  
  // Randomize testimonial images on initial load
  useEffect(() => {
    const assignRandomImages = () => {
      return testimonials.map(testimonial => {
        const randomImageIndex = Math.floor(Math.random() * profileImages.length);
        return {
          ...testimonial,
          avatar: profileImages[randomImageIndex]
        };
      });
    };
    
    setRandomizedTestimonials(assignRandomImages());
  }, []);

  // Text animation effect
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

    const trig = ScrollTrigger.create({ 
      trigger: el, 
      start: 'top 80%', 
      onEnter: () => animation.play(), 
      onLeaveBack: () => animation.pause(0), 
      onEnterBack: () => animation.play(), 
      once: false 
    });

    return () => {
      trig.kill(true);
      animation.kill();
    };
  }, []);
  
  // Auto-rotation effect
  useEffect(() => {
    const startAutoRotate = () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
      
      autoRotateTimerRef.current = setInterval(() => {
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
  
  // Handle manual navigation
  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    
    // Reset auto-rotation timer when manually changing
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % randomizedTestimonials.length);
      }, 5000);
    }
  };
  
  // Drag functionality
  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleMouseStart = (e: MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (startX !== null && isDragging) {
      const endX = e.changedTouches[0].clientX;
      handleSwipe(endX - startX);
    }
    setStartX(null);
    setIsDragging(false);
  };
  
  const handleMouseEnd = (e: MouseEvent) => {
    if (startX !== null && isDragging) {
      const endX = e.clientX;
      handleSwipe(endX - startX);
    }
    setStartX(null);
    setIsDragging(false);
  };
  
  const handleSwipe = (deltaX: number) => {
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swiped right - show previous
        setActiveIndex(prevIndex => 
          prevIndex === 0 ? randomizedTestimonials.length - 1 : prevIndex - 1
        );
      } else {
        // Swiped left - show next
        setActiveIndex(prevIndex => 
          (prevIndex + 1) % randomizedTestimonials.length
        );
      }
      
      // Reset auto-rotation timer when manually changing
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = setInterval(() => {
          setActiveIndex(prevIndex => (prevIndex + 1) % randomizedTestimonials.length);
        }, 5000);
      }
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
    setModalContent({
      title,
      content,
      author,
      position
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 180) => {
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength to avoid cutting words
    const lastSpaceIndex = text.substring(0, maxLength).lastIndexOf(' ');
    const truncatedText = text.substring(0, lastSpaceIndex > 0 ? lastSpaceIndex : maxLength);
    
    return truncatedText + '...';
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <div className="mb-4">
              <span className="text-primary-500 text-sm font-lato uppercase tracking-wider">TESTIMONIAL</span>
            </div>

            <h2 ref={headingRef} className="text-4xl md:text-5xl text-[#081E27] mb-12 ivymode-regular">Proven Expertise, Tangible Results</h2>

            <div>
              <div 
                ref={testimonialContainerRef}
                className={`testimonial-container min-h-[220px] cursor-grab active:cursor-grabbing ${isDragging ? 'dragging' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseStart}
                onMouseUp={handleMouseEnd}
                onMouseLeave={(e) => isDragging && handleMouseEnd(e)}
              >
                {randomizedTestimonials.map((t, idx) => (
                  <div key={t.id} 
                    className={`testimonial-item transition-all duration-500 ease-in-out transform ${
                      idx === activeIndex 
                      ? 'opacity-100 scale-100 translate-x-0' 
                      : 'opacity-0 scale-95 translate-x-8 hidden'
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute -left-8 -top-8 text-primary-500/20 text-8xl font-serif">"</div>

                      <div className="bg-white border border-gray-200 rounded-xl p-8 pl-28 md:pl-36 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary-100">
                        <div className="h-[150px] overflow-hidden mb-6">
                          <p className="testimonial-text text-lg md:text-xl text-dark-900/90 font-lato leading-relaxed">
                            "{truncateText(t.text)}"
                            {t.text.length > 180 && (
                              <button 
                                onClick={() => openModal("Project Testimonial", t.text, t.author, t.position)}
                                className="text-primary-500 font-medium hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-sm transition-all duration-200"
                                aria-label={`Read full testimonial for ${t.author}`}
                              >
                                Read more
                              </button>
                            )}
                          </p>
                        </div>
                        <div className="pl-2">
                          <h4 className="text-[#081E27] text-lg font-medium">{t.author}</h4>
                          <p className="text-gray-600 text-sm">{t.position}</p>
                        </div>
                      </div>

                      {t.avatar && (
                        <div className="testimonial-avatar absolute -left-6 -bottom-6 w-36 h-48 rounded-md overflow-hidden border-2 border-primary-500/30 bg-white shadow-md">
                          <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="testimonial-navigation absolute top-1/2 -right-6 transform -translate-y-1/2 flex items-center text-xs text-gray-400">
                        {/* <span>Drag to see more</span> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mt-10 space-x-3">
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
          <div className="lg:col-span-4 bg-primary-50 p-10 rounded-xl border border-gray-200">
            

            {/* Highlight lines with inline numbers, icons and dividers */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-center py-3 border-b border-gray-200">
                {/* icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" viewBox="0 0 464.1 659.5">
                  <path d="M2.5,442.9h18.3c6.9,42,21.7,82.7,45.6,117.9l-46,86.4H4.3c.3-61.3-.8-183.8-.8-183.8l-1-20.5Z"/>
                  <path d="M374.2,16h12.8v172.2h-12.8c-10.6-76.6-56.4-148.4-138.8-157.5-78.3-8.6-166,28.1-158.7,119.4,5.5,69.8,97.8,91.2,152,107.7l-50.9,96.3c-73.6-20.8-153.6-53.6-165.9-139C-11.6,52.6,156.5-36.4,296.9,14.2c19.8,7.1,41.8,21.8,63.2,19.3,6.8-.8,11.1-11.9,14.2-17.4Z"/>
                  <path d="M106,643.6l17.8-32.8c17.4,8.1,36,13.5,55.1,16.1,75.9,10.4,167.1-1.2,192.1-86,21.3-71.9-10.5-123.1-76.5-150.7-14.7-6.1-30.1-10-44.8-15.6l50.4-94.8c32,9.5,64.6,18.5,92.9,36.6,62.6,40.1,81.9,104.6,66.1,176.1-19.9,89.9-96.3,158.2-186.2,163.7-47.3,2.9-94.9,4.5-141.4-5.8-8.6-1.9-17.1-4.5-25.6-6.9Z"/>
                </svg>
                <p className="ml-4 text-lg text-[#081E27] font-lato">1785+ properties transformed</p>
              </div>

              <div className="flex items-center py-3 border-b border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" viewBox="0 0 464.1 659.5">
                  <path d="M2.5,442.9h18.3c6.9,42,21.7,82.7,45.6,117.9l-46,86.4H4.3c.3-61.3-.8-183.8-.8-183.8l-1-20.5Z"/>
                  <path d="M374.2,16h12.8v172.2h-12.8c-10.6-76.6-56.4-148.4-138.8-157.5-78.3-8.6-166,28.1-158.7,119.4,5.5,69.8,97.8,91.2,152,107.7l-50.9,96.3c-73.6-20.8-153.6-53.6-165.9-139C-11.6,52.6,156.5-36.4,296.9,14.2c19.8,7.1,41.8,21.8,63.2,19.3,6.8-.8,11.1-11.9,14.2-17.4Z"/>
                  <path d="M106,643.6l17.8-32.8c17.4,8.1,36,13.5,55.1,16.1,75.9,10.4,167.1-1.2,192.1-86,21.3-71.9-10.5-123.1-76.5-150.7-14.7-6.1-30.1-10-44.8-15.6l50.4-94.8c32,9.5,64.6,18.5,92.9,36.6,62.6,40.1,81.9,104.6,66.1,176.1-19.9,89.9-96.3,158.2-186.2,163.7-47.3,2.9-94.9,4.5-141.4-5.8-8.6-1.9-17.1-4.5-25.6-6.9Z"/>
                </svg>
                <p className="ml-4 text-lg text-[#081E27] font-lato">£5M+ projects delivered</p>
              </div>

              <div className="flex items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" viewBox="0 0 464.1 659.5">
                  <path d="M2.5,442.9h18.3c6.9,42,21.7,82.7,45.6,117.9l-46,86.4H4.3c.3-61.3-.8-183.8-.8-183.8l-1-20.5Z"/>
                  <path d="M374.2,16h12.8v172.2h-12.8c-10.6-76.6-56.4-148.4-138.8-157.5-78.3-8.6-166,28.1-158.7,119.4,5.5,69.8,97.8,91.2,152,107.7l-50.9,96.3c-73.6-20.8-153.6-53.6-165.9-139C-11.6,52.6,156.5-36.4,296.9,14.2c19.8,7.1,41.8,21.8,63.2,19.3,6.8-.8,11.1-11.9,14.2-17.4Z"/>
                  <path d="M106,643.6l17.8-32.8c17.4,8.1,36,13.5,55.1,16.1,75.9,10.4,167.1-1.2,192.1-86,21.3-71.9-10.5-123.1-76.5-150.7-14.7-6.1-30.1-10-44.8-15.6l50.4-94.8c32,9.5,64.6,18.5,92.9,36.6,62.6,40.1,81.9,104.6,66.1,176.1-19.9,89.9-96.3,158.2-186.2,163.7-47.3,2.9-94.9,4.5-141.4-5.8-8.6-1.9-17.1-4.5-25.6-6.9Z"/>
                </svg>
                <p className="ml-4 text-lg text-[#081E27] font-lato">15+ years combined leadership</p>
              </div>
            </div>

            <div className="inline-block">
              <a href="/contact" className="bg-primary-500 text-[#081E27] font-lato py-3 px-8 rounded-md hover:bg-primary-400 transition-colors duration-300 text-lg">
                Get a quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Modal */}
      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        title="Project Testimonial"
        content={modalContent.content}
        author={modalContent.author}
        position={modalContent.position}
      />
    </section>
  );
};

export default TestimonialSection;

