import { useEffect } from 'react';
import { Star, CheckCircle, Users, Award, Clock, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SovranInteriors = () => {
  useEffect(() => {
    // Hero animations with luxury effects
    gsap.fromTo('.hero-content', 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' }
    );

    // Floating animation for service cards
    gsap.to('.floating-card', {
      y: -15,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

    // Services grid animation
    gsap.fromTo('.service-item', 
      { opacity: 0, y: 80, rotationX: 30 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%',
        }
      }
    );

    // Process steps animation
    gsap.fromTo('.process-step', 
      { opacity: 0, scale: 0.5, rotation: -10 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 70%',
        }
      }
    );

    // Testimonials animation
    gsap.fromTo('.testimonial-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 70%',
        }
      }
    );

  }, []);

  const wardrobeServices = [
    {
      title: 'Walk-In Wardrobes',
      description: 'Luxurious walk-in wardrobes that create your own personal boutique experience.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sliding Wardrobes',
      description: 'Space-saving sliding wardrobe solutions with premium finishes and smooth operation.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Loft Wardrobes',
      description: 'Maximize your loft space with bespoke storage solutions tailored to angled spaces.',
      image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Office Storage',
      description: 'Professional office storage solutions that blend functionality with elegant design.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'TV Units',
      description: 'Bespoke entertainment units that seamlessly integrate with your living space.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Display Units',
      description: 'Elegant display solutions to showcase your treasured items with style.',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const kitchenServices = [
    {
      title: 'Contemporary Kitchens',
      description: 'Modern kitchen designs with clean lines and innovative storage solutions.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Traditional Kitchens',
      description: 'Timeless kitchen designs that blend classic elegance with modern functionality.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'German & Scandinavian Kitchens',
      description: 'Precision-engineered kitchens inspired by European design excellence.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Open-Plan Kitchens',
      description: 'Seamlessly integrated kitchen designs perfect for modern living.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Select Your Style',
      description: 'Browse our extensive collection of bespoke wardrobes or kitchen designs to find what resonates with your vision.'
    },
    {
      number: '02',
      title: 'Speak to Our Designers',
      description: 'Collaborate with our expert design team to bring your dream space to life with tailored advice and innovative solutions.'
    },
    {
      number: '03',
      title: 'Receive Your Design & Quote',
      description: 'Get a comprehensive design proposal with 3D renders and clear, transparent pricing.'
    },
    {
      number: '04',
      title: 'Relax While We Transform',
      description: 'Sit back and enjoy the process as we bring your dream wardrobe or kitchen to life with meticulous craftsmanship.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-premium-black via-premium-charcoal to-premium-dark text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-premium-black/80 via-premium-charcoal/60 to-premium-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="hero-content">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold mb-6 text-premium-gold text-shadow-gold">
              Sovran Interiors
            </h1>
            <h2 className="hero-subtitle text-2xl md:text-4xl font-inter font-light tracking-wide mb-8 text-premium-platinum">
              Bespoke Luxury for Every Space
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 text-premium-platinum/90">
              Transform Your Home with Customised Craftsmanship. Discover luxury and functionality with our bespoke storage solutions and tailored kitchen designs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-premium-gold to-premium-gold-dark text-premium-black px-10 py-4 font-inter font-semibold tracking-wide uppercase hover:shadow-2xl hover:shadow-premium-gold/30 transition-all duration-500 hover:scale-105 glow-gold">
                View Portfolio
              </button>
              <button className="border-2 border-premium-gold text-premium-gold px-10 py-4 font-inter font-semibold tracking-wide uppercase hover:bg-premium-gold hover:text-premium-black transition-all duration-500 hover:scale-105">
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Wardrobes Section */}
      <section className="py-24 bg-gradient-to-b from-premium-dark to-premium-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-gold">
              Bespoke Wardrobes by Mr Wardrobe
            </h2>
            <h3 className="text-2xl font-inter font-light tracking-wide mb-6 text-premium-platinum">
              Maximise Storage in Style
            </h3>
            <p className="text-xl text-premium-platinum/80 max-w-4xl mx-auto leading-relaxed">
              Mr Wardrobe offers exclusive, handcrafted wardrobes and storage solutions, transforming your home with precision and elegance. From walk-in wardrobes to sliding doors, each piece is tailored to meet your needs.
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wardrobeServices.map((service, index) => (
              <div key={index} className="service-item floating-card group">
                <div className="luxury-card hover:shadow-2xl hover:shadow-premium-gold/20 transition-all duration-700 hover:scale-105 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-cinzel font-semibold mb-4 text-premium-gold">
                      {service.title}
                    </h3>
                    <p className="text-premium-platinum/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Kitchens Section */}
      <section className="py-24 bg-gradient-to-b from-premium-charcoal to-premium-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-gold">
              Bespoke Kitchens by Taaj
            </h2>
            <h3 className="text-2xl font-inter font-light tracking-wide mb-6 text-premium-platinum">
              A Kitchen That Feels Like Home
            </h3>
            <p className="text-xl text-premium-platinum/80 max-w-4xl mx-auto leading-relaxed">
              At Taaj, we craft kitchens that are not only functional but beautifully tailored to your lifestyle. From modern, contemporary kitchens to timeless traditional designs, every detail is meticulously crafted to create the heart of your home.
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kitchenServices.map((service, index) => (
              <div key={index} className="service-item floating-card group">
                <div className="luxury-card hover:shadow-2xl hover:shadow-premium-gold/20 transition-all duration-700 hover:scale-105 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-cinzel font-semibold mb-3 text-premium-gold">
                      {service.title}
                    </h3>
                    <p className="text-premium-platinum/80 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-premium-black to-premium-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-gold">
              Why Choose Us?
            </h2>
            <p className="text-xl text-premium-platinum/80 max-w-3xl mx-auto leading-relaxed">
              Whether you're reimagining your kitchen or revamping your wardrobe, we promise:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Timeless Elegance',
                description: 'Beautifully crafted pieces designed to last.'
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Tailored to You',
                description: 'Custom solutions that fit your lifestyle, space, and aesthetic.'
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: 'Exceptional Craftsmanship',
                description: 'From design to installation, we deliver unparalleled quality.'
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: 'Fast Installation',
                description: 'Bespoke wardrobes installed within 2-3 weeks. Kitchens within your desired timeline.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="text-premium-gold group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-cinzel font-semibold mb-4 text-premium-gold">
                  {feature.title}
                </h3>
                <p className="text-premium-platinum/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section py-24 bg-gradient-to-b from-premium-charcoal to-premium-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-gold">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-premium-gold to-premium-gold-dark rounded-full flex items-center justify-center mx-auto mb-4 text-premium-black font-cinzel font-bold text-2xl">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-premium-gold/30 -z-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-cinzel font-semibold mb-4 text-premium-gold">
                  {step.title}
                </h3>
                <p className="text-premium-platinum/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-24 bg-gradient-to-b from-premium-dark to-premium-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-gold">
              Client Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial-card luxury-card p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-premium-gold fill-current" />
                ))}
              </div>
              <p className="text-lg text-premium-platinum/90 leading-relaxed mb-6 italic">
                "Money well spent. Affordable wardrobes that offer plenty of storage and look amazing."
              </p>
              <div>
                <p className="font-cinzel font-semibold text-premium-gold">Caroline Goodson</p>
                <p className="text-premium-platinum/60 text-sm">Mr Wardrobe Client</p>
              </div>
            </div>

            <div className="testimonial-card luxury-card p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-premium-gold fill-current" />
                ))}
              </div>
              <p className="text-lg text-premium-platinum/90 leading-relaxed mb-6 italic">
                "High-end kitchens, medium-end prices. The experience was smooth and the results were extraordinary."
              </p>
              <div>
                <p className="font-cinzel font-semibold text-premium-gold">Gurdeep Singh</p>
                <p className="text-premium-platinum/60 text-sm">Taaj Kitchens Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-premium-gold via-premium-gold-light to-premium-gold-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-premium-black">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl leading-relaxed mb-8 text-premium-black/80">
            Let's create something extraordinary together. Contact us today for your free consultation.
          </p>
          <button className="bg-premium-black text-premium-gold px-10 py-4 font-inter font-semibold tracking-wide uppercase hover:bg-premium-charcoal transition-all duration-500 hover:scale-105 inline-flex items-center group">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SovranInteriors;