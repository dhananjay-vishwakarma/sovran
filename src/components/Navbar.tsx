import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/sovran-builders', label: 'SOVRAN BUILDERS' },
    { path: '/sovran-interiors', label: 'SOVRAN INTERIORS' },
    { path: '/sovran-design', label: 'TAAJ KITCHENS' },
    { path: '/careers', label: 'CAREERS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="bg-gradient-to-r from-premium-black via-premium-charcoal to-premium-dark border-b border-premium-gold/20 sticky top-0 z-50 backdrop-blur-lg shadow-2xl">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="text-2xl font-light tracking-wider text-white group">
            <img 
              src="https://sovrangroup.co.uk/wp-content/uploads/2025/07/LOGO-2-scaled.png" 
              alt="Sovran Group" 
              className="h-14 w-auto transition-all duration-500 group-hover:scale-105 filter drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-500 group ${
                  isActive(link.path)
                    ? 'text-premium-gold bg-premium-gold/10 rounded-lg backdrop-blur-sm shadow-lg'
                    : 'text-premium-platinum hover:text-premium-gold hover:bg-premium-gold/5 rounded-lg'
                }`}
              >
                <span className="relative z-10 font-inter font-semibold text-shadow">
                  {link.label}
                </span>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-premium-gold via-premium-gold-light to-premium-gold transition-all duration-500 ${
                  isActive(link.path) 
                    ? 'w-full shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                    : 'w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                }`}></div>
                <div className={`absolute inset-0 bg-gradient-to-r from-premium-gold/0 via-premium-gold/5 to-premium-gold/0 rounded-lg transition-all duration-500 ${
                  isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-premium-platinum hover:text-premium-gold transition-all duration-300 p-2 rounded-lg hover:bg-premium-gold/10 hover:shadow-lg"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-premium-gold/20 bg-gradient-to-b from-premium-black/95 via-premium-charcoal/95 to-premium-dark/95 backdrop-blur-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg font-inter border border-transparent ${
                    isActive(link.path)
                      ? 'text-premium-gold bg-premium-gold/15 backdrop-blur-sm border-premium-gold/30 shadow-lg'
                      : 'text-premium-platinum hover:text-premium-gold hover:bg-premium-gold/10 hover:border-premium-gold/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;