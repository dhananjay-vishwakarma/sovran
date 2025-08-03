import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Form fields interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: 'builders' | 'design' | 'interiors' | '';
  message: string;
}

const ContactPage: React.FC = () => {
  // Refs for GSAP animations
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Reset form after success message
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 5000);
    }, 1500);
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Contact cards animation
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          }
        }
      );
    });

    // Form animation
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, select, textarea, button');
      
      gsap.fromTo(
        formElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Map animation
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative" ref={headerRef}>
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Whether you're looking to build, design, or transform your space, we're here to bring your vision to life. 
              Reach out to our dedicated team for a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sovran Builders Card */}
            <div 
              ref={el => {
                cardRefs.current[0] = el;
                return undefined;
              }}
              className="bg-dark-900 border border-primary-700/30 rounded-lg p-8 shadow-xl"
            >
              <div className="h-16 w-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-6">
                <img 
                  src="/images/home-builder-2.jpg" 
                  alt="Sovran Builders" 
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Sovran Builders</h3>
              <p className="text-gray-400 mb-6">
                For home extensions, renovations, and full construction projects.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="tel:+442031430103" className="text-gray-300 hover:text-primary-400 transition-colors">
                    +44 20 3143 0103
                  </a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="mailto:builders@sovrangroup.co.uk" className="text-gray-300 hover:text-primary-400 transition-colors">
                    builders@sovrangroup.co.uk
                  </a>
                </div>
              </div>
            </div>

            {/* Sovran Design Card */}
            <div 
              ref={el => {
                cardRefs.current[1] = el;
                return undefined;
              }}
              className="bg-dark-900 border border-primary-700/30 rounded-lg p-8 shadow-xl"
            >
              <div className="h-16 w-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-6">
                <img 
                  src="/images/Taaj-kitchens-Artistic-Handsketch-1-scaled.jpg" 
                  alt="Sovran Design" 
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Sovran Design</h3>
              <p className="text-gray-400 mb-6">
                For architectural design, planning permission, and project visualization.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="tel:+442031430104" className="text-gray-300 hover:text-primary-400 transition-colors">
                    +44 20 3143 0104
                  </a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="mailto:design@sovrangroup.co.uk" className="text-gray-300 hover:text-primary-400 transition-colors">
                    design@sovrangroup.co.uk
                  </a>
                </div>
              </div>
            </div>

            {/* Sovran Interiors Card */}
            <div 
              ref={el => {
                cardRefs.current[2] = el;
                return undefined;
              }}
              className="bg-dark-900 border border-primary-700/30 rounded-lg p-8 shadow-xl"
            >
              <div className="h-16 w-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-6">
                <img 
                  src="/images/Bespoke-dressing-room_MrWarobe_0002-1.jpg" 
                  alt="Sovran Interiors" 
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Sovran Interiors</h3>
              <p className="text-gray-400 mb-6">
                For interior design, bespoke furniture, and finishing touches.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="tel:+442031430105" className="text-gray-300 hover:text-primary-400 transition-colors">
                    +44 20 3143 0105
                  </a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                  <a href="mailto:interiors@sovrangroup.co.uk" className="text-gray-300 hover:text-primary-400 transition-colors">
                    interiors@sovrangroup.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/image-5-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/90"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-primary-600/20">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="bg-green-800/20 border border-green-500/30 rounded-lg p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                        placeholder="+44 123 456 7890"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                      Service You're Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                    >
                      <option value="">Select a service</option>
                      <option value="builders">Sovran Builders</option>
                      <option value="design">Sovran Design</option>
                      <option value="interiors">Sovran Interiors</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      text={isSubmitting ? "Sending..." : "Send Message"} 
                      className="w-full md:w-auto font-medium text-white"
                    />
                  </div>
                </form>
              )}
            </div>
            
            {/* Map & Address */}
            <div ref={mapRef}>
              <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-primary-600/20 mb-8">
                <h2 className="text-3xl font-serif font-bold text-white mb-6">Visit Our Office</h2>
                <div className="flex items-start space-x-3 mb-6">
                  <MapPinIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Sovran Group Headquarters</h3>
                    <address className="not-italic text-gray-300 mt-1 leading-relaxed">
                      123 Design Street<br />
                      Kensington<br />
                      London, W8 5SA<br />
                      United Kingdom
                    </address>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <PhoneIcon className="h-5 w-5 text-primary-500" />
                  <a href="tel:+442031430103" className="text-gray-300 hover:text-primary-400 transition-colors">
                    +44 20 3143 0103
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-primary-500" />
                  <a href="mailto:info@sovrangroup.co.uk" className="text-gray-300 hover:text-primary-400 transition-colors">
                    info@sovrangroup.co.uk
                  </a>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="rounded-xl overflow-hidden h-[400px] shadow-xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9935.658294348507!2d-0.1980653967957692!3d51.50151253006096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760ff2f456e56d%3A0x1409e7a17e0ef1d9!2sKensington%2C%20London%2C%20UK!5e0!3m2!1sen!2sde!4v1595238236674!5m2!1sen!2sde" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sovran Group Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/Designed-crafted-and-Installed-Taaj-kitchens-Homepage-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-800/95 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">Business Hours</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our team is available during the following hours to assist you with your inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
              { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
              { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
              { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
              { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
              { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
              { day: 'Sunday', hours: 'Closed' },
              { day: 'Bank Holidays', hours: 'Closed' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-dark-900/80 backdrop-blur-sm border border-primary-700/30 rounded-lg p-6 text-center"
                ref={el => {
                  if (index < 8) {
                    cardRefs.current[index + 3] = el;
                    return undefined;
                  }
                }}
              >
                <h3 className="font-serif text-xl font-bold text-white mb-2">{item.day}</h3>
                <p className="text-gray-300">{item.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/Taaj-kitchens-German-FLUTED-KITCHEN_05.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80 backdrop-blur-sm"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Schedule a consultation with our experts and let's bring your vision to life.
          </p>
          <Button 
            text="Book a Consultation" 
            to="/book-consultation" 
            className="mx-auto font-medium text-white"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
