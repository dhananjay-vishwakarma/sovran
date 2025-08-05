import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable, SplitText);

const HomePage: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const buildersRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const interiorsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // First ensure all elements are visible by default
    gsap.set('h1, h2, h3, h4, h5, h6, p, .reveal-image, .reveal-image img, .grid, ul, li', { 
      opacity: 1 
    });

    // Initialize testimonials draggable slider
    const slider = document.querySelector("#testimonial-slider");
    const track = document.querySelector("#testimonial-track");
    
    if (slider && track) {
      Draggable.create(track, {
        type: "x",
        bounds: slider,
        inertia: true,
        dragResistance: 0.4,
        edgeResistance: 0.65
      });
    }
    
    // GSAP animations for each section with different effects
    
    // About section title animation - Staggered letter reveal
    const aboutTitle = aboutRef.current?.querySelector('h2');
    if (aboutTitle) {
      const splitText = new SplitText(aboutTitle, { type: "chars,words" });
      gsap.fromTo(splitText.chars, 
        { opacity: 0, y: 20, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          stagger: 0.02,
          duration: 1,
          ease: "back.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // About section content animation - Slide up with increased spacing
    const aboutContent = aboutRef.current?.querySelectorAll('p, .grid');
    if (aboutContent) {
      gsap.fromTo(aboutContent,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Builders section title animation - Slide in from left
    const buildersTitle = buildersRef.current?.querySelector('h2');
    if (buildersTitle) {
      gsap.fromTo(buildersTitle,
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buildersRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Builders section content animation - Fade in sequence
    const buildersContent = buildersRef.current?.querySelectorAll('p, ul, .reveal-image');
    if (buildersContent) {
      gsap.fromTo(buildersContent,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: buildersRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Design section title animation - Scale reveal
    const designTitle = designRef.current?.querySelector('h2');
    if (designTitle) {
      gsap.fromTo(designTitle,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: designRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Design section content animation - Clip reveal
    const designContent = designRef.current?.querySelectorAll('p, ul, .reveal-image');
    if (designContent) {
      gsap.fromTo(designContent,
        { opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { 
          opacity: 1, 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: designRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Interiors section title animation - Word by word
    const interiorsTitle = interiorsRef.current?.querySelector('h2');
    if (interiorsTitle) {
      const splitText = new SplitText(interiorsTitle, { type: "words" });
      gsap.fromTo(splitText.words,
        { opacity: 0, y: 40, rotationZ: 2 },
        { 
          opacity: 1, 
          y: 0,
          rotationZ: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: interiorsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Interiors section content animation - Grid reveal
    const interiorsContent = interiorsRef.current?.querySelectorAll('p, ul, .grid');
    if (interiorsContent) {
      gsap.fromTo(interiorsContent,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: interiorsRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Testimonials section title animation - Pop reveal
    const testimonialsTitle = testimonialsRef.current?.querySelector('h2');
    if (testimonialsTitle) {
      gsap.fromTo(testimonialsTitle,
        { opacity: 0, scale: 1.2 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Case studies section animations - 3D rotation
    const caseStudiesTitle = caseStudiesRef.current?.querySelector('h2');
    if (caseStudiesTitle) {
      gsap.fromTo(caseStudiesTitle,
        { opacity: 0, rotationX: 45, y: 50 },
        { 
          opacity: 1, 
          rotationX: 0,
          y: 0,
          transformOrigin: "50% 50%",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    const caseStudiesCards = caseStudiesRef.current?.querySelectorAll('.reveal-image');
    if (caseStudiesCards) {
      gsap.fromTo(caseStudiesCards,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (track) {
        const draggableInstance = Draggable.get(track);
        if (draggableInstance) {
          draggableInstance.kill();
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      <HeroSection />

      {/* About Sovran Group Section */}
      <section ref={aboutRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <h2 className="font-sans text-4xl md:text-5xl text-black text-thin text-center" style={{ marginBottom: "10rem" }}>
              At Sovran Group, We <span style={{ color: "#CDAD7D" }}>Design, Build and Inspire.</span>
            </h2>
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <p className="text-lg leading-relaxed text-black ivymode-regular">
                Sovran Group combines the expertise of <span style={{ color: "#CDAD7D" }}>Builders</span>, <span style={{ color: "#CDAD7D" }}>Design</span>, and <span style={{ color: "#CDAD7D" }}>Interiors</span> under one unified brand. We focus on crafting spaces that reflect your personality and lifestyle with quality and excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="reveal-image order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src="/images/Home-Renovations.1.png" 
                    alt="Full Home Renovations" 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ background: 'white' }}
                  />
                  {/* Decorative corners, no overlays */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4" style={{ borderColor: "#CDAD7D" }}></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4" style={{ borderColor: "#CDAD7D" }}></div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h3 className="text-3xl text-black mb-6">
                    <span style={{ color: "#CDAD7D" }}>01.</span> Full Home Renovations
                  </h3>
                  <p className="text-black">Transform your living space with our comprehensive renovation services, designed to elevate both aesthetics and functionality.</p>
                </div>
                
                <div>
                  <h3 className="text-3xl text-black mb-6">
                    <span style={{ color: "#CDAD7D" }}>02.</span> Bespoke Kitchens & Wardrobes
                  </h3>
                  <p className="text-black">Custom-crafted solutions that blend seamlessly with your home's character while maximizing space and utility.</p>
                </div>
                
                <div>
                  <h3 className="text-3xl text-black mb-6">
                    <span style={{ color: "#CDAD7D" }}>03.</span> Luxury Interiors
                  </h3>
                  <p className="text-black">Exquisite interior designs that reflect your personal style, featuring premium materials and expert craftsmanship.</p>
                </div>
                
                <div className="pt-4">
                  <Button
                    text="Let's Get Started"
                    to="/contact"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <div className="reveal-image overflow-hidden">
                <img 
                  src="/images/Shaker-wardrobe_MrWardrobe-scaled.jpg" 
                  alt="Bespoke Kitchens & Wardrobes" 
                  className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="reveal-image overflow-hidden">
                <img 
                  src="/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg" 
                  alt="Luxury Interiors" 
                  className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="reveal-image overflow-hidden">
                <img 
                  src="/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg" 
                  alt="Custom Designs" 
                  className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Builders Section */}
      <section ref={buildersRef} className="py-28 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-sans text-4xl md:text-5xl" style={{ marginBottom: "2.5rem" }}>
                <span className="text-primary-600">Sovran Builders</span> – Building the Future, One Project at a Time
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 ivymode-regular">
                From custom home builds to full-scale renovations, Sovran Builders provides end-to-end construction services with a focus on quality and attention to detail. Whether it's a new build or a renovation, we're committed to delivering exceptional results that stand the test of time.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Full-scale Home Renovations",
                  "New Builds & Extensions",
                  "Property Development",
                  "Structural Works",
                  "Project Management"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-lg text-gray-200 ivymode-regular">
                    <span className="text-primary-500 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button
                text="Talk to Our Experts"
                to="/contact"
              />
            </div>
            
            <div className="reveal-image relative">
              <img
                src="/images/home-builder-2.jpg"
                alt="Sovran Builders Project"
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white py-4 px-8 rounded-lg shadow-xl">
                <span className="text-3xl font-bold">15+</span>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Design Section */}
      <section ref={designRef} className="py-32 px-4 sm:px-6 lg:px-8" style={{
        backgroundImage: "url('/images/Taaj-kitchens-London-showroom-1-scaled.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 -z-10 rounded-xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12">
            <div className="reveal-image order-2 lg:order-1 relative">
              <img
                src="/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg"
                alt="Sovran Design Project"
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-dark-900 py-4 px-8 rounded-lg shadow-xl">
                <span className="text-3xl font-bold text-primary-600">100%</span>
                <p className="text-sm">Custom Designs</p>
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="font-sans text-4xl md:text-5xl text-white" style={{ marginBottom: "2.5rem" }}>
                Sovran Design – Where Vision Meets Architecture
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed mb-8 ivymode-regular">
                Our expert team specializes in high-end bespoke designs that enhance your home's character. Whether it's a kitchen, wardrobe, or entire home makeover, Sovran Design combines creativity with precision to deliver innovative, luxury designs that match your lifestyle.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Bespoke Kitchens & Cabinets",
                  "Luxury Wardrobe & Storage Solutions",
                  "Full Home Aesthetic Design",
                  "3D Visualizations & Renderings",
                  "Architectural Consultations"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-lg text-gray-200">
                    <span className="text-primary-500 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button
                text="Design Your Dream Space"
                to="/contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sovran Interiors Section */}
      <section ref={interiorsRef} className="py-28 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-sans text-4xl md:text-5xl text-white" style={{ marginBottom: "2.5rem" }}>
                Sovran Interiors – Elevating Your Home's Style with Custom Designs
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 ivymode-regular">
                We create custom furniture, beautiful interiors, and elegant storage solutions that reflect your personality. Sovran Interiors offers luxurious home decor designed to maximize both beauty and functionality in your living spaces.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Bespoke Furniture Design",
                  "Walk-in Wardrobes & Storage",
                  "Home Office & Workspace Design",
                  "Interior Design for Every Room",
                  "Custom Home Decor Solutions"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-lg text-gray-200">
                    <span className="text-primary-500 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button
                text="Create a Home That Reflects You"
                to="/contact"
              />
            </div>
            
            <div className="reveal-image grid grid-cols-2 gap-4">
              <img
                src="/images/bespoke-loft-wardrobe_MrWardrobe_0005-scaled.jpg"
                alt="Bespoke Wardrobe"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/images/Walk-in-wardrobe_MrWardrobe-scaled.jpg"
                alt="Luxury Interior"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/images/Shaker-wardrobe_MrWardrobe-scaled.jpg"
                alt="Custom Furniture"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/images/Sliding-door-wardrobes_MrWardrobe-scaled.jpg"
                alt="Storage Solutions"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-4xl md:text-5xl text-black text-center mb-16" style={{ marginBottom: "3rem" }}>
            What Our Clients Say
          </h2>
          <div
            id="testimonial-slider"
            className="overflow-x-auto cursor-grab scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
              overflow: 'auto',
            }}
          >
            <div
              id="testimonial-track"
              className="flex space-x-12 pb-4"
              style={{ minWidth: '100%' }}
            >
              {[
                {
                  name: "Henry Taylor",
                  quote:
                    "Sovran Builders transformed our home! The quality and professionalism exceeded our expectations. They completed our project on time and within budget, and the results are stunning!",
                },
                {
                  name: "Mani Shoker",
                  quote:
                    "From the design phase to installation, Sovran Design brought our kitchen dream to life. Their attention to detail and commitment to quality was unmatched. Highly recommend!",
                },
                {
                  name: "Caroline Goodson",
                  quote:
                    "Sovran Interiors designed our new wardrobes and living room. It was exactly what we wanted, with the perfect balance of style and function. Our home has never looked better.",
                },
                {
                  name: "Maria Carolina",
                  quote:
                    "The Sovran team was a pleasure to work with from start to finish. Their professionalism and creativity made our renovation project stress-free and enjoyable.",
                },
                {
                  name: "Matthew & Jason",
                  quote:
                    "We are thrilled with our new kitchen and living space. The attention to detail and quality of workmanship is outstanding. Thank you, Sovran Group!",
                },
                {
                  name: "Em Sheldon",
                  quote:
                    "Sovran Group exceeded our expectations. The design process was collaborative and the final result is both beautiful and functional.",
                },
                {
                  name: "Carlie Goodson",
                  quote:
                    "We love our new bespoke wardrobes and the transformation of our home. Sovran Interiors truly listened to our needs and delivered beyond our hopes.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-96 max-w-full px-8 py-10 border border-black bg-white"
                  style={{
                    minWidth: 350,
                    maxWidth: 400,
                    borderLeft: index === 0 ? '2px solid #CDAD7D' : undefined,
                    borderRight: index === 2 ? '2px solid #CDAD7D' : undefined,
                  }}
                >
                  <div className="mb-6 text-black flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="#CDAD7D"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-black italic flex-grow mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-auto">
                    <p className="font-semibold text-black text-lg">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-28 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sans text-4xl md:text-5xl text-white" style={{ marginBottom: "3rem" }}>
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
            <Button
              text="View More Projects"
              to="/contact"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-sans text-3xl md:text-4xl text-white" style={{ marginBottom: "2rem" }}>
            Get in Touch with Sovran Group Today!
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Ready to build your dream space? Whether you're starting a full renovation or designing a luxury kitchen, Sovran Group is here to help. Contact us now for a consultation.
          </p>
          <Button
            text="Contact Us Now"
            to="/contact"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
