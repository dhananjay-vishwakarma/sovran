import React, { useState, useEffect, useCallback, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { submitContactForm, ContactFormData } from '../services/firebase';

interface ExitIntentPopupProps {
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'general', // Default interest selection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Format the data for Firebase submission
      const dataToSubmit: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.interest === 'design' ? 'design' : 
                formData.interest === 'build' ? 'builders' : 
                formData.interest === 'renovation' ? 'builders' :
                formData.interest === 'kitchen' ? 'interiors' : '',
        message: `Interest: ${formData.interest}\n${formData.message || 'Submitted via Exit Intent Popup'}`
      };
      
      // Submit form data to Firebase
      const result = await submitContactForm(dataToSubmit);
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Store in localStorage that the user has seen the popup
        localStorage.setItem('exitPopupShown', 'true');
        localStorage.setItem('exitPopupShownDate', new Date().toISOString());
      } else {
        throw new Error('Failed to submit form');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close popup and store in localStorage to not show it again soon
  const handleClose = () => {
    localStorage.setItem('exitPopupShown', 'true');
    localStorage.setItem('exitPopupShownDate', new Date().toISOString());
    onClose();
  };

  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose} 
      />
      
      {/* Popup content */}
      <div 
        ref={popupRef}
        className="relative max-w-lg w-full mx-4 bg-white rounded-lg shadow-2xl overflow-hidden animate-slideUp"
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#081E27] z-10"
          aria-label="Close popup"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        
        {/* Header with background image */}
        <div className="h-24 bg-[#081E27] relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${require('../assets/images/Chiswick/DBI/Chiswick home- Sovran1.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl font-semibold z-10 ivymode">
              Before You Go...
            </h2>
          </div>
        </div>
        
        <div className="p-6">
          {!isSubmitted ? (
            <>
              <p className="text-lg text-center mb-6">
                Let us help transform your vision into reality. <br />
                <span className="font-medium">Get a free consultation today!</span>
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-[#CDAD7D] focus:border-[#CDAD7D]`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-[#CDAD7D] focus:border-[#CDAD7D]`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-[#CDAD7D] focus:border-[#CDAD7D]`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CDAD7D] focus:border-[#CDAD7D]"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="design">Interior Design</option>
                    <option value="build">Construction / Building</option>
                    <option value="renovation">Renovation</option>
                    <option value="kitchen">Kitchen Design</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CDAD7D] focus:border-[#CDAD7D]"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-[#CDAD7D] hover:bg-[#CDAD7D]/90 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDAD7D] transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600 mb-6">
                We've received your request and will be in touch with you shortly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#081E27] hover:bg-[#081E27]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDAD7D]"
              >
                Close
              </button>
            </div>
          )}
          
          <p className="text-xs text-center text-gray-500 mt-4">
            By submitting this form, you agree to our{' '}
            <a href="/privacy-policy" className="text-[#CDAD7D] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
