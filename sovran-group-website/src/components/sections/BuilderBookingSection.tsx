import React, { useState } from 'react';
import { submitContactForm, ContactFormData } from '../../services/firebase';

const BuilderBookingSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'New Build',
    budget: '£50,000 - £100,000',
    message: 'Booking consultation request'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format the data for Firebase submission
      const dataToSubmit: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: 'builders',
        message: `Project Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n${formData.message}`
      };
      
      const result = await submitContactForm(dataToSubmit);
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Your consultation request has been sent successfully. We will contact you soon!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'New Build',
          budget: '£50,000 - £100,000',
          message: 'Booking consultation request'
        });
      } else {
        setSubmitStatus({
          success: false,
          message: 'There was an error sending your request. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg p-8 md:p-12 rounded-lg border border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl  text-[#081E27] mb-4">Book Your Consultation</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-xl text-dark-700 max-w-3xl mx-auto">
              Take the first step towards your dream home. Schedule a no-obligation consultation with our experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl  text-[#081E27] mb-6">Fill in your details</h3>
              
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-dark-700 text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-[#081E27] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-dark-700 text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-[#081E27] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-dark-700 text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-[#081E27] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="projectType" className="block text-dark-700 text-sm font-medium mb-2">Project Type</label>
                  <select 
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-[#081E27] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="New Build">New Build</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Extension">Extension</option>
                    <option value="Loft Conversion">Loft Conversion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="budget" className="block text-dark-700 text-sm font-medium mb-2">Budget Range</label>
                  <select 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-[#081E27] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="£50,000 - £100,000">£50,000 - £100,000</option>
                    <option value="£100,000 - £250,000">£100,000 - £250,000</option>
                    <option value="£250,000 - £500,000">£250,000 - £500,000</option>
                    <option value="£500,000+">£500,000+</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-[#081E27] py-3 px-4 rounded-lg transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Consultation'}
                </button>
              </form>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-xl  text-[#081E27] mb-6">Or call us directly</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <p className="text-dark-700 mb-2">Call our team:</p>
                <p className="text-2xl  text-[#081E27]">020 1234 5678</p>
              </div>
              <p className="text-dark-700 mb-6">
                Our team is available Monday to Friday, 9am to 6pm, to discuss your project requirements and arrange a site visit.
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-[#081E27] font-medium">No obligation consultations</p>
                  <p className="text-gray-600">We provide free initial consultations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderBookingSection;
