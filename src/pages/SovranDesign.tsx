import { useEffect } from 'react';
import { Star, Play, Shield, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SovranDesign = () => {
  useEffect(() => {
    // Elegant fade-in animations
    gsap.fromTo('.hero-content', 
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-nav', 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    // Smooth scroll-triggered animations
    gsap.fromTo('.collection-tile', 
      { opacity: 0, y: 60, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.collections-grid',
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo('.testimonial-element', 
      { opacity: 0, x: -80 },
      { 
        opacity: 1, 
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-section',
          start: 'top 70%',
        }
      }
    );

    gsap.fromTo('.dream-panel', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.dream-section',
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo('.process-step', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 70%',
        }
      }
    );

  }, []);

  const collections = [
    {
      title: 'Classic Kitchen',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Timeless elegance'
    },
    {
      title: 'Contemporary',
      image: 'https://images.unsplash.com/photo-1556909114-50e0091c9a15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Modern sophistication'
    },
    {
      title: 'Woodworks',
      image: 'https://images.unsplash.com/photo-1556909114-62e5a5ee2e30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Natural warmth'
    },
    {
      title: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1556909114-4db72d76e8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Clean lines'
    },
    {
      title: 'Traditional',
      image: 'https://images.unsplash.com/photo-1556909114-5e9b0d8c5e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Heritage charm'
    },
    {
      title: 'Luxury',
      image: 'https://images.unsplash.com/photo-1556909114-b7d1bbcde4f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Premium finishes'
    },
    {
      title: 'Industrial',
      image: 'https://images.unsplash.com/photo-1556909114-dc6ad5fab9df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Urban edge'
    },
    {
      title: 'Scandinavian',
      image: 'https://images.unsplash.com/photo-1556909114-e42a96ac8bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Nordic simplicity'
    },
    {
      title: '5-Year Warranty',
      image: 'https://images.unsplash.com/photo-1556909114-3c9a96d2c4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Peace of mind',
      isWarranty: true
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 text-stone-800">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-800/50 to-stone-900/70"></div>
        </div>
        
        {/* Navigation */}
        <div className="hero-nav absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-8">
          <img 
            src="https://taajkitchens.co.uk/wp-content/uploads/2023/12/Picsart_24-04-30_16-32-00-759-2.png.webp" 
            alt="Taaj Kitchens" 
            className="h-16 w-auto filter brightness-0 invert"
          />
          <div className="hidden md:flex space-x-8">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 font-serif text-sm tracking-wide transition-all duration-300">
              BOOK NOW
            </button>
          </div>
          <div className="text-white text-right">
            <p className="font-serif text-sm">Call us today</p>
            <p className="font-mono text-lg">+44 1234 567890</p>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="hero-content relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8 leading-tight">
            A Kitchen That<br />Feels Like Home
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-12 opacity-90">
            Where culinary dreams meet exquisite craftsmanship
          </p>
        </div>
      </section>

      {/* Popular Collections Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-stone-800 uppercase tracking-wide">
              Explore Our Popular Collections
            </h2>
            <div className="w-24 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="collections-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <div key={index} className="collection-tile group cursor-pointer">
                <div className={`relative overflow-hidden aspect-square ${collection.isWarranty ? 'bg-gradient-to-br from-amber-600 to-amber-700' : ''}`}>
                  {collection.isWarranty ? (
                    <div className="flex flex-col items-center justify-center h-full text-white p-8">
                      <Shield className="w-16 h-16 mb-4" />
                      <h3 className="text-2xl font-serif font-semibold mb-2">{collection.title}</h3>
                      <p className="text-amber-100">{collection.description}</p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent">
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-xl font-serif font-semibold mb-1">{collection.title}</h3>
                          <p className="text-stone-200 text-sm">{collection.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial Section */}
      <section className="testimonial-section py-24 bg-stone-100 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1556909114-50e0091c9a15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="testimonial-element">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Client"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
            </div>
            <div className="testimonial-element">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl font-serif italic text-stone-700 leading-relaxed mb-6">
                  "Taaj Kitchens transformed our vision into reality. The attention to detail and quality of craftsmanship exceeded our expectations. Our kitchen is now the heart of our home."
                </blockquote>
                <cite className="text-stone-600 font-semibold">— Sarah & James Mitchell</cite>
                <p className="text-stone-500 text-sm">Luxury Kitchen Installation, London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dream Home Section */}
      <section className="dream-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-stone-800">
              Your Dream Home Awaits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="dream-panel text-center p-8 bg-stone-50 rounded-lg">
              <div className="text-4xl font-serif font-bold text-amber-600 mb-4">97%</div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-stone-800">Satisfied Customers</h3>
              <p className="text-stone-600 leading-relaxed">Our commitment to excellence has earned us the trust of homeowners across the UK.</p>
            </div>
            <div className="dream-panel">
              <img
                src="https://images.unsplash.com/photo-1556909114-4db72d76e8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Kitchen Inspiration"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="dream-panel text-center p-8 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-xl font-serif font-semibold mb-6 text-stone-800">Ready to Start?</h3>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 font-serif text-sm tracking-wide transition-all duration-300 w-full">
                BOOK CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Promo Section */}
      <section className="py-24 bg-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556909114-f7ac5e53e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Showroom"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div className="text-center p-6 border border-stone-600 rounded-lg">
                <div className="text-3xl font-serif font-bold text-amber-400 mb-2">10+</div>
                <p className="text-stone-300">Years of Experience</p>
              </div>
              <div className="text-center p-6 border border-stone-600 rounded-lg">
                <div className="text-3xl font-serif font-bold text-amber-400 mb-2">25</div>
                <p className="text-stone-300">Design Consultants</p>
              </div>
              <div className="text-center p-6 border border-stone-600 rounded-lg">
                <div className="text-3xl font-serif font-bold text-amber-400 mb-2">300+</div>
                <p className="text-stone-300">Completed Projects</p>
              </div>
              <div className="text-center">
                <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-8 py-3 font-serif text-sm tracking-wide transition-all duration-300">
                  VISIT OUR SHOWROOM
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light leading-relaxed text-stone-800 max-w-4xl mx-auto">
              Functional Kitchens That Look As Good As They Make You Feel
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                <h3 className="text-xl font-serif font-semibold mb-4 text-stone-800">A Message from Our Founder</h3>
                <p className="text-stone-600 leading-relaxed mb-6 italic">
                  "Every kitchen tells a story. Our role is to ensure that story reflects the dreams, aspirations, and lifestyle of the family who will call it home. We don't just design kitchens; we craft experiences."
                </p>
                <div className="border-t border-stone-200 pt-4">
                  <p className="font-serif text-stone-800 text-lg">— Michael Harrison</p>
                  <p className="text-stone-500 text-sm">Founder & Creative Director</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-4e5d9a4c8e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Design Inspiration"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-serif font-semibold">Designed for the Soul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="process-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-stone-800">
              Our Design Process
            </h2>
            <div className="w-24 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Booking Consultation',
                description: 'Schedule a personal consultation to discuss your vision, needs, and lifestyle requirements.'
              },
              {
                number: '02',
                title: 'Design Phase',
                description: 'Our expert designers create detailed plans and 3D visualizations of your dream kitchen.'
              },
              {
                number: '03',
                title: 'Build & Installation',
                description: 'Premium materials are crafted with precision and installed by our skilled craftsmen.'
              },
              {
                number: '04',
                title: 'Final Walkthrough',
                description: 'Complete quality inspection and handover of your beautiful new kitchen space.'
              }
            ].map((step, index) => (
              <div key={index} className="process-step text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                    {step.number}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-stone-300 -z-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-serif font-semibold mb-4 text-stone-800">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Branding Section */}
      <section className="py-32 bg-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light leading-relaxed text-stone-700 italic">
            "The Infinite Potential of a Blank Canvas.<br />All You Have to Do Is Imagine."
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Final Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b9c4a86c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif font-semibold text-stone-800">Emma Thompson</p>
                  <p className="text-stone-500 text-sm">Chelsea, London</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed italic">
                "From concept to completion, the team delivered beyond our expectations. The kitchen is absolutely stunning and perfectly functional for our family."
              </p>
            </div>

            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif font-semibold text-stone-800">David Wilson</p>
                  <p className="text-stone-500 text-sm">Richmond, Surrey</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed italic">
                "Exceptional craftsmanship and attention to detail. Our kitchen has become the centerpiece of our home and the envy of all our friends."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-semibold text-white mb-4">Customer Experience</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Design Consultation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Showroom Visit</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Project Gallery</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-white mb-4">The Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-white mb-4">FAQs</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Design Process</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Installation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-white mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <img 
              src="https://taajkitchens.co.uk/wp-content/uploads/2023/12/Picsart_24-04-30_16-32-00-759-2.png.webp" 
              alt="Taaj Kitchens" 
              className="h-12 w-auto filter brightness-0 invert opacity-60 mb-4 md:mb-0"
            />
            <p className="text-sm text-stone-400">© 2025 Taaj Kitchens. All rights reserved.</p>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SovranDesign;