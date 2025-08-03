import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SovranInteriorsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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
        {
          opacity: 0,
          scale: 0.9,
        },
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative pt-24 pb-20 md:pt-32 md:pb-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 reveal-up">
              Sovran Interiors
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 reveal-up">
              Crafting bespoke interiors that reflect your unique style and personality
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 reveal-up">
              Discuss Your Project
            </button>
          </div>
        </div>
      </section>

      {/* Interior Services Section */}
      <section ref={servicesRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Interior Services
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From concept to completion, we provide comprehensive interior design and implementation services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Wardrobes",
                description: "Bespoke wardrobe solutions designed to maximize your space and complement your home's aesthetic.",
                icon: "📐"
              },
              {
                title: "Kitchen Design",
                description: "Modern kitchen solutions that blend functionality with elegant design for the heart of your home.",
                icon: "🍳"
              },
              {
                title: "Living Spaces",
                description: "Transform your living areas into stylish, comfortable spaces that reflect your personality.",
                icon: "🛋️"
              },
              {
                title: "Bathroom Renovation",
                description: "Luxury bathroom designs with high-quality fixtures and premium finishes.",
                icon: "🚿"
              },
              {
                title: "Home Office",
                description: "Productive and inspiring work environments designed for the modern professional.",
                icon: "💼"
              },
              {
                title: "Material Selection",
                description: "Expert guidance on selecting the perfect materials, colors, and textures for your space.",
                icon: "🎨"
              },
            ].map((service, index) => (
              <div key={index} className="reveal-up bg-dark-800 rounded-lg p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Interior Projects
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore some of our recent interior transformations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Modern Minimalist Apartment",
                description: "A complete interior renovation focusing on clean lines and open spaces.",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              },
              {
                title: "Luxury Kitchen Remodel",
                description: "A high-end kitchen transformation with custom cabinetry and premium appliances.",
                image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1935&q=80"
              },
              {
                title: "Executive Home Office",
                description: "A sophisticated workspace designed for productivity and virtual meetings.",
                image: "https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
              },
              {
                title: "Master Bedroom Suite",
                description: "A serene retreat with custom wardrobes and luxurious finishes.",
                image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              }
            ].map((project, index) => (
              <div key={index} className="reveal-image rounded-lg overflow-hidden shadow-xl bg-dark-900">
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <button className="text-primary-400 hover:text-primary-300 font-medium flex items-center">
                    View Project Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-primary-900/30 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-primary-700/50">
          <div className="text-center reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact our team of interior design specialists to discuss your project needs and vision
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-300">
                Schedule Consultation
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Browse Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SovranInteriorsPage;
