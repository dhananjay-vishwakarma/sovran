import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-description', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    );

    // Services section animation
    gsap.fromTo('.services-title', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%',
        }
      }
    );

    // Service cards stagger animation
    gsap.fromTo('.service-card', 
      { opacity: 0, y: 100, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%',
        }
      }
    );

    // Philosophy section animation
    gsap.fromTo('.philosophy-content', 
      { opacity: 0, x: -100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top 70%',
        }
      }
    );

    gsap.fromTo('.philosophy-image', 
      { opacity: 0, x: 100, scale: 1.1 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top 70%',
        }
      }
    );

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <div>
      <div className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase">
            SOVRAN GROUP
          </h1>
          <h2 className="hero-subtitle text-xl md:text-2xl font-light tracking-wide mb-8 uppercase">
            Creating Exceptional Spaces
          </h2>
          <p className="hero-description text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90">
            We transform visions into reality through innovative construction, sophisticated interior design, and cutting-edge architectural services.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="services-title text-4xl md:text-5xl font-light tracking-wider uppercase mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three specialized divisions working in harmony to deliver unparalleled quality and innovation
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Link to="/sovran-builders" className="group">
              <div className="service-card relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src="https://images.pexels.com/photos/1105386/pexels-photo-1105386.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Construction Services"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-4">
                    Sovran Builders
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Premium construction services delivering architectural excellence through meticulous craftsmanship and innovative building solutions.
                  </p>
                  <div className="flex items-center text-black group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium tracking-wide uppercase mr-2">Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sovran-interiors" className="group">
              <div className="service-card relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Interior Design Services"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-4">
                    Mr. Wardrobe
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Premium fitted wardrobes and bespoke storage solutions crafted with precision and elegance.
                  </p>
                  <div className="flex items-center text-black group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium tracking-wide uppercase mr-2">Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sovran-design" className="group">
              <div className="service-card relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src="https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Architecture & 3D Design Services"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-4">
                    Taaj Kitchens
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Luxury kitchen design and installation services creating culinary spaces that inspire and delight.
                  </p>
                  <div className="flex items-center text-black group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium tracking-wide uppercase mr-2">Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Philosophy"
                className="philosophy-image w-full h-96 object-cover shadow-lg"
              />
            </div>
            <div className="philosophy-content">
              <h2 className="text-4xl font-light tracking-wider uppercase mb-8">
                Our Philosophy
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Excellence is not just our goal—it's our standard. Every project we undertake reflects our unwavering commitment to quality, innovation, and client satisfaction.
                </p>
                <p className="text-lg">
                  We believe that exceptional spaces are born from the perfect marriage of form and function, where aesthetic beauty meets practical purpose.
                </p>
                <p className="text-lg">
                  Our integrated approach ensures seamless collaboration across all disciplines, delivering results that exceed expectations and stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;