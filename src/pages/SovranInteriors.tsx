import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { Palette, Home, Lightbulb, Eye, Download, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SovranInteriors = () => {
  useEffect(() => {
    // Hero animations with futuristic effects
    gsap.fromTo('.hero-logo', 
      { opacity: 0, scale: 0.5, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100, skewY: 10 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    // Floating animation for service cards
    gsap.to('.floating-card', {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });

    // Morphing background effect
    gsap.to('.morph-bg', {
      scale: 1.1,
      rotation: 5,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });

    // Services grid animation
    gsap.fromTo('.service-item', 
      { opacity: 0, y: 100, rotationX: 45 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%',
        }
      }
    );

    // Expertise items with 3D effect
    gsap.fromTo('.expertise-item', 
      { opacity: 0, z: -100, rotationY: 45 },
      { 
        opacity: 1, 
        z: 0, 
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.expertise-grid',
          start: 'top 70%',
        }
      }
    );

  }, []);

  const services = [
    {
      title: 'Fitted Wardrobes',
      description: 'Bespoke fitted wardrobes designed to maximize space and complement your bedroom aesthetic.',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Custom Design', 'Premium Materials', 'Soft-Close Mechanisms', 'LED Lighting']
    },
    {
      title: 'Walk-in Wardrobes',
      description: 'Luxury walk-in wardrobe solutions that transform your dressing experience.',
      image: 'https://images.pexels.com/photos/2506947/pexels-photo-2506947.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Island Units', 'Shoe Storage', 'Jewelry Drawers', 'Mirror Integration']
    },
    {
      title: 'Storage Solutions',
      description: 'Innovative storage solutions for every room in your home.',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Under-Stair Storage', 'Home Office', 'Media Units', 'Alcove Solutions']
    }
  ];

  const expertise = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design Consultation',
      description: 'Expert design consultation to create storage solutions that perfectly match your lifestyle and space.'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Space Optimization',
      description: 'Maximizing every inch of available space with intelligent design and innovative storage solutions.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Premium Materials',
      description: 'Using only the finest materials and hardware to ensure longevity and exceptional quality.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Professional Installation',
      description: 'Expert installation by our skilled craftsmen ensuring perfect fit and finish.'
    }
  ];

  return (
    <div>
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div 
          className="morph-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1600)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="hero-logo mb-8">
            <img 
              src="https://mrwardrobe.co.uk/wp-content/uploads/2023/06/Mr-Wardrobe-png-new-logo-white-e.png" 
              alt="Mr. Wardrobe" 
              className="h-24 w-auto mx-auto"
            />
          </div>
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase">
            Mr. Wardrobe
          </h1>
          <h2 className="text-xl md:text-2xl font-light tracking-wide mb-8 uppercase">
            Bespoke Storage Solutions
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90 mb-8">
            Transforming spaces with premium fitted wardrobes and innovative storage solutions crafted to perfection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://mrwardrobe.co.uk/wp-content/uploads/2025/07/MR.-Wardrobe-Branded-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Catalogue
            </a>
            <a 
              href="https://mrwardrobe.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 font-medium tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Website
            </a>
          </div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Storage Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We create bespoke storage solutions that maximize space while maintaining elegant aesthetics.
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-item floating-card group">
                <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="p-8">
                    <h3 className="text-2xl font-light tracking-wide uppercase mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium tracking-wide uppercase mb-3 text-gray-800">Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Storage Excellence"
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-light tracking-wider uppercase mb-8">
                Our Expertise
              </h2>
              <div className="expertise-grid space-y-8">
                {expertise.map((item, index) => (
                  <div key={index} className="expertise-item flex items-start space-x-4">
                    <div className="text-gray-600 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-light tracking-wide uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of bespoke storage solutions that showcase our craftsmanship and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury Fitted Wardrobe"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Luxury Fitted Wardrobe</h3>
                  <p className="text-sm opacity-90">Bespoke fitted wardrobe with premium finishes</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2506947/pexels-photo-2506947.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Walk-in Wardrobe"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Walk-in Wardrobe</h3>
                  <p className="text-sm opacity-90">Spacious walk-in wardrobe with island unit</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Storage Solutions"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Storage Solutions</h3>
                  <p className="text-sm opacity-90">Custom storage solutions for modern living</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bedroom Storage"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Bedroom Storage</h3>
                  <p className="text-sm opacity-90">Integrated bedroom storage with LED lighting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
            Design Your Perfect Storage
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            Ready to maximize your space with bespoke storage solutions? Let's create something extraordinary together.
          </p>
          <button className="bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Get Free Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default SovranInteriors;