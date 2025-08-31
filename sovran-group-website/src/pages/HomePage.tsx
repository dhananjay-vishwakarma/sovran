import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import ArrowButton from '../components/ArrowButton';
import HeroSection from '../components/HeroSection';
import TestimonialSection from '../components/TestimonialSection';
import BusinessVerticalsSection from '../components/BusinessVerticalsSection';
import ProblemSolutionHookSection from '../components/ProblemSolutionHookSection';
import { Link } from 'react-router-dom'; // added import for Link
import { PlayIcon } from '@heroicons/react/24/solid';
import StorySection from '../components/StorySection';
import logoImage from '../assets/logo/s.svg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const businessVerticalsRef = useRef<HTMLDivElement>(null);
  const buildersRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const interiorsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const elements = document.querySelectorAll('.reveal-up');
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
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

    // Image reveal animations
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
    // Text fade-in animations
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#081E27]">
      <Navigation />
      <HeroSection />
      <ProblemSolutionHookSection />
      {/* Business Verticals Section */}
      <BusinessVerticalsSection />

          {/* Client Testimonials Section 1 */}
      <section ref={testimonialsRef}>
        <div>
          <TestimonialSection />
        </div>
      </section>

      {/* Client Testimonial Section */}
      <section className="py-0 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="relative lg:w-[50%] ">
            <img
              src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249677-HDR.jpg"
              alt="Dali Bacha Project"
              className="w-full h-full object-cover"
              style={{ minHeight: "400px" }}
            />
          </div>
          <div className="bg-[#CDAD7D] text-[#081E27] py-16 px-12 flex flex-col justify-center lg:w-[65%]">
            {/* Play button positioned at intersection */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="absolute left-[43%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="bg-white rounded-full p-5 transform transition-all duration-500 hover:scale-110 shadow-xl" style={{ boxShadow: "0 0 0 8px rgba(205, 173, 125, 0.4)" }}>
                <PlayIcon className="w-10 h-10 text-[#CDAD7D]" />
              </div>
            </button>
            <div className="max-w-xl ml-8">
              <p className="uppercase text-sm tracking-wider font-medium mb-4">Success Story</p>
              <h2 className="text-5xl md:text-5xl lg:text-5xl leading-tight mb-6">
              Design Dreams Delivered: <br />A Seamless Renovation Experience
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
After extensive research, we found a team whose modern, clean aesthetic and high-quality finishes aligned perfectly with our vision. The entire process was smooth and stress-free, thanks to proactive, responsive communication and constant support for any questions or last-minute tweaks. Seeing everything come together in the final weeks was especially rewarding, and the attention to detail and craftsmanship truly exceeded our expectations. We’d gladly recommend the experience to anyone seeking thoughtful design, professional management, and a beautifully executed result.
              </p>
             
              <div>
              
              <p className="">Satisfied Client</p>
              <p className="text-sm">Homeowner, London</p>
              
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#081E27]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-5xl text-white mb-6 ivymode">
              Our Recent Projects – Turning Vision Into Reality
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Kitchen Design",
                description: "A luxurious open-plan kitchen and living space featuring premium materials, custom cabinetry, and integrated appliances for a seamless flow between cooking and entertaining areas.",
                image: "/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249592-HDR.jpg"
              },
              {
                title: "Luxury Bedroom Suite",
                description: "This custom master bedroom combines elegant lighting, bespoke headboard design, and high-quality finishes to create a serene sanctuary with unmatched attention to detail.",
                image: "/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249418-HDR.jpg"
              },
              {
                title: "Contemporary Bathroom",
                description: "A sophisticated bathroom renovation featuring marble surfaces, custom vanity, and premium fixtures that blend luxury with functionality in this completely transformed space.",
                image: "/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bathroom 1/Photos/P1259847-HDR.jpg"
              },
              {
                title: "Chiswick Home Renovation",
                description: "A modern kitchen with clean lines and functional design, featuring premium countertops, elegant cabinetry, and a thoughtful layout optimized for both cooking and entertaining.",
                image: "/assets/images/Chiswick-home-sovran11.jpg"
              },
              {
                title: "Master Bedroom Transformation",
                description: "This elegant bedroom renovation features custom lighting, premium textiles, and a sophisticated color palette that creates a peaceful retreat with timeless elegance.",
                image: "/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Latifa/Photos/P1210757.jpg"
              },
              {
                title: "Designer Home Bar",
                description: "This custom entertainment space features integrated wine storage, ambient lighting, and premium materials, creating the perfect area for hosting and relaxation.",
                image: "/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/Bars & Wine cellers/Taaj Kitchens -Entertaiment.jpg"
              }
            ].map((project, index) => (
              <div key={index} className="reveal-image group">
                <div className="relative rounded-lg overflow-hidden shadow-xl h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110 transform group-hover:-translate-y-2"
                  />

                  {/* Persistent gradient overlay to improve text legibility while maximising image visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent"></div>

                  {/* Title positioned over the image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-xl text-white mb-0 drop-shadow-md">{project.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <ArrowButton
              text="View More Projects"
              to="/contact"
              className="text-white hover:text-primary-500"
            />
          </div>
        </div>
      </section>

  

    {/* Story Section */}
      <StorySection />
      {/* Financial Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column: Financial Clarity */}
            <div className="space-y-6 reveal-up">
              <h2 className="font-sans text-3xl md:text-4xl text-[#081E27] mb-6 ivymode">
                Financial Clarity. Complete Control.
              </h2>
              <div className="w-20 h-1 bg-[#CDAD7D] mb-8"></div>
              <p className="text-gray-800 text-lg leading-relaxed">
                With Sovran, your investment is protected at every stage. We operate under JCT
                contracts, breaking your project into clear, milestone-based phases. You release funds
                only when each stage is completed, inspected, and approved by you — ensuring total
                control and zero surprises.
              </p>
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-800">Milestone-based payment structure</p>
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-800">JCT contract protection</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-800">Client approval required for payments</p>
                </div>
              </div>
            </div>

            {/* Right Column: Finance Options */}
            <div className="space-y-6 reveal-up">
              <h2 className="font-sans text-3xl md:text-4xl text-[#081E27] mb-6 ivymode">
                Your Dream, Now Within Reach
              </h2>
              <div className="w-20 h-1 bg-[#CDAD7D] mb-8"></div>
              <p className="text-gray-800 text-lg leading-relaxed">
                To make your vision even more accessible, we offer flexible finance from £1,000 to £2.5
                million, with up to 5 years to pay — giving you the freedom to create your dream space
                without compromise.
              </p>
              <div className="mt-8 bg-gray-100 rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Finance Range:</span>
                    <span className="text-[#CDAD7D] font-medium">£1,000 - £2.5 million</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Repayment Period:</span>
                    <span className="text-[#CDAD7D] font-medium">Up to 5 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Application Process:</span>
                    <span className="text-[#CDAD7D] font-medium">Quick & Simple</span>
                  </div>
                  <div className="pt-4">
                    <ArrowButton
                      text="Learn About Finance Options"
                      to="/contact"
                      className="text-[#081E27] hover:text-[#CDAD7D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Mark/Photos/Kitchen/P1210015.jpg" 
            alt="Luxury Kitchen Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#081E27]/70"></div> {/* Dark overlay for better text readability */}
        </div>
        
        {/* Oversized "S" in the background - positioned differently from the business verticals section */}
        <div
          className="absolute select-none pointer-events-none z-10"
          style={{
            top: '-10rem',
            right: '-25rem',
            opacity: 0.1, /* Updated to 80% opacity as requested */
            width: '80rem',
            height: '80rem',
          }}
        >
          <img 
            src={logoImage} 
            alt="S Logo" 
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0) invert(1)' }} /* Makes SVG white */
          />
        </div>
        
        {/* Background design elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute h-40 w-40 rounded-full bg-primary-500/5 -top-10 -left-10 blur-xl"></div>
          <div className="absolute h-60 w-60 rounded-full bg-primary-600/5 bottom-20 right-10 blur-2xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h2 className="font-sans text-4xl md:text-5xl text-white mb-8 ivymode leading-tight drop-shadow-lg">
            Your Project. Our Expertise. <br/>Let's Build It Together.
          </h2>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto font-medium drop-shadow-md bg-[#081E27]/30 backdrop-blur-sm py-4 px-6 rounded-lg inline-block">
            Ready to transform your space? From bespoke kitchens to complete home renovations, 
            our specialists are ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-20 mt-10">
            {/* Consultation Button */}
            <div className="flex flex-col items-center bg-[#081E27]/60 backdrop-blur-md px-6 py-4 rounded-lg border border-[#CDAD7D]/20 hover:border-[#CDAD7D]/50 transition-all duration-300">
              <ArrowButton 
                text="Book a Free Consultation" 
                to="/contact" 
                className="text-white hover:text-[#CDAD7D]"
              />
              <div className="mt-2 w-full">
                <div className="h-[2px] bg-[#CDAD7D] w-full"></div>
              </div>
            </div>
            
            {/* Call Button */}
            <div className="flex flex-col items-center bg-[#081E27]/60 backdrop-blur-md px-6 py-4 rounded-lg border border-[#CDAD7D]/20 hover:border-[#CDAD7D]/50 transition-all duration-300">
              <ArrowButton 
                text="Call Us Today" 
                href="tel:+447516100111" 
                className="text-white hover:text-[#CDAD7D]"
              />
              <div className="mt-2 w-full">
                <div className="h-[2px] bg-[#CDAD7D] w-full"></div>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <div className="flex flex-col items-center bg-[#081E27]/60 backdrop-blur-md px-6 py-4 rounded-lg border border-[#CDAD7D]/20 hover:border-[#CDAD7D]/50 transition-all duration-300">
              <a 
                href="https://wa.me/447516100111" 
                className="group inline-flex items-center font-lato text-lg text-white hover:text-[#CDAD7D] transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="group-hover:text-[#CDAD7D] transition-colors duration-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ fill: 'currentColor' }}>
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  WhatsApp Chat
                </span>
                <div className="inline-flex ml-2 group-hover:ml-3 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    className="w-6 h-6 group-hover:text-[#CDAD7D] group-hover:rotate-45 transition-all duration-500 transform-gpu">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" className="group-hover:stroke-[#CDAD7D]" />
                    <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#CDAD7D]" />
                  </svg>
                </div>
              </a>
              <div className="mt-2 w-full">
                <div className="h-[2px] bg-[#CDAD7D] w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-[#081E27] bg-opacity-90 flex items-center justify-center z-50" 
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button with better styling */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-2 text-white hover:text-yellow-400 transition-colors duration-300 flex items-center font-medium z-20"
              aria-label="Close video"
            >
              <span className="mr-2">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Overlay close instruction */}
            <div className="absolute -bottom-10 w-full text-center text-gray-400 text-sm">
              Click anywhere outside to close
            </div>
            <div className="w-full rounded-lg overflow-hidden shadow-2xl flex justify-center items-center" style={{ position: 'relative', aspectRatio: '16/9', background: '#081E27' }}>
              <video
                src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Media Wall Reel.mp4"
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#081E27', borderRadius: '1rem' }}
                poster="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249677-HDR.jpg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
