import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ArrowButton from '../components/ArrowButton';
import '../styles/fallback.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutPage: React.FC = () => {
  // State to track if animations are ready
  const [animationsReady, setAnimationsReady] = useState(false);
  
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const sustainabilityRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);

  // Initialize all headings to be visible regardless of animation
  useEffect(() => {
    // Immediate visibility for all headings
    document.querySelectorAll('.split-text, h1, h2, h3, h4, h5, h6').forEach((heading) => {
      (heading as HTMLElement).style.opacity = '1';
      (heading as HTMLElement).style.visibility = 'visible';
    });

    // Mark animations as ready after a short delay
    const timer = setTimeout(() => {
      setAnimationsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Main animations
  useEffect(() => {
    if (!animationsReady) return;
    
    // Set all split-text elements to be visible initially (fallback)
    document.querySelectorAll('.split-text').forEach((heading) => {
      (heading as HTMLElement).style.opacity = '1';
      (heading as HTMLElement).style.visibility = 'visible';
    });
    
    // Hero section animation with blur effect
    gsap.fromTo(
      heroRef.current,
      { opacity: 0.9, scale: 0.98, filter: 'blur(8px)' },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)', 
        duration: 1.2, 
        ease: 'power3.out' 
      }
    );
    
    // Split text animation for headings
    document.querySelectorAll('.split-text').forEach((heading) => {
      try {
        // Create a split text instance
        const split = new SplitText(heading, { type: 'chars,words' });
        const chars = split.chars;
        
        // Ensure chars are visible initially
        gsap.set(chars, { opacity: 1 });
        
        // Then animate them
        gsap.fromTo(
          chars,
          { opacity: 0.7, filter: 'blur(5px)', y: 20 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none none'
            }
          }
        );
      } catch (error) {
        console.error('Error in SplitText animation:', error);
        // Ensure the heading is still visible if animation fails
        (heading as HTMLElement).style.opacity = '1';
      }
    });
    
    // Animate sections on scroll with enhanced effects
    const animateSections = [
      designRef.current,
      philosophyRef.current,
      sustainabilityRef.current
      // whyUsRef removed - content is animated individually
    ];
    
    animateSections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50, filter: 'blur(4px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 1,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Animate images with blur effect
    document.querySelectorAll('.animate-image').forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.8,
          delay: 0.15 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Animate paragraphs with subtle blur effect
    document.querySelectorAll('.animate-paragraph').forEach((para, index) => {
      gsap.fromTo(
        para,
        { opacity: 0, y: 20, filter: 'blur(3px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 0.8,
          delay: 0.1 + (0.1 * index),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: para,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Why Choose Us section - animate list items individually with enhanced blur effect
    document.querySelectorAll('.animate-paragraph').forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -20, filter: 'blur(3px)' },
        { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)', 
          duration: 0.7,
          delay: 0.1 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      // Clean up any remaining split text instances, but ensure text remains visible
      document.querySelectorAll('.split-text').forEach((heading) => {
        const element = heading as HTMLElement;
        if (element.style) {
          element.style.filter = '';
          // Ensure element remains visible after cleanup
          element.style.opacity = '1';
          element.style.visibility = 'visible';
        }
      });
    };
  }, [animationsReady]);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-36 pb-28 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Oversized "S" in the background */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            fontSize: '90rem',
            lineHeight: '0',
            top: '-25rem',
            left: '-15rem',
            opacity: 0.05,
            zIndex: 0,
            color: '#ffffff',
          }}
        >
          <span className="ivymode">S</span>
        </div>
        <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-[2px] z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-sans text-6xl md:text-7xl text-white mb-8 ivymode split-text">
            About Sovran Group
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-paragraph">
            Building excellence through innovation, craftsmanship, and dedication to our clients' visions.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-10"></div>
        </div>
      </section>

      {/* Introduction Section - White Background (First Section) */}
      <section  className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black mb-8 ivymode split-text">Our Group</h2>
              <div className="w-24 h-1 bg-[#CDAD7D] mb-8"></div>
              <p className="text-gray-700 leading-relaxed animate-paragraph">
                At Sovran Builders, Sovran Interiors, and Sovran Design, we each bring a unique offering to the table, but all share a common commitment to excellence, craftsmanship, and bespoke design.
              </p>
              <p className="text-gray-700 leading-relaxed animate-paragraph">
                From full home renovations to luxury wardrobes, bespoke kitchens, and architectural design, we work passionately to create spaces that perfectly reflect the individual style and needs of our clients.
              </p>
              <div className="pt-6">
                <ArrowButton
                  text="Learn More About Us"
                  to="/contact"
                  className="text-black hover:text-[#CDAD7D]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
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
                <img src="/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249408-HDR.jpg" alt="Sovran builders" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Builders Section - Accent Background (Second Section) */}
      <section 
          className="py-32 px-4 sm:px-6 lg:px-8 relative bg-[#faf0e1] overflow-hidden"
        >
          {/* Oversized "B" in the background */}
          <div
            className="absolute select-none pointer-events-none"
            style={{
              fontSize: '80rem',
              lineHeight: '0',
              bottom: '-5rem',
              right: '-15rem',
              opacity: 0.05,
              zIndex: 0,
              color: '#000000',
              fontFamily: 'IvyMode',
            }}
          >
            <span className="ivymode">S</span>
          </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="animate-image overflow-hidden  order-2 md:order-1">
              <img src="/images/AdobeStock_586937970.png" alt="Sovran Builders project" className="w-full h-auto" />
            
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="font-sans text-4xl md:text-5xl md:text-6xl text-black mb-6 ivymode split-text">Sovran Builders</h2>
              <h3 className="text-dark-900 text-xl mb-4">Formerly Taaj Design and Build</h3>
              <div className="w-24 h-1 bg-black mb-8"></div>
              <p className="text-black/90 leading-relaxed animate-paragraph">
                Sovran Builders was founded with a mission to empower homeowners to transform their vision into reality. Specializing in full-scale renovations, custom home solutions, and large construction projects across London and beyond, we emphasize clear communication, transparency, and precision at every stage of the project.
              </p>
              <p className="text-black/90 leading-relaxed animate-paragraph">
                From the first consultation to the final installation, we stand by our clients every step of the way, ensuring that every detail aligns with their vision and lifestyle. By combining technical expertise with a focus on innovation and sustainability, we deliver results that exceed expectations while maintaining efficiency and cost-effectiveness.
              </p>
              <div className="pt-6">
                <ArrowButton
                  text="Explore Our Building Services"
                  to="/sovran-builders"
                  className="text-black hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Interiors Section - White Background */}
      <section className="py-36 px-4 sm:px-6 lg:px-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-sans text-4xl md:text-5xl  lg:text-6xl text-dark-900 mb-6 ivymode split-text">Sovran Interiors</h2>
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
                <img src="/images/Aqib-10-Harold-Rd-027-scaled.jpg" alt="Luxury wardrobe" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg" alt="Luxury kitchen" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Shaker-wardrobe_MrWardrobe-scaled.jpg" alt="Wardrobe design" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Copy-of-Taaj-Kitchens-Home-Bars_Wine-storages-scaled.jpg" alt="Kitchen renovation" className="w-full h-full object-cover" />
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
              <h2 className="font-sans text-4xl md:text-5xl md:text-6xl  text-white mb-6 ivymode split-text">Sovran Design</h2>
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
      <section ref={philosophyRef} className="py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black mb-6 ivymode split-text">Our Shared Philosophy</h2>
            <div className="w-24 h-1 bg-[#CDAD7D] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-image">
              <img src="/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg" alt="Craftsmanship" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl  text-black mb-3">Craftsmanship</h3>
              <p className="text-gray-800">
                All three brands are built on the foundation of exceptional craftsmanship. We take pride in the meticulous attention to detail that goes into every project.
              </p>
            </div>
            <div className="animate-image">
              <img src="/images/Dressing-Rooms.1.png.png" alt="Quality" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl  text-black mb-3">Quality</h3>
              <p className="text-gray-800">
                We never compromise on quality. From materials to execution, every aspect of our work meets the highest standards in the industry.
              </p>
            </div>
            <div className="animate-image">
              <img src="/images/Traditional-Craftmanship-Taaj-kitchens-Homepage-1.png" alt="Customer Satisfaction" className="rounded-lg shadow-xl mb-6 w-full h-64 object-cover" />
              <h3 className="text-xl  text-black mb-3">Customer Satisfaction</h3>
              <p className="text-gray-800">
                We reject conventional approaches and embrace creativity, offering each client a truly personalized service that reflects their individual needs and personalities.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-800 max-w-4xl mx-auto">
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
          backgroundImage: "url('/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-dark-800/70 backdrop-blur-sm p-10 rounded-xl border border-primary-600/20 shadow-2xl">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl  text-white mb-6 ivymode split-text">Sustainability & Ethical Sourcing</h2>
            <div className="w-24 h-1 bg-primary-600 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-image rounded-xl overflow-hidden shadow-2xl">
                <img src="/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg" alt="Sustainable materials" className="w-full h-auto" />
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
      <section className="py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black mb-6 ivymode split-text">Why Choose Us</h2>
            <div className="w-24 h-1 bg-[#CDAD7D] mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover what sets Sovran Group apart in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <ul className="space-y-6">
                <li className="flex items-start animate-paragraph">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-black mb-2">Bespoke Solutions</h3>
                    <p className="text-gray-700">Whether it's a full renovation, a custom wardrobe, a luxury kitchen, or architectural design, we provide personalized, tailor-made solutions.</p>
                  </div>
                </li>
                <li className="flex items-start animate-paragraph">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-black mb-2">Expert Craftsmanship</h3>
                    <p className="text-gray-700">Each piece, whether it's a kitchen, wardrobe, or architectural design, is crafted to the highest standards.</p>
                  </div>
                </li>
                <li className="flex items-start animate-paragraph">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-black mb-2">Sustainability & Quality</h3>
                    <p className="text-gray-700">We prioritize eco-friendly practices and use only premium, ethically sourced materials.</p>
                  </div>
                </li>
                <li className="flex items-start animate-paragraph">
                  <div className="bg-[#CDAD7D] p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-black mb-2">Customer-Centered</h3>
                    <p className="text-gray-700">Every project is a collaboration with the client, ensuring their vision comes to life.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" alt="Luxury interior" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/traditional-kitchen-extension.jpg" alt="Bespoke solution" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl">
                <img src="/images/Top-slider-2-Taaj-Kitchens.png" alt="Luxury kitchen" className="w-full h-full object-cover" />
              </div>
              <div className="animate-image rounded-lg overflow-hidden shadow-xl mt-8">
                <img src="/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg" alt="Walk-in wardrobe" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF0E1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-6xl md:text-4xl text-black mb-6 ivymode split-text">
        Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-black mb-8">
        If you're ready to begin your next project with Sovran Builders, Sovran Interiors, or Sovran Design, we're here to help turn your dream space into a reality.
          </p>
          <a 
        href="/contact" 
        className="inline-block px-8 py-3 bg-black hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300"
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
