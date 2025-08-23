import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ArrowButton from '../components/ArrowButton';
import '../styles/fallback.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutPage: React.FC = () => {
  // State to track if animations are ready
  const [animationsReady, setAnimationsReady] = useState(false);
  
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
          backgroundImage: "url('/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg')",
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

      {/* Every Space Has a Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black mb-6 ivymode">Every Space Has a Story</h2>
          <div className="w-24 h-1 bg-[#CDAD7D] mx-auto mb-8"></div>
          <div className="w-full mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 text-gray-800 leading-relaxed text-justify md:text-left max-w-7xl mx-auto">
              <div className="prose max-w-none">
                <p>
                  What gives a space its power? Is it the walls that contain it, the roof that shelters it — or the lives that unfold within? Every space tells a story. Not through steel or stone, but in the way architecture can move our spirits, in the way surroundings shape our mood, and in the way culture and people breathe life into a place. A powerful space does more than function — it resonates. It inspires. It endures.
                </p>
              </div>
              <div className="prose max-w-none">
                <p>
                  At Sovran, we believe the purpose of design and construction is to give shape to those stories. For a family, it may be a sanctuary of belonging. For a developer, an investment that carries influence and permanence. For every client, it is the assurance that vision can become reality, and reality can carry meaning far beyond the physical form. This is why every space has a story — because within each line, detail, and decision lives the ambition of those who imagined it.
                </p>
              </div>
              <div className="prose max-w-none">
                <p>
                  We approach each commission not as a project, but as a composition — architecture as structure, construction as rhythm, interiors as voice. Together they form a narrative that is lived, felt, and remembered. The spaces we create are not backdrops, but catalysts — enriching lives, elevating value, and reflecting the culture and aspirations of those who call them their own.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden ">
              <img src="/assets/images/Aqib-10-Harold-Rd-027-scaled.jpg" alt="Residential" className="w-full h-64 object-cover" />
              <div className="p-4 text-center text-sm text-gray-700">Residential — sanctuary and memory</div>
            </div>
            <div className="rounded-lg overflow-hidden ">
              <img src="/assets/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg" alt="Commercial" className="w-full h-64 object-cover" />
              <div className="p-4 text-center text-sm text-gray-700">Commercial — ambition and growth</div>
            </div>
            <div className="rounded-lg overflow-hidden ">
              <img src="/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg" alt="Legacy" className="w-full h-64 object-cover" />
              <div className="p-4 text-center text-sm text-gray-700">Legacy — permanence and pride</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Built on Craft, Carved in Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-sans text-3xl md:text-4xl text-black mb-4 ivymode">Our Story</h2>
            <h3 className="text-2xl text-black mb-4 font-serif">Built on Craft, Carved in Vision</h3>
            <div className="prose text-gray-800">
              <p>
                Great spaces don’t simply appear. They are imagined, refined, and realised through vision, experience, and a relentless pursuit of excellence. They are born from an idea and brought to life with courage, discipline, and devotion to craft.
              </p><br />
              <p>
                Our founder began his career in the joinery trade, where he learned that a single millimetre could be the difference between harmony and discord. From there he entered the world of Knight Frank, gaining an intimate understanding of what truly defines value — how a space becomes not only functional, but desirable, iconic, and enduring. That unique blend of craftsmanship and market insight evolved into property development, and ultimately, into Sovran.
              </p><br />
              <p>
                Today, Sovran stands as a partner for both residential and commercial clients, trusted to deliver projects that range from family sanctuaries to landmark developments. Over the years, our work has extended into circles of influence and discretion — serving clients whose standards allow for no compromise. These experiences have shaped our philosophy: true design and construction are as much about trust and vision as they are about form and function.
              </p><br />
              <p>
                We do not simply build properties. We craft sanctuaries, stories, and legacies. Each project a reflection of ambition, precision, and permanence — a Sovran imprint that endures long after the final stone is set.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg overflow-hidden ">
              <img src="/assets/images/MrWardrobe-Magazine--739x1024.jpg" alt="Team portrait" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden ">
              <img src="/assets/images/Picsart_24-04-22_16-00-14-025-scaled.jpg" alt="Community dinner" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Ethos / Mission / Vision / Why Sovran */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-sans text-3xl md:text-4xl text-black mb-4 ivymode">Our Ethos</h2>
            <div className="w-24 h-1 bg-[#CDAD7D] mb-8"></div>

            <div className="p-6 min-h-[220px]">
              <div className="flex items-start gap-6">
                <div>
                  <i className="fas fa-thumbs-up text-[#CDAD7D] text-4xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="text-2xl text-black font-semibold mb-3">A Philosophy, Not a Business</h3>
                  <p className="text-gray-700">We believe in timelessness over trend. In precision over shortcuts. In trust over transaction. Every line we draw and every stone we set must serve both purpose and meaning.</p>
                </div>
              </div>
              <div className="mt-6 text-gray-500 text-sm">Craft, clarity and care guide every decision.</div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-black">Mission</h4>
                <p className="text-gray-700">Our mission is to redefine the way homes and buildings are created. To unite design, construction, and interiors with transparency and care.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-black">Vision</h4>
                <p className="text-gray-700">Our vision is to establish Sovran as the most trusted name in design and build — a brand synonymous with integrity, intelligence, and influence.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#FEF7F0] p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl text-black font-semibold mb-4">Why Sovran</h3>
              <p className="text-gray-700 mb-4">Trusted Where It Matters Most — the answer lies in the sum of many projects and the trust we earn.</p>
              <ul className="space-y-3 text-gray-800 mb-6 text-sm">
                <li>1785+ properties transformed</li>
                <li>Projects from £50,000 to multi-million pound developments</li>
                <li>£15M+ delivered in the past year</li>
              </ul>
              <a href="/contact" className="inline-block px-6 py-3 bg-[#CDAD7D] text-dark-900 rounded-md">Request consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute h-64 w-64 rounded-full bg-primary-500/10 -top-20 -left-20 blur-xl"></div>
          <div className="absolute h-96 w-96 rounded-full bg-[#CDAD7D]/10 bottom-0 right-0 blur-3xl"></div>
          <div className="absolute h-40 w-40 rounded-full bg-primary-600/5 top-1/2 left-1/2 blur-xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl text-white mb-6 ivymode split-text">
              A Proven Process for a Seamless Build
            </h2>
            <div className="w-24 h-1 bg-[#CDAD7D] mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#CDAD7D] to-primary-600 opacity-70"></div>
            
            {/* Process steps */}
            <div className="space-y-24">
              {/* Step 1 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right animate-paragraph">
                  <h3 className="text-2xl text-white mb-4 font-medium">1. Consultation & Concept</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We begin by understanding your vision, requirements, and budget. 
                    Our experts collaborate with you to develop initial concepts that 
                    align with your aesthetic preferences and functional needs.
                  </p>
                </div>
                <div className="md:order-first md:flex md:justify-end relative animate-image">
                  <div className="absolute left-1/2 md:left-auto md:right-0 top-1/2 transform -translate-y-1/2 md:-translate-y-1/2 -translate-x-1/2 md:translate-x-1/2 z-20">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#CDAD7D] text-white text-xl font-bold border-4 border-dark-900">
                      1
                    </div>
                  </div>
                  <div className="h-48 w-full md:w-4/5 bg-gradient-to-r from-primary-600/20 to-[#CDAD7D]/20 rounded-lg backdrop-blur-sm border border-white/10 p-0 overflow-hidden">
                    <img 
                      src="/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Bushra Kitchen View.jpg" 
                      alt="Consultation & Concept" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="animate-paragraph">
                  <h3 className="text-2xl text-white mb-4 font-medium">2. Planning & Design</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our design team creates detailed plans and 3D visualizations 
                    of your project. We refine these with your input until every 
                    detail meets your expectations, ensuring the design aligns 
                    perfectly with your vision.
                  </p>
                </div>
                <div className="relative animate-image">
                  <div className="absolute left-1/2 md:left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 z-20">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#CDAD7D] text-white text-xl font-bold border-4 border-dark-900">
                      2
                    </div>
                  </div>
                  <div className="h-48 w-full md:w-4/5 bg-gradient-to-r from-[#CDAD7D]/20 to-primary-600/20 rounded-lg backdrop-blur-sm border border-white/10 p-0 overflow-hidden">
                    <img 
                      src="/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Pawan Kitchen render.jpg" 
                      alt="Planning & Design" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right animate-paragraph">
                  <h3 className="text-2xl text-white mb-4 font-medium">3. Build & Project Management</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our skilled craftsmen and project managers bring your design 
                    to life with meticulous attention to detail. We maintain clear 
                    communication throughout the build process, ensuring timely 
                    progress updates and addressing any questions.
                  </p>
                </div>
                <div className="md:order-first md:flex md:justify-end relative animate-image">
                  <div className="absolute left-1/2 md:left-auto md:right-0 top-1/2 transform -translate-y-1/2 md:-translate-y-1/2 -translate-x-1/2 md:translate-x-1/2 z-20">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#CDAD7D] text-white text-xl font-bold border-4 border-dark-900">
                      3
                    </div>
                  </div>
                  <div className="h-48 w-full md:w-4/5 bg-gradient-to-r from-primary-600/20 to-[#CDAD7D]/20 rounded-lg backdrop-blur-sm border border-white/10 p-0 overflow-hidden">
                    <img 
                      src="/assets/images/MrWardrobe-manufacturing-unit.jpg" 
                      alt="Build & Project Management" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="animate-paragraph">
                  <h3 className="text-2xl text-white mb-4 font-medium">4. Interiors & Final Styling</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our interior design experts add the finishing touches, from 
                    selecting premium materials and finishes to installing custom 
                    fixtures and fittings. We ensure every element works in harmony 
                    to create a cohesive, luxurious space.
                  </p>
                </div>
                <div className="relative animate-image">
                  <div className="absolute left-1/2 md:left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 z-20">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#CDAD7D] text-white text-xl font-bold border-4 border-dark-900">
                      4
                    </div>
                  </div>
                  <div className="h-48 w-full md:w-4/5 bg-gradient-to-r from-[#CDAD7D]/20 to-primary-600/20 rounded-lg backdrop-blur-sm border border-white/10 p-0 overflow-hidden">
                    <img 
                      src="/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/Luxurious Kitchens- 80K+/Picsart_24-06-05_16-35-21-840.jpg" 
                      alt="Interiors & Final Styling" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right animate-paragraph">
                  <h3 className="text-2xl text-white mb-4 font-medium">5. Handover & Aftercare</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We provide a comprehensive handover of your completed project, 
                    ensuring you understand all features and systems. Our commitment 
                    doesn't end at delivery—we offer dedicated aftercare service to 
                    address any needs that arise after completion.
                  </p>
                </div>
                <div className="md:order-first md:flex md:justify-end relative animate-image">
                  <div className="absolute left-1/2 md:left-auto md:right-0 top-1/2 transform -translate-y-1/2 md:-translate-y-1/2 -translate-x-1/2 md:translate-x-1/2 z-20">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#CDAD7D] text-white text-xl font-bold border-4 border-dark-900">
                      5
                    </div>
                  </div>
                  <div className="h-48 w-full md:w-4/5 bg-gradient-to-r from-primary-600/20 to-[#CDAD7D]/20 rounded-lg backdrop-blur-sm border border-white/10 p-0 overflow-hidden">
                    <img 
                      src="/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg" 
                      alt="Handover & Aftercare" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          <div className="flex justify-center mt-20">
              <ArrowButton
                text="Start Your Project Today"
                to="/contact"
                className="text-white hover:text-primary-500"
              />
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF0E1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-4xl md:text-5xl text-black mb-6 ivymode">
            Great spaces do not wait.
          </h2>
          <p className="text-lg text-black mb-8">
            Great spaces do not wait. They are imagined, pursued, and brought to life with urgency and intention. The question is not if — but when you will begin yours.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-black hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300"
          >
            Begin Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
