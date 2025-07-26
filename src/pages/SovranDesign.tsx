import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { Compass, Layers, Monitor, Ruler, ExternalLink, ChefHat } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SovranDesign = () => {
  useEffect(() => {
    // Futuristic hero animations
    gsap.fromTo('.hero-logo', 
      { opacity: 0, scale: 0.3, rotationY: 360 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 2, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 150, skewX: 20 },
      { opacity: 1, y: 0, skewX: 0, duration: 1.5, delay: 0.5, ease: 'power3.out' }
    );

    // Holographic effect for service cards
    gsap.to('.holographic-card', {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    // 3D rotation effect for capabilities
    gsap.fromTo('.capability-item', 
      { opacity: 0, rotationX: 90, z: -200 },
      { 
        opacity: 1, 
        rotationX: 0, 
        z: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.capabilities-section',
          start: 'top 70%',
        }
      }
    );

    // Particle effect simulation
    gsap.to('.particle', {
      y: -100,
      opacity: 0,
      duration: 3,
      ease: 'power2.out',
      repeat: -1,
      stagger: {
        amount: 2,
        from: 'random'
      }
    });

  }, []);

  const services = [
    {
      title: 'Kitchen Design',
      description: 'Luxury kitchen design and installation creating culinary spaces that inspire creativity.',
      image: 'https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Bespoke Cabinetry', 'Premium Appliances', 'Stone Worktops', 'Smart Storage']
    },
    {
      title: 'Kitchen Installation',
      description: 'Professional kitchen installation services ensuring perfect fit and finish.',
      image: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Expert Fitting', 'Plumbing Integration', 'Electrical Work', 'Project Management']
    },
    {
      title: 'Kitchen Renovation',
      description: 'Complete kitchen renovation services transforming your existing space.',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Space Planning', 'Structural Changes', 'Modern Upgrades', 'Full Refurbishment']
    }
  ];

  const capabilities = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: 'Design Consultation',
      description: 'Expert consultation to create the perfect kitchen layout that suits your lifestyle and cooking needs.'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Premium Materials',
      description: 'Access to the finest materials and finishes from leading manufacturers worldwide.'
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: '3D Visualization',
      description: 'Advanced 3D visualization to help you see your dream kitchen before installation begins.'
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: 'Precision Installation',
      description: 'Meticulous installation by skilled craftsmen ensuring every detail is perfect.'
    }
  ];

  return (
    <div>
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=1600)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="hero-logo mb-8">
            <img 
              src="https://taajkitchens.co.uk/wp-content/uploads/2023/12/Picsart_24-04-30_16-32-00-759-2.png.webp" 
              alt="Taaj Kitchens" 
              className="h-24 w-auto mx-auto"
            />
          </div>
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase">
            Taaj Kitchens
          </h1>
          <h2 className="text-xl md:text-2xl font-light tracking-wide mb-8 uppercase">
            Luxury Kitchen Design
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90 mb-8">
            Creating extraordinary culinary spaces that blend functionality with stunning aesthetics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://taajkitchens.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Website
            </a>
            <button className="border-2 border-white text-white px-8 py-4 font-medium tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              Get Free Quote
            </button>
          </div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Kitchen Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We create exceptional kitchens that combine innovative design with superior craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="holographic-card group">
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
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
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

      <section className="capabilities-section py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light tracking-wider uppercase mb-8">
                Our Capabilities
              </h2>
              <div className="space-y-8">
                {capabilities.map((capability, index) => (
                  <div key={index} className="capability-item flex items-start space-x-4">
                    <div className="text-gray-600 mt-1">
                      {capability.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-light tracking-wide uppercase mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kitchen Excellence"
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Kitchen Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Showcasing our kitchen design expertise through a portfolio of stunning culinary spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Modern Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Modern Kitchen</h3>
                  <p className="text-sm opacity-90">Contemporary design with premium finishes</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Luxury Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Luxury Kitchen</h3>
                  <p className="text-sm opacity-90">High-end kitchen with marble worktops</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Traditional Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Traditional Kitchen</h3>
                  <p className="text-sm opacity-90">Classic design with modern functionality</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Open Plan Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Open Plan Kitchen</h3>
                  <p className="text-sm opacity-90">Spacious kitchen-diner with island unit</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Compact Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Compact Kitchen</h3>
                  <p className="text-sm opacity-90">Smart design maximizing small spaces</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Designer Kitchen"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-light tracking-wide uppercase mb-1">Designer Kitchen</h3>
                  <p className="text-sm opacity-90">Bespoke kitchen with unique features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Kitchen Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A systematic approach that transforms your culinary vision into reality through expert design and installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                1
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Consultation</h3>
              <p className="text-gray-600 leading-relaxed">
                Understanding your cooking needs, lifestyle, and design preferences through detailed consultation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                2
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating detailed kitchen designs with 3D visualizations to bring your dream kitchen to life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                3
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Manufacturing</h3>
              <p className="text-gray-600 leading-relaxed">
                Precision manufacturing of your bespoke kitchen using premium materials and expert craftsmanship.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                4
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Installation</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional installation by our skilled team ensuring perfect fit and finish with minimal disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
            Create Your Dream Kitchen
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            Ready to transform your kitchen into a culinary masterpiece? Let's create your perfect kitchen together.
          </p>
          <button className="bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Start Your Kitchen Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default SovranDesign;