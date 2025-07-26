import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-light tracking-wider">SOVRAN GROUP</h3>
            <p className="text-gray-400 leading-relaxed">
              Creating exceptional spaces through innovative construction, interior design, and architectural services.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide uppercase">Services</h4>
            <div className="space-y-2">
              <Link to="/sovran-builders" className="block text-gray-400 hover:text-white transition-colors">
                Construction Services
              </Link>
              <Link to="/sovran-interiors" className="block text-gray-400 hover:text-white transition-colors">
                Interior Design
              </Link>
              <Link to="/sovran-design" className="block text-gray-400 hover:text-white transition-colors">
                Architecture & 3D Design
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide uppercase">Company</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/careers" className="block text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide uppercase">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-400">info@sovrangroup.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-400">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Sovran Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;