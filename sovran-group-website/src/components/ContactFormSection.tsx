import React, { useState } from 'react';
import { submitContactForm, ContactFormData } from '../services/firebase';

const ContactFormSection: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    investment: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Submit form data to Firebase
      const result = await submitContactForm(formData);
      
      if (result.success) {
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
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setIsSubmitting(false);
      setFormError('There was a problem submitting your form. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#081E27] relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left column - Text content */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl mb-6 ivymode leading-tight font-light">
              Your Project.<br />Our Expertise.
            </h2>
            <div className="w-16 h-0.5 bg-[#CDAD7D] mb-8"></div>
            <h3 className="text-2xl mb-6 font-light">Let's Build It Together</h3>
            <p className="text-base sm:text-lg mb-10 text-gray-300 max-w-xl">
              Ready to transform your space? From bespoke kitchens to complete
              home renovations, our specialists are ready to bring your vision to
              life.
            </p>
            
            {/* Contact details - simplified */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-[#CDAD7D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+447516100111" className="text-gray-300 hover:text-[#CDAD7D] transition-colors">
                  +44 7516 100111
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-[#CDAD7D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>

                <a href="mailto:info@sovrangroup.co.uk" className="text-gray-300 hover:text-[#CDAD7D] transition-colors">
                  info@sovrangroup.co.uk
                </a>
              </div>
              
              {/* WhatsApp link - simplified */}
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-[#CDAD7D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ fill: 'currentColor' }}>
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                <a 
                  href="https://wa.me/447516100111"
                  className="text-gray-300 hover:text-[#CDAD7D] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column - Form */}
          <div className="w-full lg:w-1/2">
            <div className="p-8">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#CDAD7D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="border-l-4 border-red-500 p-4 mb-4">
                      <p className="text-sm text-white">{formError}</p>
                    </div>
                  )}
                  
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400"
                      placeholder="Full Name"
                    />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400"
                      placeholder="Email Address"
                    />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400"
                      placeholder="Phone Number"
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400 appearance-none"
                    >
                      <option value="" className="bg-[#081E27] text-gray-400">Select a service</option>
                      <option value="architectural" className="bg-[#081E27]">Architectural</option>
                      <option value="build" className="bg-[#081E27]">Build</option>
                      <option value="interiors" className="bg-[#081E27]">Interiors</option>
                      <option value="multiple-projects" className="bg-[#081E27]">Multiple Projects</option>
                      <option value="other" className="bg-[#081E27]">Other</option>
                    </select>
                    <div className="absolute right-0 top-3 pointer-events-none">
                      <svg className="w-4 h-4 text-[#CDAD7D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Investment dropdown next to service selection */}
                  <div className="relative">
                    <select
                      id="investment"
                      name="investment"
                      value={(formData as any).investment || ''}
                      onChange={handleChange}
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400 appearance-none"
                    >
                      <option value="" className="bg-[#081E27] text-gray-400">Investment</option>
                      <option value="under-100k" className="bg-[#081E27]">Under 100K</option>
                      <option value="under-400k" className="bg-[#081E27]">Under 400K</option>
                      <option value="under-1m" className="bg-[#081E27]">Under 1M</option>
                      <option value="1m-plus" className="bg-[#081E27]">1M+</option>
                    </select>
                    <div className="absolute right-0 top-3 pointer-events-none">
                      <svg className="w-4 h-4 text-[#CDAD7D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#CDAD7D]/30 focus:outline-none focus:border-[#CDAD7D] text-white placeholder-gray-400 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-white text-[#081E27] px-8 py-3 font-medium hover:bg-gray-50 transition-all duration-300 flex items-center"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && (
                        <svg 
                          className="w-5 h-5 ml-2" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;