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
import { Link } from 'react-router-dom'; // added import for Link
import { PlayIcon } from '@heroicons/react/24/solid';

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
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      <HeroSection />
      
      {/* Business Verticals Section */}
      <BusinessVerticalsSection />

      {/* Client Testimonial Section */}
      <section className="py-0 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="relative lg:w-[50%]">
            <img
              src="/images/Aqib-10-Harold-Rd-027-scaled.jpg"
              alt="Client Testimonial"
              className="w-full h-full object-cover"
              style={{ minHeight: "400px" }}
            />
          </div>
          <div className="bg-[#CDAD7D] text-black py-16 px-12 flex flex-col justify-center lg:w-[65%]">
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
              
              <p className="font-semibold">Arya Star</p>
              <p className="text-sm">CEO, Founder</p>
              
              </div>
            </div>
          </div>
        </div>
      </section>



    {/* Client Testimonials Section */}
<section ref={testimonialsRef}>
  <div>
    <TestimonialSection />
  </div>
</section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-5xl text-white mb-6 ivymode">
              Our Recent Projects – Turning Vision Into Reality
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Luxury Home Renovation",
                description: "We transformed this 3-bedroom property in central London into a modern masterpiece. From the structural works to bespoke finishes, every detail was crafted with precision.",
                image: "/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg"
              },
              {
                title: "Custom Kitchen Design",
                description: "A sleek, functional, and beautiful kitchen designed to meet the client's needs. We focused on innovative storage solutions and high-end finishes to deliver a space that blends style with practicality.",
                image: "/images/traditional-shaker-kitchen.jpg"
              },
              {
                title: "Bespoke Wardrobes for a Luxury Home",
                description: "Custom wardrobes designed to maximize space while adding an elegant touch to the client's master bedroom. With custom shelving, lighting, and sliding doors, the transformation was stunning.",
                image: "/images/Fretwork-wardrobes_MrWarobe_0001.png"
              }
            ].map((project, index) => (
              <div key={index} className="reveal-image group">
                <div className="bg-dark-800 rounded-lg overflow-hidden shadow-xl h-full flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">{project.title}</h4>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/contact"
                      className="text-primary-500 hover:text-primary-400 font-semibold inline-flex items-center transition-colors duration-300"
                    >
                      View Details
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
                    </Link>
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
      
      {/* CTA Section */}
      <section className="py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Oversized "S" in the background - positioned differently from the business verticals section */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            fontSize: '90rem',
            lineHeight: '0',
            top: '-5rem',
            right: '-15rem',
            opacity: 0.1,
            zIndex: 0,
          }}
        >
          <span className="ivymode-bold text-black">S</span>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-sans text-3xl md:text-4xl text-black mb-6 ivymode">
            Get in Touch with Sovran Group Today!
          </h2>
          <p className="text-xl text-black/90 mb-10 max-w-3xl mx-auto">
            Ready to build your dream space? <br />Whether you're starting a full renovation or designing a luxury kitchen, Sovran Group is here to help. Contact us now for a consultation.
          </p>
          <ArrowButton
            text="Contact Us Now"
            to="/contact"
            className="text-black hover:text-primary-500"
          />
        </div>
      </section>

      <Footer />
      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" 
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
            
            <div className="w-full rounded-lg overflow-hidden shadow-2xl" style={{ position: 'relative', paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/6T-CykZuw7g?controls=0&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3"
                title="Client Testimonial"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              
              {/* Custom minimal controls layer */}
              <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full px-4 py-2 text-white text-xs">
                  Use YouTube player controls for playback
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
