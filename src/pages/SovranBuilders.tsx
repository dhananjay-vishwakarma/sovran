import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { Hammer, Shield, Clock, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SovranBuilders = () => {
  useEffect(() => {
    // Hero animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100, rotationX: 45 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'back.out(1.7)' }
    );

    // Service cards with 3D effect
    gsap.fromTo('.construction-service', 
      { opacity: 0, y: 100, rotationY: 45 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 70%',
        }
      }
    );

    // Features animation
    gsap.fromTo('.feature-item', 
      { opacity: 0, x: -100, rotationZ: -10 },
      { 
        opacity: 1, 
        x: 0, 
        rotationZ: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 70%',
        }
      }
    );

    // Process steps with scale animation
    gsap.fromTo('.process-step', 
      { opacity: 0, scale: 0.5, rotation: 180 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 70%',
        }
      }
    );

  }, []);

  const services = [
    {
      title: 'Residential Construction',
      description: 'Custom homes and luxury residences built to the highest standards of quality and craftsmanship.',
      image: 'https://images.pexels.com/photos/1105386/pexels-photo-1105386.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Commercial Development',
      description: 'Office buildings, retail spaces, and mixed-use developments that define urban landscapes.',
      image: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Renovation & Restoration',
      description: 'Transforming existing spaces while preserving architectural integrity and historical significance.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const features = [
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'Expert Craftsmanship',
      description: 'Our skilled artisans and master builders bring decades of experience to every project.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure every detail meets our exacting standards.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Timely Delivery',
      description: 'Advanced project management ensures on-time completion without compromising quality.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Award-Winning Results',
      description: 'Our projects have received industry recognition for excellence in construction and design.'
    }
  ];

  return (
    <div>
      <Hero
        title={<span className="hero-title">Sovran Builders</span>}
        subtitle={<span className="hero-subtitle">Construction Excellence</span>}
        description="Transforming architectural visions into reality through superior construction services and unwavering commitment to quality."
        backgroundImage="https://images.pexels.com/photos/1105386/pexels-photo-1105386.jpeg?auto=compress&cs=tinysrgb&w=1600"
        height="h-screen"
      />

      <section className="services-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Construction Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From groundbreaking to completion, we deliver construction projects that exceed expectations and stand the test of time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="construction-service group">
                <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light tracking-wider uppercase mb-8">
                Why Choose Sovran Builders
              </h2>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item flex items-start space-x-4">
                    <div className="text-gray-600 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-light tracking-wide uppercase mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Construction Excellence"
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="process-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A systematic approach that ensures every project is delivered with precision, quality, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="process-step text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                1
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive project planning and design collaboration to establish clear objectives and timelines.
              </p>
            </div>
            <div className="process-step text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                2
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Preparation</h3>
              <p className="text-gray-600 leading-relaxed">
                Site preparation, permit acquisition, and resource mobilization to ensure seamless project execution.
              </p>
            </div>
            <div className="process-step text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                3
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Construction</h3>
              <p className="text-gray-600 leading-relaxed">
                Expert construction execution with continuous quality monitoring and progress reporting.
              </p>
            </div>
            <div className="process-step text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                4
              </div>
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Completion</h3>
              <p className="text-gray-600 leading-relaxed">
                Final inspections, client walkthrough, and project handover with comprehensive warranty support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
            Ready to Build?
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            Let's discuss your construction project and bring your vision to life with Sovran Builders.
          </p>
          <button className="bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default SovranBuilders;