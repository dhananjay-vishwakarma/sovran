import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import TestimonialSection from '../components/TestimonialSection';
import BusinessVerticalsSection from '../components/BusinessVerticalsSection';
import ProblemSolutionHookSection from '../components/ProblemSolutionHookSection';
import SuccessStorySection from '../components/SuccessStorySection';
import RecentProjectsSection from '../components/RecentProjectsSection';
import StorySection from '../components/StorySection';
import ContactFormSection from '../components/ContactFormSection';

// Register ScrollTrigger and ScrollToPlugin plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const HomePage: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a class for any CSS that relies on smooth-scroll presence (doesn't enable native smooth)
    document.body.classList.add('smooth-scroll');

    // Enhanced scroll animations with GSAP
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (pageRef.current) {
          const scrollY = window.scrollY;
          const parallaxElements = document.querySelectorAll('.parallax-element');
          parallaxElements.forEach((element: any) => {
            const speed = element.dataset.speed || 0.1;
            element.style.transform = `translateY(${scrollY * speed}px)`;
          });
        }
      });
    };

    // GSAP-powered smooth scroll to anchor with ease-in-out and debug logs
    const smoothScrollToAnchor = (e: any) => {
      console.log('smoothScrollToAnchor called');
      const anchor = e.target.closest && e.target.closest('a');
      if (anchor && anchor.getAttribute && anchor.getAttribute('href')?.startsWith('#')) {
        const targetId = anchor.getAttribute('href') as string;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = Math.round(elementPosition + window.scrollY - headerOffset);

          console.log('[GSAP Scroll] Starting scroll to:', targetId, 'Target Y:', offsetPosition);

          gsap.to(window, {
            scrollTo: { y: offsetPosition, autoKill: false },
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
            onStart: () => {
              console.log('[GSAP Scroll] Animation started to:', targetId, 'from Y:', window.scrollY);
            },
            onComplete: () => {
              console.log('[GSAP Scroll] Animation completed at Y:', window.scrollY);
            },
          });
        } else {
          console.log('[GSAP Scroll] Target element not found:', targetId);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add click event listener for anchor links
    document.addEventListener('click', smoothScrollToAnchor);

    // GSAP ScrollTrigger animations
    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    const imageElements = document.querySelectorAll('.reveal-image');
    imageElements.forEach((element) => {
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
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    const fadeElements = document.querySelectorAll('.reveal-opacity');
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Remove scroll event listener
      window.removeEventListener('scroll', handleScroll);

      // Remove click event listener for anchor links
      document.removeEventListener('click', smoothScrollToAnchor);

      // Remove smooth-scroll class from body
      document.body.classList.remove('smooth-scroll');
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#081E27]">
      <Navigation />
      <HeroSection />
      <ProblemSolutionHookSection />
      <BusinessVerticalsSection />
      {/* Client Testimonials Section 1 */}
      <section ref={testimonialsRef} id="testimonials">
        <TestimonialSection />
      </section>
      {/* Success Story Section */}
      <SuccessStorySection />
      {/* Case Studies Section */}
      <div ref={caseStudiesRef} id="case-studies">
        <RecentProjectsSection />
      </div>
      <StorySection />
      {/* Financial Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-6 reveal-up">
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#081E27] mb-6 ivymode">
                Financial Clarity. Complete Control.
              </h2>
              <div className="w-20 h-1 bg-[#CDAD7D] mb-8"></div>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                With Sovran, your investment is protected at every stage. We
                operate under JCT contracts, breaking your project into clear,
                milestone-based phases. You release funds only when each stage
                is completed, inspected, and approved by you — ensuring total
                control and zero surprises.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800">
                    Milestone-based payment structure
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800">JCT contract protection</p>
                </li>
                <li className="flex items-center">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800">
                    Client approval required for payments
                  </p>
                </li>
              </ul>

              <div className="mt-8">
                <a href="/contact" className="bg-[#081E27] text-white font-lato py-3 px-8 rounded-full hover:bg-[#081E27]/80 transition-colors duration-300 text-lg inline-block">
                  Get a Free Quote
                </a>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6 reveal-up">
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#081E27] mb-6 ivymode">
                Your Dream, Now Within Reach
              </h2>
              <div className="w-20 h-1 bg-[#CDAD7D] mb-8"></div>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                To make your vision even more accessible, we offer flexible
                finance from £1,000 to £2.5 million, with up to 5 years to pay —
                giving you the freedom to create your dream space without
                compromise.
              </p>
              <div className="bg-gray-100 rounded-ful p-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">
                      Finance Range:
                    </span>
                    <span className="text-[#CDAD7D] font-medium">
                      £1,000 - £2.5 million
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">
                      Repayment Period:
                    </span>
                    <span className="text-[#CDAD7D] font-medium">
                      Up to 5 years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">
                      Application Process:
                    </span>
                    <span className="text-[#CDAD7D] font-medium">
                      Quick & Simple
                    </span>
                  </div>
                  <div className="pt-4">
                    <a href="/contact" className="bg-[#081E27] text-white font-lato py-3 px-8 rounded-full hover:bg-[#081E27]/80 transition-colors duration-300 text-lg inline-block">
                      Learn About Finance Options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default HomePage;
