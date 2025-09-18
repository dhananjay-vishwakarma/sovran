import React, { useState } from 'react';
import { submitContactForm, ContactFormData } from '../../../services/firebase';

const DesignContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'design',
    investment: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add the service type to the form data
      const dataToSubmit = {
        ...formData,
        service: 'design' as const
      };
      
      const result = await submitContactForm(dataToSubmit);
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully. We will contact you soon!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'design',
          investment: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: 'There was an error sending your message. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl  text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to start your project or have questions about our services? Reach out to our team for personalized assistance.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl  text-gray-900 mb-1">Visit Our Studio</h3>
                  <p className="text-gray-600">2nd floor, Saracen House, Swan St, Isleworth TW7 6RJ, United Kingdom</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl  text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">+44 7516 100111</p>
                  <p className="text-gray-600">+44 20 3143 0103</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl  text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">INFO@SOVRANGROUP.CO.UK</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl  text-gray-900 mb-4">Working Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl  text-gray-900 mb-6">Send Us a Message</h3>
            
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="serviceInterest" className="block text-gray-700 font-medium mb-2">Service Interested In</label>
                <select 
                  id="serviceInterest" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={(e) => handleChange({...e, target: {...e.target, id: 'message'}})}
                  defaultValue=""
                  required
                >
                  <option value="">Select a service</option>
                  <option value="architectural-design">Architectural Design</option>
                  <option value="3d-visualization">3D Visualization</option>
                  <option value="planning-permission">Planning Permission</option>
                  <option value="interior-design">Interior Design</option>
                  <option value="vr-walkthrough">VR Walkthrough</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  placeholder="Tell us about your project"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#081E27] font-medium rounded-md transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignContactSection;
