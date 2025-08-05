import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const buildersRef = useRef<HTMLDivElement>(null);
  const interiorsRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const sustainabilityRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0.9, scale: 0.98 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: 'power2.out' 
      }
    );
    
    // Animate sections on scroll
    const animateSections = [
      introRef.current,
      buildersRef.current,
      interiorsRef.current,
      designRef.current,
      philosophyRef.current,
      sustainabilityRef.current,
      whyUsRef.current
    ];
    
    animateSections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });
    
    // Animate images in each section
    document.querySelectorAll('.animate-image').forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.7,
          delay: 0.1 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        }
      );
    });
    
    // Animate list items in the why choose us section
    if (whyUsRef.current) {
      gsap.fromTo(
        whyUsRef.current.querySelectorAll('li'),
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.15,
          duration: 0.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whyUsRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
        style={{
          backgroundImage: "url('public/images/AdobeStock_1312472493.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            About Sovran Group
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building excellence through innovation, craftsmanship, and dedication to our clients' visions.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-white mb-6">Our Group</h2>
              <p className="text-gray-300 leading-relaxed">
                At Sovran Builders, Sovran Interiors, and Sovran Design, we each bring a unique offering to the table, but all share a common commitment to excellence, craftsmanship, and bespoke design. From full home renovations to luxury wardrobes, bespoke kitchens, and architectural design, we work passionately to create spaces that perfectly reflect the individual style and needs of our clients.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg" alt="Sovran craftsmanship" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" alt="Sovran design" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Traditional-Craftmanship-Taaj-kitchens-Homepage-1.png" alt="Sovran interiors" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Walk-in-Wardrobe-mr-wardrobe-scaled.jpg" alt="Sovran builders" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Builders Section */}
      <section 
        ref={buildersRef}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/Kitchen-worktop-detail-taaj-kitchen-850x1024.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-image rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
              <img src="/images/taaj-kitchens-full-kitchen-renovation-scaled.jpg" alt="Sovran Builders project" className="w-full h-auto" />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="font-serif text-4xl font-bold text-white mb-6">Sovran Builders</h2>
              <h3 className="text-primary-400 text-xl mb-4">Formerly Taaj Design and Build</h3>
              <div className="w-24 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-300 leading-relaxed">
                Sovran Builders was founded with a mission to empower homeowners to transform their vision into reality. Specializing in full-scale renovations, custom home solutions, and large construction projects across London and beyond, we emphasize clear communication, transparency, and precision at every stage of the project.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From the first consultation to the final installation, we stand by our clients every step of the way, ensuring that every detail aligns with their vision and lifestyle. By combining technical expertise with a focus on innovation and sustainability, we deliver results that exceed expectations while maintaining efficiency and cost-effectiveness.
              </p>
              <p className="text-gray-300 leading-relaxed">
                At Sovran Builders, we believe that each project should be a reflection of the owner's personality. We craft spaces that are as functional as they are beautiful, all while maintaining the highest standards of quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Interiors Section - White Background */}
      <section ref={interiorsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-dark-900 mb-6">Sovran Interiors</h2>
              <h3 className="text-primary-600 text-xl mb-4">Formerly Mr. Wardrobe & TAAJ Bespoke Kitchens</h3>
              <div className="w-24 h-1 bg-primary-600 mb-6"></div>
              <p className="text-dark-800 leading-relaxed">
                Sovran Interiors represents the fusion of Mr. Wardrobe and TAAJ Bespoke Kitchens, combining two of the most renowned brands in luxury home interiors under one name.
              </p>
              <p className="text-dark-800 leading-relaxed">
                Mr. Wardrobe has long been a leading luxury brand specializing in bespoke wardrobes and custom storage solutions. Over the years, we've honed our craft to offer uniquely tailored storage systems for all types of spaces. From walk-in wardrobes and sliding doors to bespoke bookshelves and dressing rooms, Sovran Interiors offers storage solutions that are not only highly functional but also incredibly stylish.
              </p>
              <p className="text-dark-800 leading-relaxed">
                Meanwhile, TAAJ Bespoke Kitchens brings an exceptional level of craftsmanship to every kitchen project. We specialize in creating seamless, luxurious kitchen spaces that integrate perfectly with the overall design of your home. Whether it's a sleek modern design or a more traditional setup, our bespoke kitchens are crafted to meet your exacting standards, ensuring both beauty and functionality.
              </p>
              <p className="text-dark-800 leading-relaxed">
                Whether you're looking for a custom wardrobe or a dream kitchen, Sovran Interiors creates spaces where luxury meets function, and every detail is tailored to your vision.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Dressing-Room-Furniture-MrWardrobe-scaled.jpg" alt="Luxury wardrobe" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/taaj-kitchens-luxury-gold-scaled.jpg" alt="Luxury kitchen" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/MrWardrobe-timeless-design-scaled.jpg" alt="Wardrobe design" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/taaj-kitchens-full-kitchen-renovation-scaled.jpg" alt="Kitchen renovation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Design Section */}
      <section 
        ref={designRef}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/image-4-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-image rounded-xl overflow-hidden shadow-2xl">
              <img src="/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" alt="Sovran Design project" className="w-full h-auto" />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-white mb-6">Sovran Design</h2>
              <h3 className="text-primary-400 text-xl mb-4">Architectural Design and 3D Services</h3>
              <div className="w-24 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-300 leading-relaxed">
                Sovran Design specializes in cutting-edge architecture and 3D visualization services. Our talented team of architects and designers creates stunning architectural concepts that blend form and function, ensuring that each project is both innovative and sustainable.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From creating detailed architectural plans to producing photorealistic 3D renders, we help clients visualize and refine their ideas before breaking ground. We work closely with homeowners, developers, and architects to bring design ideas to life, ensuring every space is as unique as the people who use it.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you need full architectural designs or want to bring a concept to life through 3D modeling, Sovran Design is committed to transforming your vision into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Our Shared Philosophy</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-image">
              <img src="/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg" alt="Craftsmanship" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl font-bold text-white mb-3">Craftsmanship</h3>
              <p className="text-gray-300">
                All three brands are built on the foundation of exceptional craftsmanship. We take pride in the meticulous attention to detail that goes into every project.
              </p>
            </div>
            
            <div className="animate-image">
              <img src="/images/luxury-sliding-wardrobe-door-mr-wardrobe-scaled.jpg" alt="Quality" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl font-bold text-white mb-3">Quality</h3>
              <p className="text-gray-300">
                We never compromise on quality. From materials to execution, every aspect of our work meets the highest standards in the industry.
              </p>
            </div>
            
            <div className="animate-image">
              <img src="/images/Traditional-Craftmanship-Taaj-kitchens-Homepage-1.png" alt="Customer Satisfaction" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl font-bold text-white mb-3">Customer Satisfaction</h3>
              <p className="text-gray-300">
                We reject conventional approaches and embrace creativity, offering each client a truly personalized service that reflects their individual needs and personalities.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center text-gray-300 max-w-4xl mx-auto">
            <p className="leading-relaxed">
              Whether we're renovating a home, creating a custom wardrobe, designing a luxury kitchen, or providing architectural design services, our goal is to deliver bespoke, high-quality solutions. No matter the project size or scope, our attention to detail and commitment to excellence ensure that every space we create is a masterpiece.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section 
        ref={sustainabilityRef}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/Bespoke-kitchen-worktop-Taaj-kitchens.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-dark-800/70 backdrop-blur-sm p-10 rounded-xl border border-primary-600/20 shadow-2xl">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Sustainability & Ethical Sourcing</h2>
            <div className="w-24 h-1 bg-primary-600 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-image rounded-xl overflow-hidden shadow-2xl">
                <img src="/images/taaj-kitchens-luxury-gold-scaled.jpg" alt="Sustainable materials" className="w-full h-auto" />
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  We are deeply committed to sustainability across all our brands. From Sovran Builders' construction projects to Sovran Interiors' bespoke furniture and kitchens, and Sovran Design's architectural services, we ensure that every material we use is responsibly sourced.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Whether it's fine hardwoods, luxurious stones, or eco-friendly fabrics, we select only the best materials to create stunning, sustainable spaces.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our commitment to ethical sourcing means we carefully select suppliers who share our values and uphold strict environmental and social standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Why Choose Us</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what sets Sovran Group apart in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-primary-600 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Bespoke Solutions</h3>
                    <p className="text-gray-300">Whether it's a full renovation, a custom wardrobe, a luxury kitchen, or architectural design, we provide personalized, tailor-made solutions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-600 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Expert Craftsmanship</h3>
                    <p className="text-gray-300">Each piece, whether it's a kitchen, wardrobe, or architectural design, is crafted to the highest standards.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-600 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sustainability & Quality</h3>
                    <p className="text-gray-300">We prioritize eco-friendly practices and use only premium, ethically sourced materials.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-600 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Customer-Centered</h3>
                    <p className="text-gray-300">Every project is a collaboration with the client, ensuring their vision comes to life.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" alt="Luxury interior" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/MrWardrobe-bespoke-storage-solutions-scaled.jpg" alt="Bespoke solution" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/taaj-kitchens-luxury-gold-scaled.jpg" alt="Luxury kitchen" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Walk-in-Wardrobe-mr-wardrobe-scaled.jpg" alt="Walk-in wardrobe" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            If you're ready to begin your next project with Sovran Builders, Sovran Interiors, or Sovran Design, we're here to help turn your dream space into a reality.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
